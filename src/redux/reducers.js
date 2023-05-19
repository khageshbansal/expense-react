import { ADD_EXPENSE, DELETE_EXPENSE, UPDATE_EXPENSE, SET_EXPENSES } from './actions';

const initialState = {
  expenses: [],
};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id !== action.payload),
      };
    case UPDATE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map(expense =>
          expense.id === action.payload.id ? action.payload.expense : expense
        ),
      };
    case SET_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
      };
    default:
      return state;
  }
};

export default expenseReducer;
