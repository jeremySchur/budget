import { useState, useEffect } from 'react';
import Goal from './components/Goal';
import GoalModal from './components/GoalModal';
import axios from './api/axios';

function GoalTracking() {
    const [goals, setGoals] = useState([]);
    const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await axios.get('/goals');
                const formattedGoals = response.data.map(goal => ({
                    id: goal.id,
                    name: goal.name,
                    targetAmount: goal.target_amount,
                    currentAmount: goal.current_amount
                }));
                setGoals(formattedGoals);
            } catch (error) {
                console.error('Error fetching goals');
            }
        };

        fetchGoals();
    }, []);

    const handleNewGoal = () => {
        setIsGoalModalOpen(true);
    };
    
    const handleGoalAdded = async () => {
        try {
            const response = await axios.get('/goals');
            const formattedGoals = response.data.map(goal => ({
                id: goal.id,
                name: goal.name,
                targetAmount: goal.target_amount,
                currentAmount: goal.current_amount
            }));
            setGoals(formattedGoals);
        } catch (error) {
            console.error('Error fetching goals after addition');
        }
    };

    const deleteGoal = async (goalId) => {
        try {
            await axios.delete('/goals', { data: { id: goalId } });
            setGoals(prevGoals => prevGoals.filter(goal => goal.id !== goalId));
        } catch (error) {
            console.error('Error deleting goal');
        }
    };

    const updateGoal = async (goalId, updatedGoal) => {
        try {
            const updateData = { id: goalId };
            
            if (updatedGoal.name !== undefined) {
                updateData.name = updatedGoal.name;
            }
            if (updatedGoal.targetAmount !== undefined) {
                updateData.target_amount = updatedGoal.targetAmount;
            }
            if (updatedGoal.currentAmount !== undefined) {
                updateData.current_amount = updatedGoal.currentAmount;
            }

            await axios.patch('/goals', updateData);
            setGoals(goals.map(goal =>
                goal.id === goalId ? { ...goal, ...updatedGoal } : goal
            ));
        } catch (error) {
            console.error('Error updating goal');
        }
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
