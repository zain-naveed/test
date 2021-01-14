import { createStore, combineReducers, applyMiddleware } from "redux";
import {TaskReducer} from '../reducer/taskReducer'
const thunkMiddleware = require("redux-thunk").default;
const MainReducer = combineReducers({Task:TaskReducer});
const store = createStore(MainReducer, applyMiddleware(thunkMiddleware));
export default store;