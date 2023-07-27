import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import image from '../assets/pink-soap.png';
import { ShopContext } from "../context/ShopContextProvider";


const Container = styled.div`
    margin-bottom: 0;
    background-color: rgb(250,230,230);
`;
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
`;
const Left = styled.div`
flex: 1;
`;
const Center = styled.div`
font-weight: bold;
font-size: 30px;
flex: 1;
text-align: center;
`;
const Right = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
padding-right: 25px; 
flex: 1;
`;
const NavigationItem = styled.button`
all: unset;
cursor: pointer;
font-size: 14px;
margin-left: 25px
`;
const LogoContainer = styled.div`
width: 60px;
height: 100%;
border-radius 50%;
background-color: yellow;
display: flex;
justify-content: center;
align-items: center;
`;
const Logo = styled.img`
width: 90%;
height: 90%;
`;

    //Component for header containing name, logo and links
const NavBar = () => {
    const { userInformation, isLoggedIn, setIsLoggedIn, setUserInformation, isUserAdmin, setIsUserAdmin} = useContext(ShopContext);
    const navigate = useNavigate();

  return (
    <Container>
        <Wrapper>
            <Left>
                <LogoContainer>
                    <Logo src={image}/>
                </LogoContainer>
            </Left>
            <Center>SOAP BOULANGERIE</Center>
            <Right>
                <NavigationItem onClick={() => navigate("/")}>
                    Home
                </NavigationItem>
                <NavigationItem onClick={() => navigate("/products")}>Products
                </NavigationItem>                                    
                {!isLoggedIn && <NavigationItem onClick={() => navigate("/login")}>Login</NavigationItem>}
                {isUserAdmin && <NavigationItem onClick={() => navigate("/dashboard")}></NavigationItem>}                                     
                <NavigationItem onClick={() => navigate("/cart")}>
                    Cart/Checkout
                </NavigationItem>              
                {isLoggedIn && <NavigationItem onClick={() => navigate("/logout")}>Logout</NavigationItem>}                                
            </Right>
        </Wrapper>
    </Container>
  )
};

export default NavBar;