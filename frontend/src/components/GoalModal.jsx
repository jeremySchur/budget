import { useState } from 'react';
import axios from '../api/axios';

function GoalModal({ isOpen, onClose, onGoalAdded }) {
    const [formData, setFormData] = useState({
        name: '',
        currentAmount: '',
        targetAmount: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const goalData = {
                name: formData.name,
                target_amount: parseFloat(formData.targetAmount),
                current_amount: parseFloat(formData.currentAmount) || 0
            };

            await axios.post('/goals', goalData);
            onGoalAdded(goalData);
            onClose();
            setFormData({
                name: '',
                currentAmount: '',
                targetAmount: ''
            });
        } catch (error) {
            console.error('Error adding goal:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 backdrop-blur-md bg-black/20"
                onClick={onClose}
            />
            <div className="relative bg-white rounded-lg p-6 w-96 mx-4 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-primary">Add New Goal</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-primary text-xl font-bold"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-primary mb-1">
                            Goal Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-complementary focus:border-transparent"
                            placeholder="Enter goal name"
                        />
                    </div>

                    <div>
                        <label htmlFor="currentAmount" className="block text-sm font-medium text-primary mb-1">
                            Current Saved Amount ($)
                        </label>
                        <input
                            type="number"
                            id="currentAmount"
                            name="currentAmount"
                            value={formData.currentAmount}
                            onChange={handleInputChange}
                            min="0"
                            step="0.01"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-complementary focus:border-transparent"
                            placeholder="0.00"
                        />
                    </div>

                    <div>
                        <label htmlFor="targetAmount" className="block text-sm font-medium text-primary mb-1">
                            Target Amount ($)
                        </label>
                        <input
                            type="number"
                            id="targetAmount"
                            name="targetAmount"
                            value={formData.targetAmount}
                            onChange={handleInputChange}
                            required
                            min="0.01"
                            step="0.01"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-complementary focus:border-transparent"
                            placeholder="0.00"
                        />
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-primary bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 text-sm font-medium text-primary bg-contrast border border-transparent rounded-md hover:bg-contrast-dark focus:outline-none focus:ring-2 focus:ring-contrast disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Adding...' : 'Add Goal'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default GoalModal;
