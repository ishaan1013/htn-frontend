import UnderlinedText from "@/components/ui/underlined-text"
import { TEvent } from "@/lib/types"
import { getData } from "@/lib/utils"
import Events from "@/components/events"

// server component for datafetching with the `getData` helper imported above
export default async function Home() {
  const data: TEvent[] = await getData()

  return (
    <>
      <main className="w-screen flex pb-24 justify-center">
        <div className="w-full max-w-screen-md p-6 flex flex-col items-start justify-start">
          {/* made a underlined text component for re-use in other page if this was to be continued */}
          <UnderlinedText className="text-4xl font-semibold">
            Events
          </UnderlinedText>

          <Events data={data} />
        </div>
      </main>
    </>
  )
}
