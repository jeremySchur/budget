import { useState } from 'react';
import Goal from './components/Goal';
import GoalModal from './components/GoalModal';

function GoalTracking() {
    const [goals, setGoals] = useState([]);
    const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);

    const handleNewGoal = () => {
        setIsGoalModalOpen(true);
    };

    const handleGoalAdded = (newGoal) => {
        const goalWithId = {
            ...newGoal,
            id: Math.max(...goals.map(g => g.id), 0) + 1
        };
        setGoals(prevGoals => [...prevGoals, goalWithId]);
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
                    )))}
            </div>

            <GoalModal
                isOpen={isGoalModalOpen}
                onClose={() => setIsGoalModalOpen(false)}
                onGoalAdded={handleGoalAdded}
            />
        </div>
    );
};

export default GoalTracking;
