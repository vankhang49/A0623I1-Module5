import {combineReducers} from "redux";
import userReducer from "./UserReducer";

const mainReducer = combineReducers({
    users: userReducer
})

export default mainReducer;