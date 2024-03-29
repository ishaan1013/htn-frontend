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

// filtering ui with state controls passed in as props
export default function Filters({
  search,
  setSearch,
  type,
  setType,
  resetSort,
}: {
  search: string
  setSearch: (value: string) => void
  type: string
  setType: (value: "all" | TEventType) => void
  resetSort: () => void
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
      <Select value={type} onValueChange={setType}>
        <SelectTrigger className="grow md:w-[130px] font-medium">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="activity">Activity</SelectItem>
          <SelectItem value="tech_talk">Tech Talk</SelectItem>
          <SelectItem value="workshop">Workshop</SelectItem>
        </SelectContent>
      </Select>
      <div className="grid md:w-auto w-full grid-cols-2 gap-2 md:gap-4">
        <Button
          onClick={() => {
            setSearch("")
            setType("all")
          }}
          disabled={!search && type === "all"}
          variant="outline"
          className="md:w-auto w-full"
        >
          Clear Filters
        </Button>
        <Button
          onClick={() => {
            resetSort()
          }}
          variant="outline"
          className="md:w-auto w-full"
        >
          Reset Sort
        </Button>
      </div>
    </div>
  )
}
