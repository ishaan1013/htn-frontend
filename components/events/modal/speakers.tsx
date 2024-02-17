"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { TEvent } from "@/lib/types"

export default function EventSpeakers({ event }: { event: TEvent }) {
  return (
    <div className="mb-4">
      <div className="text-lg text-left font-semibold text-foreground">
        Speakers
      </div>
      {event.speakers.map((speaker, i) => (
        <div key={i} className="flex items-center justify-start space-x-2 mt-2">
          <Avatar>
            <AvatarFallback>{speaker.name[0]}</AvatarFallback>
          </Avatar>
          <div>{speaker.name}</div>
        </div>
      ))}
    </div>
  )
}
