import {ADD_USER, DELETE_USER, GET_ALL_USER} from "../Constant";
import * as userService from "../../services/UserService";

export const getAllUserMiddleware = () => {
    return async (dispatch) => {
        const users = await userService.getAllUser();
        dispatch({
            type: GET_ALL_USER,
            payload: users
        })
    }
}

export const addUserMiddleware = (user) => async (dispatch) => {
    await userService.saveUser(user);
    dispatch({
        type: ADD_USER,
        payload: user
    })
}

export const deleteUserMiddleware = (userId) => async (dispatch) => {
    await userService.deleteUser(userId);
    dispatch({
        type: DELETE_USER,
        payload: userId
    })
}