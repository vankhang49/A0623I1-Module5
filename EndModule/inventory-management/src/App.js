import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ClothingList} from "./components/clothes/ClothingList";
import {ClothingCreate} from "./components/clothes/ClothingCreate";
import {ClothingDetail} from "./components/clothes/ClothingDetail";
import {ClothingEdit} from "./components/clothes/ClothingEdit";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/clothes"} element={<ClothingList/>}></Route>
          <Route path={"/clothes/create"} element={<ClothingCreate/>}></Route>
          <Route path={"/clothes/edit"} element={<ClothingEdit/>}></Route>
          <Route path={"/clothes/detail"} element={<ClothingDetail/>}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
