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
        title: "Limit Drinking",
        description: "<2 drinks a day for 7 days",
        targetDays: 7,
        daysCompleted: 6,
        strikes: 1,
        maxStrikes: 3,
        completed: false,
        broken: 1,
        createdAt: new Date('2024-12-01')
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
                createdAt: new Date(),
                isEditing: streak.isEditing || false
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
    },
    
    // Rename a streak
    rename: (id, newTitle) => {
        streaks.update(items => 
            items.map(item => 
                item.id === id 
                    ? { ...item, title: newTitle }
                    : item
            )
        );
    },

    increment: (id) => {
        streaks.update(items => 
            items.map(item =>
                item.id === id
                    ? {...item, length: item.length + 1 }
                    : item
            )
        )
    },

    // Clear editing flag
    clearEditingFlag: (id) => {
        streaks.update(items => 
            items.map(item => 
                item.id === id 
                    ? { ...item, isEditing: false }
                    : item
            )
        );
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
                targetDays: 7,
                daysCompleted: 0,
                strikes: 0,
                maxStrikes: 3,
                completed: true, // Changed to true so update mode is available
                broken: 0,
                createdAt: new Date(),
                isUpdating: true,
                isEditing: false
            }
        ]);
    },
    
    // Add a strike to a goal
    addStrike: (id) => {
        goals.update(items => 
            items.map(item => {
                if (item.id === id) {
                    const newStrikes = item.strikes + 1;
                    
                    // If max strikes reached, reset everything
                    if (newStrikes >= item.maxStrikes) {
                        return {
                            ...item,
                            strikes: 0,
                            daysCompleted: 0,
                            broken: item.broken + 1,
                            completed: false
                        };
                    }
                    
                    // Otherwise just add the strike
                    return {
                        ...item,
                        strikes: newStrikes
                    };
                }
                return item;
            })
        );
    },
    
    // Complete a day
    completeDay: (id) => {
        goals.update(items => 
            items.map(item => {
                if (item.id === id && item.daysCompleted < item.targetDays) {
                    const newDaysCompleted = item.daysCompleted + 1;
                    return {
                        ...item,
                        daysCompleted: newDaysCompleted,
                        completed: newDaysCompleted >= item.targetDays
                    };
                }
                return item;
            })
        );
    },
    
    // Remove a goal
    remove: (id) => {
        goals.update(items => items.filter(item => item.id !== id));
    },
    
    // Rename a goal
    rename: (id, newTitle) => {
        goals.update(items => 
            items.map(item => 
                item.id === id 
                    ? { ...item, title: newTitle }
                    : item
            )
        );
    },

    // Update goal by id
    updateGoal: (id, updates) => {
        goals.update(items => 
            items.map(item => 
                item.id === id 
                    ? { 
                        ...item, 
                        ...updates,
                        // Reset progress and strikes when updating
                        daysCompleted: 0,
                        strikes: 0,
                        completed: false
                    }
                    : item
            )
        );
    },

    // Clear updating flag
    clearUpdatingFlag: (id) => {
        goals.update(items => 
            items.map(item => 
                item.id === id 
                    ? { ...item, isUpdating: false }
                    : item
            )
        );
    },
};