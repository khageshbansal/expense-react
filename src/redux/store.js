import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Optional - for async actions
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
