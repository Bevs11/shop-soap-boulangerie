import styled from "styled-components";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContextProvider";
import { Link, useNavigate } from 'react-router-dom';

const Info = styled.div`
opacity:0;
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
background-color: rgba(0,0,0,0.2);
z-index: 3;
display: flex;
align-items: center;
justify-content: center;
transition: all 0.5s ease;
cursor: pointer;
`;
const Container = styled.div`
flex:1;
margin: 5px;
min-with: 280px;
height: 350px;
display: flex;
align-items: center;
justify-content:center;
background-color: #f5fbfd;
position: relative;
flex-direction: column;

&:hover ${Info} {
  opacity:1;
}
`;
const Circle = styled.div`
width: 200px;
height: 200px;
border-radius: 50%;
background-color: white;
position: absolute;
`;
const Image = styled.img`
height: 75%;
z-index: 2;
`;
const Button = styled.button`
width: 40px;
height: 40px;
border-radius: 50%;
background-color: white;
display: flex;
align-items: center;
justify-content: center;
margin: 10px;
transition: all 0.5s ease;

&:hover{
  background-color: #e9f5f5;
  transform: scale(1.1);
}
`;
const Title = styled.h3`
margin-bottom: 10px;
`;

  //Component that styles a product
const Product = (props) => {

  const  navigate = useNavigate();
  const { settingId, addingToCart, setCartItems, cartItems, setViewingId} = useContext(ShopContext);





  const handleAddToCart = (e) => {
    e.preventDefault();
    let newSoapObject = {
      productId: props.id,
      quantity: 1,
      title: props.title,
      img: props.img,
      description: props.desc,
      price: props.price
    }
    if(cartItems.find((item) => item.productId === props.id)){
      console.log("id is", props.id);
      let index = cartItems.findIndex((item) => item.productId === props.id);
      let newCart = [...cartItems];
      newCart[index].quantity += 1;
      setCartItems(newCart);
    } else {
      setCartItems(cartItems => [...cartItems, newSoapObject]);
    }
  }

  const viewId = (e) => {
    e.preventDefault();
    setViewingId(props.id);
    navigate('/products/productpage');
  };

  return (
    <Container>
      <Circle />
      <Title>{props.title}</Title>
      <Image src={props.img}/>
      <Info>
        <Button onClick={handleAddToCart}>
          <ShoppingCartIcon/>                 
        </Button>
        <Button onClick={viewId}>
          <SearchIcon/>
        </Button>
      </Info>
    </Container>
  )
};

export default Product;