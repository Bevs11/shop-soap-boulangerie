import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from "../context/ShopContextProvider";

const Container = styled.div`
width: 100vw;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 20px 0; 
`;
const Wrapper = styled.div`
width: 80%;
display: flex;
flex-direction: column;
justify-content: center;
`;
const Title = styled.h1`
margin: 20px;
`;
const Button = styled.button`
width: 500px;
background-color: rgb(230, 230, 230);
padding: 5px;
cursor: pointer;
font-size: 20px;
font-weight: bold;
border-radius: 5px;
margin-top: 20px;
margin-bottom: 20px;


&:hover{
    background-color: pink;
}
`;
const ButtonContainer = styled.a`
display: flex;
justify-content: center;
`;

const DashboardMenu = () => {
  const navigate = useNavigate();

  return (
    
        <Container>
            <Title>ADMIN DASHBOARD</Title>
            <Wrapper>
                <ButtonContainer onClick={() => navigate("/addproducts")}>
                  <Button>Add Products</Button>
                </ButtonContainer>
                <ButtonContainer onClick={() => navigate("/removeproducts")}>
                  <Button>Remove Products</Button>
                </ButtonContainer>
                <ButtonContainer onClick={() => navigate("/editproducts")}>
                  <Button>Edit Products</Button>
                </ButtonContainer>
                <ButtonContainer onClick={() => navigate("/newsletterlist")}>
                  <Button>Get list of emails for NewsLetter</Button>
                </ButtonContainer>
                <ButtonContainer onClick={() => navigate("/orderslist")}>
                  <Button>Get list of Orders</Button>
                </ButtonContainer>
                
            </Wrapper>
        </Container>
   
  )
};

export default DashboardMenu;
