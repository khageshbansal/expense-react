import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addExpense, deleteExpense, updateExpense } from '../redux/actions';


function Shop() {
  let content = <p>Loading expenses...</p>;
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const expenseNameRef = useRef();
  const expenseAmountRef = useRef();
  const expenseCategoryRef = useRef();





  // expenses = useSelector(state => state.expenses);
  const dispatch = useDispatch();


  
  // const handleAddExpense = expense => {
  //   dispatch(addExpense(expense));
  // };

  // const handleDeleteExpense = id => {
  //   dispatch(deleteExpense(id));
  // };

  // const handleUpdateExpense = (id, expense) => {
  //   dispatch(updateExpense(id, expense));
  // };





  const url =
    'https://react-expense-tracker-1a568-default-rtdb.firebaseio.com/expenses.json';

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function addExpense(event) {
    event.preventDefault();
    dispatch(addExpense(expense));
    const name = expenseNameRef.current.value;
    const amount = expenseAmountRef.current.value;
    const category = expenseCategoryRef.current.value;
    if (name === '' || amount === '' || category === 'Select a category') {
      alert('Please fill all values');
      return;
    }

    const expense = { name, amount, category };

    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(expense),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      setExpenses((prevExpenses) => [
        ...prevExpenses,
        { id: data.name, ...expense },
      ]);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);

    expenseNameRef.current.value = '';
    expenseAmountRef.current.value = '';
    expenseCategoryRef.current.value = 'Select a category';
  }

  async function deleteExpense(id) {
    dispatch(deleteExpense(id));
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://react-expense-tracker-1a568-default-rtdb.firebaseio.com/expenses/${id}.json`,
        {
          method: 'DELETE',
        }
      );
      if (response.ok) {
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense.id !== id)
        );
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  async function fetchExpenses() {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      const loadedExpenses = [];

      for (const key in data) {
        loadedExpenses.push({
          id: key,
          name: data[key].name,
          amount: data[key].amount,
          category: data[key].category,
        });
      }

      setExpenses(loadedExpenses);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
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
            <tbody>
              {isLoading && content}
              {!isLoading &&
                expenses.map((expense, index) => {
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
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Shop;
