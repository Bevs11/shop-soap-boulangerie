import './App.css';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

// COMPONENTS
import Footer from './components/Footer';
import Announcement from './components/Announcement';
import NavBar from './components/NavBar';
import NewsLetter from './components/NewsLetter';

//PAGES
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import CheckoutPage from './pages/CheckoutPage';
import ProductPage from './pages/ProductPage';
import ShopContextProvider from './context/ShopContextProvider';
import OrderSuccessful from './pages/OrderSuccessful';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/AdminDashboard';
import Registration from './pages/Registration';
import AddProducts from './pages/AddProducts';
import RemoveProducts from './pages/RemoveProducts';
import EditProducts from './pages/EditProducts';
import NewsletterList from './pages/NewsletterList';
import OrdersList from './pages/OrdersList';
import LogoutPage from './pages/LogoutPage';

//STYLED COMPONENTS
const Container = styled.div``;

function App() {

  const [ isLoggedIn, setIsLoggedIn ] = useState( false );

return (
  <>
    <ShopContextProvider>
      <Announcement />
      <NavBar />
      <Container>
        <Routes>
          <Route path='/' element={ <Home/>} />
          <Route path='products/productpage' element={ <ProductPage/>} />
          <Route path='/products' element={ <ProductList/>} />
          <Route path='/cart' element={ <CheckoutPage />} /> 
          <Route path='/ordersuccessful' element={ <OrderSuccessful />} />
          <Route path='/login' element={ <LoginPage />} />  
          <Route path='/dashboard' element={ <Dashboard />} />
          <Route path='/registration' element={ <Registration />} />
          <Route path='/addproducts' element={ <AddProducts />} />
          <Route path='/removeproducts' element={ <RemoveProducts />} />
          <Route path='/editproducts' element={ <EditProducts />} />
          <Route path='/newsletterlist' element={ <NewsletterList />} />
          <Route path='/orderslist' element={ <OrdersList />} />
          <Route path='/logout' element={ <LogoutPage />} />
        </Routes>
      </Container>
      <NewsLetter />
      <Footer/>
    </ShopContextProvider>
  </>
)
}

export default App;
