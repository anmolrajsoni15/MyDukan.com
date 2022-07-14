import React, { useState } from 'react'
import './App.css';
import Header from './components/layout/Header/Header';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import WebFont from "webfontloader";
import Footer from './components/layout/Footer/Footer';
import Home from "./components/Home/Home";
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Product/Search';
import LoginSignUp from './components/User/LoginSignUp';
import store from "./store"
import { loadUser } from './actions/userAction';
import UserOptions from "./components/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from './components/Cart/Payment';
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js";
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';
import Contact from './components/layout/Contact/Contact';
import About from './components/layout/About/About';

function App() {
  const {isAuthenticated, user, loading} = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey(){
    const {data} = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(()=>{
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  },[]);

  return (
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user = {user}/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path='/products/:keyword' element={<Products/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<About/>}/>
        {isAuthenticated && !loading && <Route path='/account' element={<Profile/>}/>}
        {isAuthenticated && !loading && <Route path='/me/update' element={<UpdateProfile/>}/>}
        {isAuthenticated && !loading && <Route path='/password/update' element={<UpdatePassword/>}/>}
        <Route path='/password/forgot' element={<ForgotPassword/>}/>
        <Route path='/password/reset/:token' element={<ResetPassword/>}/>
        
        <Route path='/login' element={<LoginSignUp/>}/>
        <Route path='/cart' element={<Cart/>}/>
        {isAuthenticated && !loading && <Route path='/shipping' element={<Shipping/>}/>}
        {stripeApiKey && isAuthenticated && !loading && <Route path='/process/payment' element={<Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements>}/>}
        {isAuthenticated && !loading && <Route path='/success' element={<OrderSuccess/>}/>}
        {isAuthenticated && !loading && <Route path='/orders' element={<MyOrders/>}/>}
        
        {isAuthenticated && !loading && <Route path='/order/confirm' element={<ConfirmOrder/>}/>}
        {isAuthenticated && !loading && <Route path='/order/:id' element={<OrderDetails/>}/>}
        {isAuthenticated && !loading && user.role === "admin" && <Route path='/admin/dashboard' element={<Dashboard/>}/>}
        {isAuthenticated && !loading && user.role === "admin" && <Route path='/admin/products' element={<ProductList/>}/>}
        {isAuthenticated && !loading && user.role === "admin" && <Route path='/admin/product' element={<NewProduct/>}/>}
        {isAuthenticated && !loading && user.role === "admin" && <Route path='/admin/product/:id' element={<UpdateProduct/>}/>}
        {isAuthenticated && !loading && user.role === "admin" && <Route path='/admin/orders' element={<OrderList/>}/>}
        {isAuthenticated && !loading && user.role === "admin" && <Route path='/admin/order/:id' element={<ProcessOrder/>}/>}
        {isAuthenticated && !loading && user.role === "admin" && <Route path='/admin/users' element={<UsersList/>}/>}
        {isAuthenticated && !loading && user.role === "admin" && <Route path='/admin/user/:id' element={<UpdateUser/>}/>}
        {isAuthenticated && !loading && user.role === "admin" && <Route path='/admin/reviews' element={<ProductReviews/>}/>}
        
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
