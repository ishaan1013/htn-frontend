"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import EventCard from "./card"
import { TEvent } from "@/lib/types"

// dnd-kit utils for implementing sortable event cards
export function SortableItem({
  event,
  setSelected,
  setOpen,
  activeId,
}: {
  event: TEvent
  setSelected: (value: number) => void
  setOpen: (value: boolean) => void
  activeId: number
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: event.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <EventCard
      event={event}
      setSelected={setSelected}
      setOpen={setOpen}
      ref={setNodeRef}
      active={event.id === activeId}
      style={style}
      {...attributes}
      {...listeners}
    />
  )
}
