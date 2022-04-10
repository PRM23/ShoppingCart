import logo from "./logo.svg";
import "./App.css";
import Product from "./components/product";
import ProductItem from "./components/ProductItem";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Product /> */}
      {/* <ProductItem /> */}

      <Router>
        <Routes>
          <Route path="/" element={<Product />}></Route>
          <Route path="/product" element={<ProductItem />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
