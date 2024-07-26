import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {OrderCreate} from "./components/order/OrderCreate";
import {OrderEdit} from "./components/order/OrderEdit";
import {OrderDetail} from "./components/order/OrderDetail";
import {OrderList} from "./components/order/OrderList";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/orders"} element={<OrderList/>}></Route>
          <Route path={"/orders/create"} element={<OrderCreate/>}></Route>
          <Route path={"/orders/edit"} element={<OrderEdit/>}></Route>
          <Route path={"/orders/detail"} element={<OrderDetail/>}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
