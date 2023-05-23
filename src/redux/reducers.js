import { createSlice ,configureStore} from '@reduxjs/toolkit';

const initialExpenseState = {
  expenses: [],
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState:initialExpenseState,
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

export const { setExpenses } = expenseSlice.actions;




const userSlice = createSlice({
  name: 'user',
  initialState:{isPremium:false},
  reducers: {
    makePremium(state) {
      state.isPremium=true;
    }
  }
});

export const { makePremium } = userSlice.actions;



const store = configureStore({
  reducer: {expense:expenseSlice.reducer,user:userSlice.reducer}
});

export default store;
