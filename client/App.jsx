import Login from './components/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
import PurchaseHistory from './components/PurchaseHistory';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={<Products />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
          <Route path="/orderMain" element={<PurchaseHistory />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
