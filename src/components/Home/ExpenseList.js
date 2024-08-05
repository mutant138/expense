import React, { useState } from 'react';
import axios from 'axios';
import './ExpenseList.css';

const ExpenseList = ({ expenses, setExpenses }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editAmount, setEditAmount] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('');

  const categories = ['Food', 'Petrol', 'Salary', 'Entertainment', 'Other'];

  const deleteExpenseHandler = async (id) => {
    try {
      await axios.delete(`https://react-proj-a12e5-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${id}.json`);
      setExpenses((prevExpenses) => prevExpenses.filter(expense => expense.id !== id));
      console.log("Expense successfully deleted");
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const editExpenseHandler = (expense) => {
    setIsEditing(expense.id);
    setEditAmount(expense.amount);
    setEditDescription(expense.description);
    setEditCategory(expense.category);
  };

  const submitEditHandler = async (event, id) => {
    event.preventDefault();

    const updatedExpense = {
      amount: editAmount,
      description: editDescription,
      category: editCategory,
    };

    try {
      await axios.put(`https://react-proj-a12e5-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${id}.json`, updatedExpense);
      setExpenses((prevExpenses) => prevExpenses.map(expense => 
        expense.id === id ? { id, ...updatedExpense } : expense
      ));
      setIsEditing(null);
      console.log("Expense successfully updated");
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  return (
    <div className="expense-list mt-5">
      <h2>Expenses List</h2>
      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <ul className="list-group">
          {expenses.map((expense) => (
            <li key={expense.id} className="list-group-item">
              {isEditing === expense.id ? (
                <form onSubmit={(event) => submitEditHandler(event, expense.id)}>
                  <input
                    type="number"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    required
                  />
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <button type="submit" className="btn btn-primary">Submit</button>
                  <button type="button" className="btn btn-secondary ml-2" onClick={() => setIsEditing(null)}>Cancel</button>
                </form>
              ) : (
                <>
                  <strong>{expense.amount} USD</strong> - {expense.description} ({expense.category})
                  <button className="btn btn-danger ml-3" onClick={() => deleteExpenseHandler(expense.id)}>Delete</button>
                  <button className="btn btn-secondary ml-2" onClick={() => editExpenseHandler(expense)}>Edit</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
