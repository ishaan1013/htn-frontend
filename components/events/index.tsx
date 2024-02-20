"use client"

import { useEffect, useState } from "react"
import EventCard from "./card"
import Filters from "./filters"
import { TEvent, TEventType } from "@/lib/types"
import { filterData } from "@/lib/utils"
import EventModal from "./modal"
import { Loader2 } from "lucide-react"

import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { SortableItem } from "./sortableWrapper"

import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers"

// main events component containing all interactivity
// takes event array as props
export default function Events({ data }: { data: TEvent[] }) {
  const [search, setSearch] = useState("")
  const [type, setType] = useState<"all" | TEventType>("all")

  // local-storage based auth
  const [signedIn, setSignedIn] = useState<undefined | boolean>(undefined)

  useEffect(() => {
    const isSignedIn =
      typeof window !== "undefined" ? !!localStorage.getItem("signedIn") : false
    setSignedIn(isSignedIn)
    setFilteredData(filterData(data, search, type, isSignedIn))
  }, [search, type])

  const [filteredData, setFilteredData] = useState<TEvent[]>([])
  const [activeId, setActiveId] = useState(-1) // active drag

  const [selected, setSelected] = useState(1)
  const [open, setOpen] = useState(false)

  const resetSort = () => {
    setFilteredData(filterData(data, search, type, !!signedIn))
  }

  // dnd-kit utils
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event

    setActiveId(active.id as number)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over) {
      if (active.id !== over.id) {
        setFilteredData((items) => {
          const oldIndex = items.map((e) => e.id).indexOf(active.id as number)
          const newIndex = items.map((e) => e.id).indexOf(over.id as number)

          return arrayMove(items, oldIndex, newIndex)
        })
      }
    }
    setActiveId(-1)
  }

  // loading state
  if (signedIn === undefined)
    return (
      <div className="w-full flex items-center pt-12 justify-center">
        <Loader2 className="animate-spin text-muted-foreground w-6 h-6" />
      </div>
    )

  return (
    <>
      <EventModal
        events={data}
        event={data.find((e) => e.id === selected) as TEvent}
        open={open}
        setOpen={setOpen}
        setEvent={setSelected}
      />

      <Filters
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
        resetSort={resetSort}
      />

      <div className="h-[1px] w-full bg-border my-8" />

      <div className="w-full space-y-4">
        <DndContext
          modifiers={[restrictToVerticalAxis]}
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredData}
            strategy={verticalListSortingStrategy}
          >
            {filteredData.map((event) => (
              <SortableItem
                event={event}
                key={event.id}
                setSelected={setSelected}
                setOpen={setOpen}
                activeId={activeId}
              />
            ))}
          </SortableContext>
          <DragOverlay modifiers={[restrictToParentElement]}>
            {activeId ? (
              <EventCard
                event={filteredData.find((e) => e.id === activeId) as TEvent}
                setSelected={setSelected}
                setOpen={setOpen}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  )
}
