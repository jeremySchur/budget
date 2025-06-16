import { useEffect, useState } from 'react';
import Calculation from './Calculation';
import Expenses from './Expenses';
import GoalTracking from './GoalTracking';
import Header from './components/Header';
import axios from './api/axios';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');

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

  return (
    <div className="w-screen h-screen bg-primary p-5">
      <Header />
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
        />
        <GoalTracking />
      </section>
    </div>
  );
};

export default App;
