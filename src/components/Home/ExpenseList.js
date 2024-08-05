import React from 'react';
import './ExpenseList.css';

const ExpenseList = ({ expenses }) => {
  return (
    <div className="expense-list mt-5">
      <h2>Expenses List</h2>
      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <ul className="list-group">
          {expenses.map((expense) => (
            <li key={expense.id} className="list-group-item">
              <strong>{expense.amount} USD</strong> - {expense.description} ({expense.category})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
