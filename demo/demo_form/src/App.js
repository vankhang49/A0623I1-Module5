import logo from './logo.svg';
import './App.css';
import DemoState from "./components/DemoState";
import StudentListFunc from "./components/student/StudentListFunc";
import DemoStateFunc from "./components/DemoStateFunc";
import StudentCreate from "./components/student/StudentCreate";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    let nameClass = "A0623I1"
    // => State.

    const changeNameClass = (temp) => {
        console.log(temp);
        nameClass = temp;
        console.log(nameClass)
    }
  return (
    <>
      {/*<StudentList changeName = {changeNameClass} nameClass = {nameClass} ageClass="2"></StudentList>*/}
   {/*<StudentListFunc></StudentListFunc>*/}
        <BrowserRouter>
            <Routes>
                <Route path="student" element={<StudentListFunc/>}></Route>
                <Route path="student/create" element={<StudentCreate/>}></Route>
            </Routes>
        </BrowserRouter>
        <ToastContainer />
    </>
  );
}

export default App;
