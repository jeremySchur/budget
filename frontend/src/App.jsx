import { useState } from 'react';
import Calculation from './Calculation';
import Expenses from './Expenses';
import GoalTracking from './GoalTracking';
import Header from './components/Header';

const expenses = [{
    id: 1,
    amount: 50.00,
    category: 'Hobby',
    description: 'Guitar strings and picks',
    date: '2023-10-01'
}, {
    id: 2,
    amount: 15.99,
    category: 'Subscription',
    description: 'Monthly music streaming service',
    date: '2023-10-05'
}, {
    id: 3,
    amount: 100.00,
    category: 'Savings',
    description: 'Monthly savings deposit',
    date: '2023-10-10'
}, {
    id: 4,
    amount: 20.00,
    category: 'Various',
    description: 'Coffee with friends',
    date: '2023-10-15'
}];

function App() {
  const [filterCategory, setFilterCategory] = useState('all');

  return (
    <div className="w-screen h-screen bg-primary p-5">
      <Header />
      <hr className="border-t border-box-color-light mt-4 w-full" />

      <section className="flex my-20 h-3/4 justify-between">
        <Expenses 
          expenses={expenses} 
          filterCategory={filterCategory}
          setFilterCategory={(category) => setFilterCategory(category)}
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
