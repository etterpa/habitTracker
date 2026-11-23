import type { Habit } from "../context/useHabits";
import { isSameDay } from "date-fns";

// --- MOCK IN-MEMORY DATABASE SIMULATION START ---
// In a real application, this would be replaced by an actual SQLite connection (e.g., using sqlite3 package)

/** @type {Habit[]} */
let mockDatabase: Habit[] = [];

/** Helper function to simulate UUID generation for robustness in mock environment */
const generateUuid = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

const initializeMockDB = async () => {
    console.log("--- Initializing Mock Database ---");
    // Simulate initial load data structure
    mockDatabase = [
        { id: 'initial-habit', name: 'Read Book', completions: [] }
    ];
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate I/O delay
};

export const getInitialHabits = async (): Promise<Habit[]> => {
    // Ensure the mock DB is initialized before reading
    if (mockDatabase.length === 0) {
        await initializeMockDB();
    }
    // Simulate fetching from DB
    return [...mockDatabase];
};

const findHabitIndex = (id: string): number => mockDatabase.findIndex(h => h.id === id);


export const addHabitToDB = async (name: string): Promise<void> => {
    console.log("--- DB Operation: Adding Habit ---");
    await new Promise(resolve => setTimeout(resolve, 50)); // Simulate I/O delay

    const newHabitId: string = generateUuid();
    const newHabit: Habit = { id: newHabitId, name, completions: [] };

    mockDatabase = [...mockDatabase, newHabit];
};


export const deleteHabitFromDB = async (id: string): Promise<void> => {
    console.log(`--- DB Operation: Deleting Habit ID ${id} ---`);
    await new Promise(resolve => setTimeout(resolve, 50)); // Simulate I/O delay

    const indexToDelete = findHabitIndex(id);
    if (indexToDelete !== -1) {
        mockDatabase.splice(indexToDelete, 1);
    } else {
        throw new Error(`Habit with ID ${id} not found.`);
    }
};


export const toggleCompletionInDB = async (id: string, date: Date): Promise<void> => {
    console.log(`--- DB Operation: Toggling Completion for Habit ID ${id} on ${date.toDateString()} ---`);
    await new Promise(resolve => setTimeout(resolve, 50)); // Simulate I/O delay

    const index = findHabitIndex(id);
    if (index === -1) {
        throw new Error(`Habit with ID ${id} not found.`);
    }

    const h = mockDatabase[index];
    const alreadyDone = h.completions.some(c => isSameDay(c, date));
    
    let updatedCompletions: Date[];

    if (alreadyDone) {
        updatedCompletions = h.completions.filter(c => !isSameDay(c, date));
    } else {
        updatedCompletions = [...h.completions, date];
    }
    
    // Update the mock DB state
    mockDatabase[index] = { ...h, completions: updatedCompletions };
};
