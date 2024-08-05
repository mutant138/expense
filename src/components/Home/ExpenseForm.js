import React, { useState } from 'react';
import './ExpenseForm.css';

const categories = ['Food', 'Petrol', 'Salary', 'Entertainment', 'Other'];

const ExpenseForm = ({ onAddExpense }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');

  const submitHandler = async (event) => {
    event.preventDefault();
    if (amount.trim() === '' || description.trim() === '') {
      alert('Please fill out all fields.');
      return;
    }
    
    const newExpense = { amount, description, category };
    await onAddExpense(newExpense);
    setAmount('');
    setDescription('');
    setCategory('Food');
  };

  return (
    <div className="expense-form-container mt-5">
      <h2>Add Expense</h2>
      <form onSubmit={submitHandler} className="expense-form">
        <div className="form-group">
          <label>Amount Spent</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
