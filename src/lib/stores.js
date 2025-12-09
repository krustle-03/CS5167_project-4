import { writable } from 'svelte/store';

// Sample data structure for streaks
const initialStreaks = [
    {
        id: 1,
        title: "No Smoking",
        length: 15,
        broken: 2,
        createdAt: new Date('2024-11-20')
    },
    {
        id: 2,
        title: "Exercise Daily",
        length: 8,
        broken: 0,
        createdAt: new Date('2024-11-25')
    }
];

// Sample data structure for goals
const initialGoals = [
    {
        id: 1,
        title: "Read 50 Books",
        description: "Read 50 books this year",
        completed: false,
        broken: 1,
        createdAt: new Date('2024-01-01')
    }
];

// Create writable stores
export const streaks = writable(initialStreaks);
export const goals = writable(initialGoals);

// Helper functions
export const streakStore = {
    // Add a new streak
    add: (streak) => {
        streaks.update(items => [
            ...items,
            {
                ...streak,
                id: Date.now(), // Simple ID generation
                length: 0,
                broken: 0,
                createdAt: new Date()
            }
        ]);
    },
    
    // Break a streak
    break: (id) => {
        streaks.update(items => 
            items.map(item => 
                item.id === id 
                    ? { ...item, length: 0, broken: item.broken + 1 }
                    : item
            )
        );
    },
    
    // Remove a streak
    remove: (id) => {
        streaks.update(items => items.filter(item => item.id !== id));
    }
};

export const goalStore = {
    // Add a new goal
    add: (goal) => {
        goals.update(items => [
            ...items,
            {
                ...goal,
                id: Date.now(),
                completed: false,
                broken: 0,
                createdAt: new Date()
            }
        ]);
    },
    
    // Fail a goal
    fail: (id) => {
        goals.update(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, broken: item.broken + 1 }
                    : item
            )
        );
    },
    
    // Remove a goal
    remove: (id) => {
        goals.update(items => items.filter(item => item.id !== id));
    }
};