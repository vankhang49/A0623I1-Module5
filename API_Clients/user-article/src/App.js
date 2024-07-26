import './App.css';
import {ToastContainer} from "react-toastify";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {UserList} from "./components/UserList";
import {UserDetail} from "./components/UserDetail";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/users" element={<UserList/>}></Route>
          <Route path="/users/detail" element={<UserDetail/>}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
