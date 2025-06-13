import Expenses from './Expenses';
import Header from './components/Header';

function App() {
  return (
    <div className="w-screen h-screen bg-primary p-5">
      <Header />
      <hr className="border-t border-box-color-light mt-4 w-full" />

      <section className="flex my-20 h-3/4">
        <Expenses />
      </section>
    </div>
  );
};

export default App;
