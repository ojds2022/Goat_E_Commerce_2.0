import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import ShoppingCart from './pages/ShoppingCart';
import PurchaseHistory from './pages/PurchaseHistory';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route exact path="/" element={<Products />} />
          <Route exact path="/product/:productId" element={<ProductDetails />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
          <Route path="/orderMain" element={<PurchaseHistory />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
