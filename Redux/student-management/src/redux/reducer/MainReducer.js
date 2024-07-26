import {combineReducers} from "redux";
import studentReducer from "./StudentReducer";

const mainReducer = combineReducers({
    students: studentReducer
})

export default mainReducer;