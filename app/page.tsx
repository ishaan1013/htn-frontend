import Image from "next/image"

export default function Home() {
  return (
    <main className="w-screen flex justify-center">
      <div className="w-full max-w-screen-lg p-6 flex items-center justify-between">
        <div className="text-3xl font-semibold relative z-0">
          Events
          <div className="w-full -z-10 absolute -bottom-1 h-1 bg-gradient" />
        </div>
      </div>
    </main>
  )
}
