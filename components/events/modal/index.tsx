"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { TEvent, TEventType } from "@/lib/types"
import { processDate } from "@/lib/utils"
import EventTypeBadge from "../typeBadge"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import EventSpeakers from "./speakers"
import EventLinks from "./links"

export default function EventModal({
  events,
  event,
  open,
  setOpen,
  setEvent,
}: {
  events: TEvent[]
  event: TEvent
  open: boolean
  setOpen: (value: boolean) => void
  setEvent: (value: number) => void
}) {
  const { date, start, end } = processDate(event)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-screen-sm pb-8">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            {event.name}
          </DialogTitle>
          <DialogDescription>
            <div className="flex flex-wrap w-full">
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
            <div className="mt-4">
              {event.description || "No description available."}
            </div>

            <EventLinks event={event} />

            <div className="w-full h-[1px] bg-border my-4" />

            <EventSpeakers event={event} />

            {event.related_events.length > 0 ? (
              <div className="">
                <div className="text-lg font-semibold text-foreground">
                  Related Events
                </div>
                {event.related_events.map((eventId, i) => {
                  const relatedEvent = events.find((e) => eventId === e.id)
                  if (!relatedEvent) return null
                  return (
                    <Button
                      onClick={() => setEvent(eventId)}
                      variant="link"
                      key={i}
                      className={`${
                        relatedEvent.event_type === "tech_talk"
                          ? "text-accent-blue"
                          : relatedEvent.event_type === "workshop"
                          ? "text-accent-pink"
                          : "text-accent-yellow"
                      } m-0 p-0 mt-2 flex h-auto items-center`}
                    >
                      {relatedEvent.name}
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    </Button>
                  )
                })}
              </div>
            ) : null}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
