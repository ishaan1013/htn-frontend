"use client"

import { useEffect, useState } from "react"
import EventCard from "./card"
import Filters from "./filters"
import { TEvent, TEventType } from "@/lib/types"
import { filterData } from "@/lib/utils"
import EventModal from "./modal"
import { Loader2 } from "lucide-react"

export default function Events({ data }: { data: TEvent[] }) {
  const [search, setSearch] = useState("")
  const [type, setType] = useState<"all" | TEventType>("all")

  const [signedIn, setSignedIn] = useState<undefined | boolean>(undefined)

  useEffect(() => {
    setSignedIn(
      typeof window !== "undefined" ? !!localStorage.getItem("signedIn") : false
    )
  }, [])

  const filteredData =
    signedIn !== undefined ? filterData(data, search, type, signedIn) : []

  const [selected, setSelected] = useState(1)
  const [open, setOpen] = useState(false)

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
