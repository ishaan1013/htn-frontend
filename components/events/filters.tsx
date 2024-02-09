"use client"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { TEventType } from "@/lib/types"

export default function Filters({
  search,
  setSearch,
  type,
  setType,
}: {
  search: string
  setSearch: (value: string) => void
  type: string
  setType: (value: "all" | TEventType) => void
}) {
  return (
    <div className="flex md:flex-row w-full flex-col space-y-2 md:space-y-0 mt-4 md:space-x-4">
      <div className="md:w-96 w-full relative z-0">
        <Search className="absolute top-3 left-2.5 text-muted-foreground w-4 h-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-8"
          placeholder="Search events..."
        />
      </div>
      <div className="flex space-x-2 md:space-x-4">
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="grow font-medium">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="activity">Activity</SelectItem>
            <SelectItem value="tech_talk">Tech Talk</SelectItem>
            <SelectItem value="workshop">Workshop</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={() => {
            setSearch("")
            setType("all")
          }}
          disabled={!search && type === "all"}
          variant="outline"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  )
}
