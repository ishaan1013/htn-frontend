import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getData() {
  const events = await fetch("https://api.hackthenorth.com/v3/events")
  return events.json()
}

export const colorMap = {
  tech_talk: "bg-accent-blue",
  workshop: "bg-accent-pink",
  activity: "bg-accent-blue",
}
