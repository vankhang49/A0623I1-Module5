import logo from './logo.svg';
import './App.css';
import DemoState from "./components/DemoState";
import StudentListFunc from "./components/student/StudentListFunc";
import DemoStateFunc from "./components/DemoStateFunc";
import StudentCreate from "./components/student/StudentCreate";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllStudentMiddleware} from "./redux/middleware/StudentMiddleware";

function App() {
    const students = useSelector(state => state.students);
    let nameClass = "A0623I1"
    // => State.
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllStudentMiddleware())
    }, []);

    const changeNameClass = (temp) => {
        console.log(temp);
        nameClass = temp;
        console.log(nameClass)
    }


    return (
        <>
            <h1>Số lượng giỏ hàng {students.length}</h1>
            {/*<StudentList changeName = {changeNameClass} nameClass = {nameClass} ageClass="2"></StudentList>*/}
            {/*<StudentListFunc></StudentListFunc>*/}
            <BrowserRouter>
                <Routes>
                    <Route path="student" element={<StudentListFunc/>}></Route>
                    <Route path="student/create" element={<StudentCreate/>}></Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer/>
        </>
    );
}

export default App;
