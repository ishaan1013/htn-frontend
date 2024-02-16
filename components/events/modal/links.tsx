"use client"

import { Button } from "@/components/ui/button"
import { TEvent } from "@/lib/types"
import { ArrowUpRight } from "lucide-react"

export default function EventLinks({ event }: { event: TEvent }) {
  return (
    <>
      {event.public_url || event.private_url ? (
        <div className="mt-4 flex items-center space-x-4">
          {event.public_url ? (
            <a href={event.public_url}>
              <Button variant="link" className={`m-0 p-0 flex items-center`}>
                Public Link
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </a>
          ) : null}
          {event.private_url ? (
            <a href={event.private_url}>
              <Button variant="link" className={`m-0 p-0 flex items-center`}>
                Private Link
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </a>
          ) : null}
        </div>
      ) : null}
    </>
  )
}
