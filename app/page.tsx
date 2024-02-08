import UnderlinedText from "@/components/ui/underlinedText"
import { TEvent } from "@/lib/types"
import { getData } from "@/lib/utils"
import EventCard from "@/components/events/card"
import Filters from "@/components/events/filters"

export default async function Home() {
  const data: TEvent[] = await getData()

  return (
    <main className="w-screen flex justify-center">
      <div className="w-full max-w-screen-md p-6 flex flex-col items-start justify-start">
        <UnderlinedText className="text-4xl font-semibold">
          Events
        </UnderlinedText>

        <Filters />

        <div className="h-[1px] w-full bg-border my-8" />

        <div className="w-full space-y-4">
          {data.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </div>
      </div>
    </main>
  )
}
