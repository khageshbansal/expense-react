import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: [],
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense(state, action) {
      state.expenses.push(action.payload);
    },
    deleteExpense(state, action) {
      state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
    },
    setExpenses(state, action) {
      state.expenses = action.payload;
    },
    updateExpense(state, action) {
      const { id, updatedExpense } = action.payload;
      const index = state.expenses.findIndex(expense => expense.id === id);
      if (index !== -1) {
        state.expenses[index] = updatedExpense;
      }
    },
  }
});

export const { addExpense, deleteExpense, updateExpense, setExpenses } = expenseSlice.actions;
export default expenseSlice.reducer;
