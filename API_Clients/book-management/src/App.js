import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Library from "./components/Library";
import CreateBook from "./components/CreateBook";
import UpdateBook from "./components/UpdateBook";

function App() {
  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="library" element={<Library/>}></Route>
            <Route path="library/create" element={<CreateBook/>}></Route>
            <Route path="library/edit" element={<UpdateBook/>}></Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </div>
  );
}

export default App;
