import styled from "styled-components";
import Checkout from "../components/Checkout";
import ShoppingBag from "../components/ShoppingBag";
import OrderSummary from "../components/OrderSummary";
import { ShopContext } from "../context/ShopContextProvider";
import { useContext, useState } from "react";

const Container = styled.div``;
const Wrapper = styled.div``;
const Title = styled.div`
font-size: 40px;
font-weight: bold;
margin: 30px 30px;
`;

const CheckoutPage = () => {
  const {cartItems, setCartItems} = useContext(ShopContext);

//   const cart = [{
//     productId: "a002",
//     img: "https://www.ccbeesnaturalproducts.ca/uploads/6/9/3/7/69373191/s973785511478968515_p94_i2_w1440.jpeg",
//     quantity: 3,
//     title: "Oatmeal and Honey Soap",
//     description: "This gentle exfoliating soap is perfect for sensitive skin. The oatmeal helps to remove dead skin cells while the honey moisturizes and hydrates.",
//     price: 49 
// }]

  return (
    <Container>
        <Wrapper>
          <Title>CART</Title>

          <div>
            {
              cartItems.map(product => {                
                return <ShoppingBag 
                  key={product.productId}
                  title={product.title}
                  img={product.img}
                  price={product.price}
                  itemId={product.productId}
                  quantity={product.quantity}
                />                       
              })
            
            }
          </div>

          <OrderSummary/>

        </Wrapper>        
        <Checkout/>
    </Container>
  )
};

export default CheckoutPage;