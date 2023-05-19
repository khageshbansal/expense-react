// Action Types
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const SET_EXPENSES = 'SET_EXPENSES';

// Action Creators
export const addExpense = expense => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const deleteExpense = id => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const updateExpense = (id, expense) => ({
  type: UPDATE_EXPENSE,
  payload: { id, expense },
});

export const setExpenses = expenses => ({
  type: SET_EXPENSES,
  payload: expenses,
});
