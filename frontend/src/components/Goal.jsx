import { useState, useRef } from 'react';
import trashSvg from '../assets/trash.svg';

function Goal({ goal, onDelete, onUpdate }) {
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingTarget, setIsEditingTarget] = useState(false);
    const [isEditingCurrent, setIsEditingCurrent] = useState(false);
    const [tempName, setTempName] = useState(goal.name);
    const [tempTarget, setTempTarget] = useState(goal.targetAmount.toString());
    const [tempCurrent, setTempCurrent] = useState(goal.currentAmount.toString());
    
    const nameInputRef = useRef(null);
    const targetInputRef = useRef(null);
    const currentInputRef = useRef(null);

    const progress = goal.targetAmount > 0 ? Math.min((goal.currentAmount / goal.targetAmount) * 100, 100) : 0;

    const handleNameFocus = () => {
        setIsEditingName(true);
        setTempName(goal.name);
    };

    const handleNameBlur = () => {
        setIsEditingName(false);
        if (tempName.trim() !== '') {
            onUpdate(goal.id, { name: tempName.trim() });
        } else {
            setTempName(goal.name);
        }
    };

    const handleNameKeyDown = (e) => {
        if (e.key === 'Enter') {
            nameInputRef.current.blur();
        }
    };

    const handleTargetFocus = () => {
        setIsEditingTarget(true);
        setTempTarget('');
    };

    const handleTargetBlur = () => {
        setIsEditingTarget(false);
        const amount = parseFloat(tempTarget);
        if (!isNaN(amount) && amount > 0) {
            onUpdate(goal.id, { targetAmount: amount });
        } else {
            setTempTarget(goal.targetAmount.toString());
        }
    };

    const handleTargetChange = (e) => {
        const value = e.target.value.replace(/[^0-9.]/g, '');
        setTempTarget(value);
    };

    const handleTargetKeyDown = (e) => {
        if (e.key === 'Enter') {
            targetInputRef.current.blur();
        }
    };

    const handleCurrentFocus = () => {
        setIsEditingCurrent(true);
        setTempCurrent('');
    };

    const handleCurrentBlur = () => {
        setIsEditingCurrent(false);
        const amount = parseFloat(tempCurrent);
        if (!isNaN(amount) && amount >= 0) {
            onUpdate(goal.id, { currentAmount: Math.min(amount, goal.targetAmount) });
        } else {
            setTempCurrent(goal.currentAmount.toString());
        }
    };

    const handleCurrentChange = (e) => {
        const value = e.target.value.replace(/[^0-9.]/g, '');
        setTempCurrent(value);
    };

    const handleCurrentKeyDown = (e) => {
        if (e.key === 'Enter') {
            currentInputRef.current.blur();
        }
    };

    const handleSliderChange = (e) => {
        const percentage = parseFloat(e.target.value);
        const newAmount = (percentage / 100) * goal.targetAmount;
        onUpdate(goal.id, { currentAmount: newAmount });
    };

    return (
        <div className="mb-4 p-4 border border-gray-200 rounded bg-box-color-light">
            <div className="flex items-center justify-between mb-3">
                <input
                    ref={nameInputRef}
                    type="text"
                    value={isEditingName ? tempName : goal.name}
                    onChange={(e) => setTempName(e.target.value)}
                    onFocus={handleNameFocus}
                    onBlur={handleNameBlur}
                    onKeyDown={handleNameKeyDown}
                    className="text-lg font-semibold bg-transparent border-none outline-none rounded px-1"
                />
                <button
                    className="cursor-pointer"
                    onClick={() => onDelete(goal.id)}
                >
                    <img src={trashSvg} alt="Delete" className="h-4 w-4" />
                </button>
            </div>
            <div className="mb-3">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                        background: `linear-gradient(to right, rgb(81, 210, 137) 0%, rgb(81, 210, 137) ${progress}%, #e5e7eb ${progress}%, #e5e7eb 100%)`
                    }}
                />
            </div>

            <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                    <span className="text-gray-600 mr-1">Saved: $</span>
                    <input
                        ref={currentInputRef}
                        type="text"
                        value={isEditingCurrent ? tempCurrent : goal.currentAmount.toFixed(2)}
                        onChange={handleCurrentChange}
                        onFocus={handleCurrentFocus}
                        onBlur={handleCurrentBlur}
                        onKeyDown={handleCurrentKeyDown}
                        className="bg-transparent border-none outline-none rounded font-semibold text-complementary"
                        style={{ width: `${Math.max(4, (isEditingCurrent ? tempCurrent : goal.currentAmount.toFixed(2)).length)}ch` }}
                    />
                </div>
                <div className="flex items-center">
                    <span className="text-gray-600 mr-1">Goal: $</span>
                    <input
                        ref={targetInputRef}
                        type="text"
                        value={isEditingTarget ? tempTarget : goal.targetAmount.toFixed(2)}
                        onChange={handleTargetChange}
                        onFocus={handleTargetFocus}
                        onBlur={handleTargetBlur}
                        onKeyDown={handleTargetKeyDown}
                        className="bg-transparent border-none outline-none rounded font-semibold"
                        style={{ width: `${Math.max(4, (isEditingTarget ? tempTarget : goal.targetAmount.toFixed(2)).length)}ch` }}
                    />
                </div>
            </div>

            <div className="text-center mt-2">
                <span className="text-sm font-semibold text-complementary">
                    {progress.toFixed(1)}% Complete
                </span>
            </div>
        </div>
    );
}

export default Goal;
