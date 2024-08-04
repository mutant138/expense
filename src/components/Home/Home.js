import React, { useState, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';

const Home = () => {
  const authCtx = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  if (!authCtx.isLoggedIn) {
    return <p>Please log in to view this page.</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Welcome to the Expense Tracker Homepage</h2>
      <ExpenseForm onAddExpense={addExpenseHandler} />
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default Home;
