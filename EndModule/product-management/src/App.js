import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ProductCreate} from "./components/product/ProductCreate";
import {ProductEdit} from "./components/product/ProductEdit";
import {ProductDetail} from "./components/product/ProductDetail";
import {ProductList} from "./components/product/ProductList";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/products"} element={<ProductList/>}></Route>
          <Route path={"/products/create"} element={<ProductCreate/>}></Route>
          <Route path={"/products/edit"} element={<ProductEdit/>}></Route>
          <Route path={"/products/detail"} element={<ProductDetail/>}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
