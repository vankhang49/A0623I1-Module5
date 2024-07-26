import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from "./components/Category";
import Product from "./components/Product";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/*<Route path="/" element={<Category />} />*/}
          {/*<Route path="/contract/:categoryId" element={<Product />} />*/}
            <Route path="/" element={<Category />} />
            <Route path="/product" element={<Product />} />
        </Routes>
      </BrowserRouter>
  );
}
export default App;