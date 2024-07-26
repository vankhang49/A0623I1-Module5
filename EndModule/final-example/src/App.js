import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ContractCreate} from "./components/contract/ContractCreate";
import {ContractEdit} from "./components/contract/ContractEdit";
import {ContractDetail} from "./components/contract/ContractDetail";
import {ContractList} from "./components/contract/ContractList";
import {Error404} from "./components/404/Error404";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/contracts"} element={<ContractList/>}></Route>
          <Route path={"/contracts/create"} element={<ContractCreate/>}></Route>
          <Route path={"/contracts/edit"} element={<ContractEdit/>}></Route>
          <Route path={"/contracts/detail"} element={<ContractDetail/>}></Route>
          <Route path={"*"} element={<Error404/>}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
