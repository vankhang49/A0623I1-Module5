import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {UserList} from "./components/UserList";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/users" element={<UserList/>}></Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer/>
      </>
  );
}

export default App;
