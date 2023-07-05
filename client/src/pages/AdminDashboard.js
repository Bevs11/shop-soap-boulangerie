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
`;
const Title = styled.h1`
margin: 20px;
`;
const Button = styled.button`
width: 95%;
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

const DashboardMenu = () => {
  const { userInformation} = useContext(ShopContext);

  return (
    <div>
        <Container>
            <Title>ADMIN DASHBOARD</Title>
            <p>{`Hello, ${userInformation.username} `}</p>
            <Wrapper>
                <Button>
                  <Link to='/addproducts'>Add Products</Link>
                </Button>
                <Button>
                  <Link to='/removeproducts'>Remove Products</Link>                 
                </Button>
                <Button>
                  <Link to='/editproducts'>Edit Products</Link>
                </Button>
                <Button>
                  <Link to='/newsletterlist'>Get list of emails for NewsLetter</Link>
                </Button>
                <Button>
                  <Link to='/orderslist'>Get list of Orders</Link>                 
                </Button>
            </Wrapper>
        </Container>
    </div>
  )
};

export default DashboardMenu;
