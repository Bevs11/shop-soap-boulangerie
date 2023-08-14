import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from "../context/ShopContextProvider";
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
margin: 20px;
`;



const LogoutPage = () => {
  const { setIsLoggedIn, setIsUserAdmin} = useContext(ShopContext);
  const  navigate = useNavigate();

  console.log("logout page");

  const yesHandler = (e) => {
    setIsLoggedIn(false);
    setIsUserAdmin(false);
    localStorage.removeItem ('token');
    navigate('/');
    window.location.reload(true);        
  };

  const noHandler = (e) => {
    e.preventDefault();
    navigate('/');
  };
  
  return (
    <Container>
        <div>Are you sure you want to logout?</div>
        <button onClick={yesHandler} style={{margin: "10px 5px 0 0"}}>Yes</button>
        <button onClick={noHandler}>No</button>
    </Container>
  )
};

export default LogoutPage;