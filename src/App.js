import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
