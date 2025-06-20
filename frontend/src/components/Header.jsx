import moneySvg from '../assets/money.svg';

function Header({ onNewExpenseClick }) {
    return (
        <header className="flex">
            <img src={moneySvg} alt="Logo" className="h-16 w-16 mr-3 my-auto" />
            <div className="flex flex-col">
                <h2 className="font-semibold text-contrast">Expenses</h2>
                <h1 className="text-5xl font-bold text-white">Monthly <span className="text-complementary">Budget</span></h1>
            </div>
            <button
                onClick={onNewExpenseClick}
                className="ml-auto my-auto bg-contrast px-10 py-3 rounded font-semibold cursor-pointer hover:bg-contrast-dark"
            >
                New Expense
            </button>
        </header>
    );
};

export default Header;