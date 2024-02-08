import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { TEvent } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getData() {
  const events = await fetch("https://api.hackthenorth.com/v3/events")
  const data: TEvent[] = await events.json()

  data.sort((a, b) => {
    return new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
  })

  return data
}

export const colorMap = {
  tech_talk: "bg-accent-blue",
  workshop: "bg-accent-pink",
  activity: "bg-accent-blue",
}
