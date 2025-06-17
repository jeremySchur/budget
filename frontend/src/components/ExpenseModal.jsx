import { useState } from 'react';
import axios from '../api/axios';

function ExpenseModal({ isOpen, onClose, onExpenseAdded }) {
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category: 'Various',
        recurring: 0
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = [
        { value: 'Hobby', label: 'Hobby' },
        { value: 'Savings', label: 'Savings' },
        { value: 'Subscription', label: 'Subscription' },
        { value: 'Various', label: 'Various' }
    ];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (checked === true ? 1 : 0) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await axios.post('/expenses', formData);
            onExpenseAdded();
            onClose();
            setFormData({
                description: '',
                amount: '',
                date: new Date().toISOString().split('T')[0],
                category: 'Various',
                recurring: 0
            });
        } catch (error) {
            console.error('Error adding expense');
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
                    <h2 className="text-xl font-semibold text-primary">Add New Expense</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-primary text-xl font-bold"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-primary mb-1">
                            Description
                        </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-complementary focus:border-transparent"
                            placeholder="Enter expense description"
                        />
                    </div>

                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-primary mb-1">
                            Amount ($)
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            required
                            min="0"
                            step="0.01"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-complementary focus:border-transparent"
                            placeholder="0.00"
                        />
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-primary mb-1">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-complementary focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-primary mb-1">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-complementary focus:border-transparent"
                        >
                            {categories.map(category => (
                                <option key={category.value} value={category.value}>
                                    {category.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="recurring"
                            name="recurring"
                            checked={formData.recurring}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-complementary focus:ring-complementary border-gray-300 rounded"
                        />
                        <label htmlFor="recurring" className="ml-2 block text-sm text-primary">
                            Recurring expense
                        </label>
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
                            {isSubmitting ? 'Adding...' : 'Add Expense'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ExpenseModal;
