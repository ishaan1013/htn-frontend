"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { TEvent } from "@/lib/types"

export default function EventSpeakers({ event }: { event: TEvent }) {
  return (
    <>
      {event.speakers.length > 0 ? (
        <div className="mb-4">
          <div className="text-lg font-semibold text-foreground">Speakers</div>
          {event.speakers.map((speaker, i) => (
            <div
              key={i}
              className="flex items-center justify-start space-x-2 mt-2"
            >
              <Avatar>
                <AvatarFallback>{speaker.name[0]}</AvatarFallback>
              </Avatar>
              <div>{speaker.name}</div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  )
}
