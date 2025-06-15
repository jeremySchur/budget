import { useState } from 'react';
import Income from './components/Income';
import DonutChart from './components/DonutChart';

function Calculation({ expenses, filterCategory }) {
    const [income, setIncome] = useState('5000.00');

    const filteredExpenses = expenses && filterCategory 
        ? (filterCategory === 'all' 
            ? expenses 
            : expenses.filter(expense => expense.category.toLowerCase() === filterCategory))
        : expenses;

    const totalExpenses = filteredExpenses ? filteredExpenses.reduce((total, expense) => total + (expense.amount || 0), 0) : 0;
    const availableIncome = parseFloat(income) - totalExpenses;

    return (
        <div className="flex flex-col items-center h-full w-1/4 p-6 bg-white">
            <h3 className="text-3xl">Calculation</h3>
            <hr className="border-t-1 border-dotted mt-4 w-full" />
            
            <Income income={income} setIncome={(value) => setIncome(value)}/>
            
            <DonutChart income={income} totalExpenses={totalExpenses} />
            
            <div className="flex justify-around mt-4 w-full">
                <div className="bg-black py-2 px-4 text-center w-5/12">
                    <h4 className="text-lg font-semibold text-white mb-1">AVAILABLE</h4>
                    <p className="text-2xl font-bold text-complementary">${availableIncome.toFixed(2)}</p>
                </div>
                <div className="bg-black py-2 px-4 text-center w-5/12">
                    <h4 className="text-lg font-semibold text-white mb-1">SPENT</h4>
                    <p className="text-2xl font-bold text-contrast">${totalExpenses.toFixed(2)}</p>
                </div>
            </div>
            <hr className="border-t-1 border-dotted mt-6 w-full" />

            <button
                className="mt-6 bg-contrast px-16 py-3 rounded font-semibold cursor-pointer hover:bg-contrast-dark"
            >
                Reset Expenses
            </button>
        </div>
    );
};

export default Calculation;