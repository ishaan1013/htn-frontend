import UnderlinedText from "@/components/ui/underlinedText"
import { TEvent } from "@/lib/types"
import { getData } from "@/lib/utils"
import Events from "@/components/events"

export default async function Home() {
  const data: TEvent[] = await getData()

  return (
    <main className="w-screen flex justify-center">
      <div className="w-full max-w-screen-md p-6 flex flex-col items-start justify-start">
        <UnderlinedText className="text-4xl font-semibold">
          Events
        </UnderlinedText>

        <Events data={data} />
      </div>
    </main>
  )
}
