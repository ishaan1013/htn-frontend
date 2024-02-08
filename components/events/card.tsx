"use client"

import { TEvent, TEventType } from "@/lib/types"
import { Globe, Lock } from "lucide-react"
import { Card } from "../ui/card"

export default function EventCard({ event }: { event: TEvent }) {
  return (
    <Card className="py-4 pl-6 relative overflow-hidden z-0">
      <EventCardGlow type={event.event_type} />

      <div className="font-semibold text-lg flex items-center">
        {event.name}
        {event.permission && event.permission === "private" ? (
          <Lock className="h-4 w-4 text-muted-foreground ml-2" />
        ) : (
          <Globe className="h-4 w-4 text-muted-foreground ml-2" />
        )}
      </div>
    </Card>
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
        className={`absolute left-0 w-2 ${
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
