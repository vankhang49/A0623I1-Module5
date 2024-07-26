import {TaskList} from "./components/task/TaskList";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {TaskCreate} from "./components/task/TaskCreate";
import {TaskEdit} from "./components/task/TaskEdit";
import {TaskDetail} from "./components/task/TaskDetail";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path={"/tasks"} element={<TaskList/>}></Route>
                <Route path={"/tasks/create"} element={<TaskCreate/>}></Route>
                <Route path={"/tasks/edit"} element={<TaskEdit/>}></Route>
                <Route path={"/tasks/detail"} element={<TaskDetail/>}></Route>
            </Routes>
        </BrowserRouter>
        <ToastContainer/>
    </div>
  );
}

export default App;
