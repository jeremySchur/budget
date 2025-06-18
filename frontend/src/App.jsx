import { useEffect, useState } from 'react';
import Calculation from './Calculation';
import Expenses from './Expenses';
import GoalTracking from './GoalTracking';
import Header from './components/Header';
import ExpenseModal from './components/ExpenseModal';
import axios from './api/axios';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('/expenses');
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses');
      }
    };

    fetchExpenses();
  }, []);

  const deleteExpense = async (id) => {
    try {
      await axios.delete('/expenses', { data: { id } });
      setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
    } catch (error) {
      console.error('Error deleting expense');
    }
  };

  const handleExpenseAdded = async () => {
    try {
      const response = await axios.get('/expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses');
    }
  };

  return (
    <div className="w-screen h-screen bg-primary p-5">
      <Header onNewExpenseClick={() => setIsExpenseModalOpen(true)} />
      <hr className="border-t border-box-color-light mt-4 w-full" />

      <section className="flex my-20 h-3/4 justify-between">
        <Expenses
          expenses={expenses}
          filterCategory={filterCategory}
          setFilterCategory={(category) => setFilterCategory(category)}
          onDeleteExpense={deleteExpense}
        />
        <Calculation
          expenses={expenses}
          filterCategory={filterCategory}
          onExpensesUpdate={handleExpenseAdded}
        />
        <GoalTracking />
      </section>

      <ExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        onExpenseAdded={handleExpenseAdded}
      />
    </div>
  );
};

export default App;
