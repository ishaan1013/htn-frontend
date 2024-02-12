import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { TEvent, TEventType } from "./types"

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

export const filterData = (
  data: TEvent[],
  search: string,
  type: TEventType | "all",
  signedIn: boolean
) => {
  console.log("filtering with: ", search, type, signedIn)

  if (type !== "all") data = data.filter((event) => event.event_type === type)
  if (search)
    data = data.filter((event) =>
      event.name.toLowerCase().includes(search.toLowerCase())
    )

  if (!signedIn) data = data.filter((event) => event.permission === "public")

  return data
}

export const processDate = (event: TEvent) => {
  const date = new Date(event.start_time).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  })

  const start = new Date(event.start_time).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })

  const end = new Date(event.end_time).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })

  return { date, start, end }
}

export const validateLogin = (values: {
  [x: string]: any
  email?: string | undefined
  password?: any
}) => {
  return (
    values.email === "admin@hackthenorth.com" &&
    values.password === "hackthenorth2024"
  )
}
