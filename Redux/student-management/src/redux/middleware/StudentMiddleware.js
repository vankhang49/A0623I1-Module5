// import * as studentService from '../../services/studentService';
import * as studentService from "../../services/StudentService";
import {GET_ALL_STUDENT} from "../Constant";

export const getAllStudentMiddleware = () => {
    return async (dispatch) => {
        const students = await studentService.getAllStudent();
        dispatch({
            type: GET_ALL_STUDENT,
            payload: students
        })
    }
}

export const addStudentMiddleware = (student) => async (dispatch) => {
    await studentService.saveStudent(student);
    dispatch({
        type: "ADD_STUDENT",
        payload: student
    })
}

export const deleteStudentMiddleware = (studentId) => async (dispatch) => {
    await studentService.deleteStudent(studentId);
    dispatch({
        type: "DELETE_STUDENT",
        payload: studentId
    })
}