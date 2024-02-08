"use client"

import { TEvent, TEventType } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

export default function EventCard({ event }: { event: TEvent }) {
  const date = new Date(event.start_time).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  })

  const start = new Date(event.start_time).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })

  const end = new Date(event.end_time).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })

  return (
    <div className="p-4 pl-6 cursor-pointer relative overflow-hidden z-0 rounded-lg border bg-card group hover:bg-muted-foreground/5 duration-200 text-card-foreground shadow-sm">
      <EventCardGlow type={event.event_type} />

      <div className="font-semibold text-xl">{event.name}</div>

      <div className="flex flex-wrap w-full mt-2">
        <EventTypeBadge type={event.event_type} />
        <Badge
          variant="outline"
          className="text-muted-foreground font-medium mr-2"
        >
          {date} {start}-{end}
        </Badge>
      </div>

      {/* {event.description ? (
        <div className="mt-6 text-muted-foreground">{event.description}</div>
      ) : null} */}
    </div>
  )
}

function EventTypeBadge({ type }: { type: TEventType }) {
  return (
    <Badge
      variant="outline"
      className={`${
        type === "tech_talk"
          ? "border-accent-blue text-accent-blue"
          : type === "workshop"
          ? "border-accent-pink text-accent-pink"
          : "border-accent-yellow text-accent-yellow"
      } font-medium mr-2`}
    >
      {type === "tech_talk"
        ? "Tech Talk"
        : type === "workshop"
        ? "Workshop"
        : "Activity"}
    </Badge>
  )
}

function EventCardGlow({ type }: { type: TEventType }) {
  return (
    <>
      <div
        className={`absolute left-0 w-1 ${
          type === "tech_talk"
            ? "bg-accent-blue"
            : type === "workshop"
            ? "bg-accent-pink"
            : "bg-accent-yellow"
        } h-full top-0 z-10`}
      />
      <div
        className={`absolute -left-1 w-2 group-hover:w-4 duration-300 ${
          type === "tech_talk"
            ? "bg-accent-blue"
            : type === "workshop"
            ? "bg-accent-pink"
            : "bg-accent-yellow"
        } blur-md h-full top-0 z-0`}
      />
    </>
  )
}
