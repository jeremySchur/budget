import { useState } from 'react';
import hobbySvg from '../assets/hobby.svg';
import savingsSvg from '../assets/savings.svg';
import subscriptionSvg from '../assets/subscription.svg';
import variousSvg from '../assets/various.svg';
import trashSvg from '../assets/trash.svg';

const categoryMap = {
    Hobby: hobbySvg,
    Savings: savingsSvg,
    Subscription: subscriptionSvg,
    Various: variousSvg
};

function Expense({ expense, onDelete }) {
    const [isClicked, setIsClicked] = useState(false);

    const svgIcon = categoryMap[expense.category];

    return (
        <div 
            className="border-t-1 border-dashed border-box-color-light p-4 cursor-pointer"
            onClick={() => setIsClicked(!isClicked)}
        >
            <div className="flex items-center">
                <img src={svgIcon} alt="Category Icon" className="h-14 w-14" />
                <div className="ml-4 flex-1">
                    <h4 className="text-lg font-semibold text-box-color-light">{expense.category}</h4>
                    <p className="text-sm text-box-color-light">{new Date(expense.date).toLocaleDateString()}</p>
                </div>
                <div className="ml-auto">
                    <p className="text-lg font-semibold text-box-color-light">${expense.amount.toFixed(2)}</p>
                </div>
            </div>
            {isClicked && (
                <div className="mt-2 text-box-color-light flex">
                    <p>{expense.description}</p>
                    <button
                        className="ml-auto cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(expense.id);
                        }}
                    >
                        <img src={trashSvg} alt="Delete Icon" className="h-6 w-6" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Expense;