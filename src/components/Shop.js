import React, { useState, useRef, useEffect } from 'react';
import firebase from './firebase';

function Shop() {
  const [expenses, setExpenses] = useState([]);
  const expenseNameRef = useRef();
  const expenseAmountRef = useRef();
  const expenseCategoryRef = useRef();

  // function addExpense(event) {
  //   event.preventDefault();
  //   const name = expenseNameRef.current.value;
  //   const amount = expenseAmountRef.current.value;
  //   const category = expenseCategoryRef.current.value;
  //   if (name === '' || amount === '' || category === 'Select a category')
  //     alert('fill all values')
  //   setExpenses((prevExpenses) => {
  //     return [...prevExpenses, { name, amount, category }];
  //   });
  //   expenseNameRef.current.value = null;
  //   expenseAmountRef.current.value = null;
  //   expenseCategoryRef.current.value = 'Select a category';
  // }

  // function displayExpenses() {
  //   return expenses.map((expense, index) => {
  //     return (
  //       <tr key={index}>
  //         <th scope="row">{index + 1}</th>
  //         <td>{expense.name}</td>
  //         <td>{`₹ ${expense.amount}`}</td>
  //         <td>{expense.category}</td>
  //         <td>
  //           <button
  //             type="button"
  //             className="btn btn-danger"
  //             onClick={() => deleteExpense(expense.id)}
  //           >
  //             Delete
  //           </button>
  //         </td>
  //       </tr>
  //     );
  //   });
  // }


  useEffect(() => {
    const expensesRef = firebase.database().ref('expenses');
    expensesRef.on('value', (snapshot) => {
      const expenses = snapshot.val();
      const expensesList = [];
      for (let id in expenses) {
        expensesList.push({ id, ...expenses[id] });
      }
      setExpenses(expensesList);
    });
  }, []);

  function addExpense(event) {
    event.preventDefault();
    const name = expenseNameRef.current.value;
    const amount = expenseAmountRef.current.value;
    const category = expenseCategoryRef.current.value;
    if (name === '' || amount === '' || category === 'Select a category') {
      alert('Please fill all values');
      return;
    }

    const expense = { name, amount, category };
    firebase.database().ref('expenses').push(expense);

    expenseNameRef.current.value = '';
    expenseAmountRef.current.value = '';
    expenseCategoryRef.current.value = 'Select a category';
  }

  function deleteExpense(id) {
    firebase.database().ref(`expenses/${id}`).remove();
  }

  function displayExpenses() {
    return expenses.map((expense, index) => {
      return (
        <tr key={expense.id}>
          <th scope="row">{index + 1}</th>
          <td>{expense.name}</td>
          <td>{`₹ ${expense.amount}`}</td>
          <td>{expense.category}</td>
          <td>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteExpense(expense.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2>Add Expense</h2>
          <form onSubmit={addExpense}>
            <div className="mb-3">
              <label htmlFor="expense-name" className="form-label">
                Expense Name
              </label>
              <input
                type="text"
                className="form-control"
                id="expense-name"
                ref={expenseNameRef}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="expense-amount" className="form-label">
                Expense Amount
              </label>
              <input
                type="number"
                className="form-control"
                id="expense-amount"
                ref={expenseAmountRef}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="expense-category" className="form-label">
                Category
              </label>
              <select
                className="form-select"
                id="expense-category"
                ref={expenseCategoryRef}
              >
                <option selected>Select a category</option>
                <option value="Groceries">Groceries</option>
                <option value="Transportation">Transportation</option>
                <option value="Housing">Housing</option>
                <option value="Entertainment">Entertainment</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Add Expense
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <h2>Expenses</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Expense Name</th>
                <th scope="col">Expense Amount</th>
                <th scope="col">Category</th>
              </tr>
            </thead>
            <tbody>{displayExpenses()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Shop;
