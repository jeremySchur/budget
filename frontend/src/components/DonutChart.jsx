
function DonutChart({ income, totalExpenses }) {
    const incomeAmount = parseFloat(income) || 0;
    const spentPercentage = incomeAmount > 0 ? Math.min((totalExpenses / incomeAmount) * 100, 100) : 0;
    const radius = 95;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (spentPercentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center w-full p-6 mt-4">
            <div className="relative">
                <svg width="220" height="220" className="transform -rotate-90">
                    <circle
                        cx="110"
                        cy="110"
                        r={radius}
                        stroke="#e5e7eb"
                        strokeWidth="12"
                        fill="transparent"
                    />
                    <circle
                        cx="110"
                        cy="110"
                        r={radius}
                        stroke="rgb(81, 210, 137)"
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-500 ease-in-out"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-primary">
                        {Math.round(spentPercentage)}%
                    </span>
                    <span className="text-base text-gray-600">Spent</span>
                </div>
            </div>
        </div>
    );
};

export default DonutChart;