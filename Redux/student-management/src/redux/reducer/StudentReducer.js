import {GET_ALL_STUDENT} from "../Constant";

const studentReducer = (students = [], action) => {
    const {type, payload} = action;
    switch (type) {
        case "ADD_STUDENT":
            return [...students, payload];
        case GET_ALL_STUDENT:
            return payload;
        case "DELETE_STUDENT":

            return students.filter(student => student.id !== payload);
        case "DELETE_ALL_STUDENT":
            return students;
        default:
            return students;
    }
}

export default studentReducer;