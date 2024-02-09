"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TEvent, TEventType } from "@/lib/types"
import { processDate } from "@/lib/utils"
import EventTypeBadge from "./typeBadge"
import { Badge } from "../ui/badge"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

export default function EventModal({
  event,
  open,
  setOpen,
}: {
  event: TEvent
  open: boolean
  setOpen: (value: boolean) => void
}) {
  const { date, start, end } = processDate(event)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-screen-sm pb-8">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            {event.name}
            {/* <a href={event.private_url}>
              <ExternalLink className="w-4 h-4 ml-2" />
            </a> */}
          </DialogTitle>
          <DialogDescription>
            <div className="flex flex-wrap w-full">
              <EventTypeBadge type={event.event_type} />
              <Badge
                variant="outline"
                className="text-muted-foreground font-medium mr-2"
              >
                {date} {start}-{end}
              </Badge>
            </div>
            <div className="mt-6">
              {event.description || "No description available."}
            </div>
            <div className="w-full h-[1px] bg-border my-6" />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
