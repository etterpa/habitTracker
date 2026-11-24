import { useState, useEffect} from "react"
import { type ReactNode } from "react"
import { HabitContext, type Habit } from "./useHabits"
import { getInitialHabits, addHabitToDB, deleteHabitFromDB, toggleCompletionInDB } from "../services/databaseService"

type HabitProviderProps = {
  children: ReactNode
}

export function HabitProvider({ children }: HabitProviderProps) {
  const [habits, setHabits] = useState<Habit[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function initializeData() {
      try {
        const initialHabits = await getInitialHabits()
        setHabits(initialHabits)
      } catch (error) {
        console.error("Failed to load habits from database:", error);
      } finally {
        setIsLoading(false);
      }
    }
    initializeData();

  }, [])
  const addHabit = async (name: string) => {
    try {
      await addHabitToDB(name);
      // After successful DB write, refetch all habits to ensure consistency
      const updatedHabits = await getInitialHabits();
      setHabits(updatedHabits);

    } catch (error) {
      console.error("Error adding habit:", error);
    }
  }

  const deleteHabit = async (id: string) => {
    try {
        await deleteHabitFromDB(id);
        // Refetch after deletion
        const updatedHabits = await getInitialHabits(); 
        setHabits(updatedHabits);
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  }

  const toggleHabit = async (id: string, date: Date) => {
    try {
        // The service layer handles the complex DB logic
        await toggleCompletionInDB(id, date); 
        
        // Refetch after updating completion status
        const updatedHabits = await getInitialHabits(); 
        setHabits(updatedHabits);

    } catch (error) {
      console.error("Error toggling habit:", error);
    }
  }


  if (isLoading) {
    return <div>Loading Habit Data...</div>; // Show loading state while fetching from DB
  }

  return (
    <HabitContext value={{ habits, addHabit, toggleHabit, deleteHabit }}>
      {children}
    </HabitContext>
  )
}
