import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import ShoppingCart from './pages/ShoppingCart';
import PurchaseHistory from './pages/PurchaseHistory';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS, GET_CUSTOMER_BY_ID, GET_PRODUCTS } from "./utils/queries";
import { useEffect } from "react";


export default function App() {

// // testing purposes
// const {data} = useQuery(GET_CUSTOMERS);

// useEffect(() => {
//   console.log('here is some data: ', data);
// }, [data])

// const {data: customer} = useQuery(GET_CUSTOMER_BY_ID, {variables: {_id: "6691aab4bd28d011c8fbcbea"}});

// useEffect(() => {
//   console.log('here is single customer data: ', customer);
// }, [customer])


  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
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
