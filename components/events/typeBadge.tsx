"use client"

import { TEventType } from "@/lib/types"
import { Badge } from "../ui/badge"

// colour-coded badge for event type
export default function EventTypeBadge({ type }: { type: TEventType }) {
  return (
    <Badge
      variant="outline"
      className={`${
        type === "tech_talk"
          ? "border-accent-blue text-accent-blue"
          : type === "workshop"
          ? "border-accent-pink text-accent-pink"
          : "border-accent-yellow text-accent-yellow"
      } font-medium mr-2 mb-2`}
    >
      {type === "tech_talk"
        ? "Tech Talk"
        : type === "workshop"
        ? "Workshop"
        : "Activity"}
    </Badge>
  )
}
