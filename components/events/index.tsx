"use client"

import { useState } from "react"
import EventCard from "./card"
import Filters from "./filters"
import { TEvent, TEventType } from "@/lib/types"
import { filterData } from "@/lib/utils"
import EventModal from "./modal"

export default function Events({ data }: { data: TEvent[] }) {
  const [search, setSearch] = useState("")
  const [type, setType] = useState<"all" | TEventType>("all")

  const signedIn = !!localStorage.getItem("signedIn")

  const filteredData = filterData(data, search, type, signedIn)

  const [selected, setSelected] = useState(1)
  const [open, setOpen] = useState(false)

  return (
    <>
      <EventModal
        event={data.find((e) => e.id === selected) as TEvent}
        open={open}
        setOpen={setOpen}
      />

      <Filters
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
      />

      <div className="h-[1px] w-full bg-border my-8" />

      <div className="w-full space-y-4">
        {filteredData.map((event) => (
          <EventCard
            event={event}
            key={event.id}
            setSelected={setSelected}
            setOpen={setOpen}
          />
        ))}
      </div>
    </>
  )
}
