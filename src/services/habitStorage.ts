import { parseISO } from "date-fns"
import type { Habit } from "../context/useHabits"

export const HABITS_STORAGE_KEY = "habit-tracker-habits"

function dateReviver(_key: string, value: unknown) {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return parseISO(value)
  }
  return value
}

export function readHabitsFromStorage(): Habit[] {
  try {
    const raw = localStorage.getItem(HABITS_STORAGE_KEY)
    if (raw == null) return []
    const parsed = JSON.parse(raw, dateReviver) as Habit[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function writeHabitsToStorage(habits: Habit[]): void {
  localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits))
}