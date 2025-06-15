import { useState } from 'react';
import Expense from './components/Expense';

import cartOutlineSvg from './assets/cart-outline.svg';

function Expenses({ expenses }) {
    const [filterCategory, setFilterCategory] = useState('all');

    const filteredExpenses = filterCategory === 'all' 
        ? expenses 
        : expenses.filter(expense => expense.category.toLowerCase() === filterCategory);

    const handleFilterChange = (e) => {
        setFilterCategory(e.target.value);
    };

    const ExpenseList = () => {
        return filteredExpenses.map(expense => (
            <Expense key={expense.id} expense={expense} />
        ));
    };

    return (
        <div className="flex flex-col h-full w-5/12">
            <div className="flex">
                <h3 className="text-lg font-semibold text-contrast">Description</h3>
                <div className="ml-auto">
                    <div className="flex items-center border-1 border-contrast rounded px-2 py-1">
                        <span className="text-white">Filter Expenses |</span>
                        <select 
                            className="text-contrast pl-2 cursor-pointer bg-primary outline-none"
                            value={filterCategory}
                            onChange={handleFilterChange}
                        >
                            <option value="all">All</option>
                            <option value="hobby">Hobby</option>
                            <option value="savings">Savings</option>
                            <option value="subscription">Subscription</option>
                            <option value="various">Various</option>
                        </select>
                    </div>
                </div>
            </div>

            { filteredExpenses.length === 0 ? (
                <div className="m-auto text-center">
                    <p className="text-4xl font-bold text-white">Looks Like You Haven't</p>
                    <p className="text-4xl font-bold text-white">Added Any <span className="text-complementary">Expenses Yet.</span></p>
                    <p className="mt-12 font-semibold text-white">No Worries, Just Hit the <span className="text-contrast">'New Expense'</span> Button</p>
                    <p className="font-semibold text-white">To Get Started</p>
                    <img src={cartOutlineSvg} alt="Cart Outline" className="h-16 w-16 mx-auto mt-8" />
                </div>
            ) : (
                <div className="mt-8 overflow-y-auto">
                    <ExpenseList />
                </div>
            )}
        </div>
    );
};

export default Expenses;