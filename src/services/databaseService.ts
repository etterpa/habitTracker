import type { Habit } from "../context/useHabits"
import { isSameDay } from "date-fns"
import { readHabitsFromStorage, writeHabitsToStorage } from "./habitStorage"

export const getInitialHabits = async (): Promise<Habit[]> => {
  return readHabitsFromStorage()
}

export const addHabitToDB = async (name: string): Promise<void> => {
  const habits = readHabitsFromStorage()
  const newHabit: Habit = {
    id: crypto.randomUUID(),
    name,
    completions: [],
  }
  writeHabitsToStorage([...habits, newHabit])
}

export const deleteHabitFromDB = async (id: string): Promise<void> => {
  const habits = readHabitsFromStorage()
  const next = habits.filter(h => h.id !== id)
  if (next.length === habits.length) {
    throw new Error(`Habit with ID ${id} not found.`)
  }
  writeHabitsToStorage(next)
}

export const toggleCompletionInDB = async (id: string, date: Date): Promise<void> => {
  const habits = readHabitsFromStorage()
  const index = habits.findIndex(h => h.id === id)
  if (index === -1) {
    throw new Error(`Habit with ID ${id} not found.`)
  }

  const habit = habits[index]
  const alreadyDone = habit.completions.some(c => isSameDay(c, date))
  const completions = alreadyDone
    ? habit.completions.filter(c => !isSameDay(c, date))
    : [...habit.completions, date]

  const next = [...habits]
  next[index] = { ...habit, completions }
  writeHabitsToStorage(next)
}