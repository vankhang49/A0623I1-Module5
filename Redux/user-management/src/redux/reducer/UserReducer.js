import {ADD_USER, DELETE_ALL_USER, DELETE_USER, GET_ALL_USER} from "../Constant";

const userReducer = (users = [], action) => {
    const {type, payload} = action;
    switch (type) {
        case ADD_USER:
            return [...users, payload];
        case GET_ALL_USER:
            return payload;
        case DELETE_USER:
            return users.filter(user => user.id !== payload);
        case DELETE_ALL_USER:
            return users;
        default:
            return users;
    }
}

export default userReducer;