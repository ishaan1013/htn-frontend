"use client"

import { TEvent, TEventType } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { processDate } from "@/lib/utils"
import EventTypeBadge from "./typeBadge"
import { forwardRef } from "react"

interface EventCardProps {
  event: TEvent
  setSelected: (value: number) => void
  setOpen: (value: boolean) => void
  active?: boolean
  style?: React.CSSProperties
}

const EventCard = forwardRef<HTMLDivElement, EventCardProps>(
  ({ event, setSelected, setOpen, active, style, ...props }, ref) => {
    const { date, start, end } = processDate(event)

    if (active)
      return (
        <div
          ref={ref}
          style={style}
          {...props}
          onClick={() => {
            setSelected(event.id)
            setOpen(true)
          }}
          tabIndex={0}
          className={`
          w-full rounded-lg border-2 border-dashed h-[90px] bg-card shadow-sm`}
        ></div>
      )

    return (
      <div
        ref={ref}
        style={style}
        {...props}
        onClick={() => {
          setSelected(event.id)
          setOpen(true)
        }}
        tabIndex={0}
        className={`focus-visible:outline-none touch-pan-y focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 pt-4 pr-4 pb-2 pl-6 w-full text-left cursor-pointer relative overflow-hidden z-0 rounded-lg border bg-card group text-card-foreground shadow-sm`}
      >
        <EventCardGlow type={event.event_type} />

        <div className="font-semibold text-xl">{event.name}</div>

        <div className="flex flex-wrap w-full mt-2">
          <EventTypeBadge type={event.event_type} />
          <Badge
            variant="outline"
            className="text-muted-foreground font-medium mr-2 mb-2"
          >
            {date} {start}-{end}
          </Badge>
          <Badge
            variant="outline"
            className="text-muted-foreground font-medium mr-2 mb-2"
          >
            {event.permission === "private" ? "Private" : "Public"}
          </Badge>
        </div>

        {/* {event.description ? (
        <div className="mt-6 text-muted-foreground">{event.description}</div>
      ) : null} */}
      </div>
    )
  }
)

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
        className={`absolute -left-1 group-hover:-left-3 w-2 group-hover:w-6 duration-300 ${
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

export default EventCard
