import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../store/auth-context';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';

const Home = () => {
  const authCtx = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('https://react-proj-a12e5-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json');
        const expensesData = response.data;
        const loadedExpenses = [];
        for (const key in expensesData) {
          loadedExpenses.push({
            id: key,
            ...expensesData[key],
          });
        }
        setExpenses(loadedExpenses);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  const addExpenseHandler = async (expense) => {
    try {
      const response = await axios.post('https://react-proj-a12e5-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json', expense);
      const newExpense = { id: response.data.name, ...expense };
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  if (!authCtx.isLoggedIn) {
    return <p>Please log in to view this page.</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Welcome to the Expense Tracker Homepage</h2>
      <ExpenseForm onAddExpense={addExpenseHandler} />
      <ExpenseList expenses={expenses} setExpenses={setExpenses} />
    </div>
  );
};

export default Home;
