import { useState, useRef } from "react";

function Income({ income, setIncome, onIncomeUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef(null);

    const handleInputFocus = () => {
        setIsEditing(true);
        setIncome('');
    };
    
    const handleInputBlur = async () => {
        setIsEditing(false);
        let finalAmount;
        if (income === '' || isNaN(parseFloat(income))) {
            finalAmount = '0.00';
            setIncome('0.00');
        } else {
            finalAmount = parseFloat(income).toFixed(2);
            setIncome(finalAmount);
        }
        
        if (onIncomeUpdate) {
            await onIncomeUpdate(finalAmount);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value.replace(/[^0-9.]/g, '');
        setIncome(value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            inputRef.current.blur();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-box-color-light w-full p-4 mt-4 rounded shadow-lg">
            <h4 className="text-lg font-semibold">MONTHLY INCOME</h4>
            <div className="flex items-center">
                <span className="text-2xl font-semibold">$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={isEditing ? income : parseFloat(income).toFixed(2)}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                    className="text-2xl font-semibold outline-none text-center bg-transparent border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none min-w-0"
                    style={{ width: `${Math.max(4, (isEditing ? income : parseFloat(income).toFixed(2)).length)}ch` }}
                    placeholder="0.00"
                />
            </div>
        </div>
    );
};

export default Income;