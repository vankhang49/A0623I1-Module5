import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Home from "./components/Home";
import Employee from "./components/Employee";
import EmployeeDetail from "./components/EmployeeDetail";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/employee/detail" element={<EmployeeDetail />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
