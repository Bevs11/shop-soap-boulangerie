import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from "../context/ShopContextProvider";
import { Link, useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const { settingId, addingToCart, setCartItems, cartItems, setViewingId, setIsLoggedIn} = useContext(ShopContext);
  const  navigate = useNavigate();

  const yesHandler = (e) => {
    setIsLoggedIn(false);
    localStorage.removeItem ('token');
    navigate('/');
    window.location.reload(true);        
  };

  const noHandler = (e) => {
    e.preventDefault();
    navigate('/');
  };
  
  return (
    <div>
        <div>Are you sure you want to logout?</div>
        <button onClick={yesHandler}>Yes</button>
        <button onClick={noHandler}>No</button>
    </div>
  )
};

export default LogoutPage;