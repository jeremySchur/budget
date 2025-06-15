import { useState } from 'react';
import Goal from './components/Goal';

const initialGoals = [
    {
        id: 1,
        name: 'Vacation Fund',
        targetAmount: 2000.00,
        currentAmount: 850.00
    },
    {
        id: 2,
        name: 'Emergency Fund',
        targetAmount: 5000.00,
        currentAmount: 1200.00
    },
    {
        id: 3,
        name: 'New Car',
        targetAmount: 15000.00,
        currentAmount: 3500.00
    }
];

function GoalTracking() {
    const [goals, setGoals] = useState(initialGoals);

    const handleNewGoal = () => {
        console.log('New goal button clicked');
    };

    const deleteGoal = (goalId) => {
        console.log(`Deleting goal with ID: ${goalId}`);
    };

    const updateGoal = (goalId, updatedGoal) => {
        setGoals(goals.map(goal => 
            goal.id === goalId ? { ...goal, ...updatedGoal } : goal
        ));
    };

    return (
        <div className="flex flex-col h-full w-1/4 p-6 bg-white">
            <h3 className="text-3xl mx-auto">Goal Tracking</h3>
            <hr className="border-t-1 border-dotted mt-4 w-full" />
            
            <button
                onClick={handleNewGoal}
                className="mt-6 bg-contrast px-16 py-3 rounded font-semibold cursor-pointer hover:bg-contrast-dark"
            >
                New Goal
            </button>

            <div className="flex-1 overflow-y-auto mt-4">
                {goals.length === 0 ? (
                    <div className="text-center mt-8">
                        <p className="text-gray-500">No goals yet. Add one above.</p>
                    </div>
                ) : (
                    goals.map(goal => (
                        <Goal
                            key={goal.id}
                            goal={goal}
                            onDelete={deleteGoal}
                            onUpdate={updateGoal}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default GoalTracking;
