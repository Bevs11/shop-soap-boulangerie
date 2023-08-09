import React from 'react';
import styled from 'styled-components';
import { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContextProvider";
import { popularProducts } from '../data';

const Container = styled.div`
margin-left: 10px;
`;
const Summary = styled.div`
flex: 1;
border: 1px solid lightgrey;
border-radius: 10px;
padding: 20px;
margin-top: 20px;
`;
const SummaryTitle = styled.h1``;
const SummaryItem = styled.div`
margin: 20px 0;
font-weight: ${props => props.type === 'total' && 'bold'}; 
font-size: ${props => props.type === 'total' && '24px'};
`;
const SummaryItemText = styled.span`
margin-right: 10px;
`;
const SummaryItemPrice = styled.span``;

const OrderSummary = () => {
    const [subTotal, setSubTotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);

    const {cartItems, setTotal, total} = useContext(ShopContext);
    
    // totalCost is the sum of all items added in the cart
    const computeSubTotal = () => {
        if (cartItems.length != 0){
            let cartSubTotal = 0;
            cartItems.map(item => {
                cartSubTotal = cartSubTotal + (item.quantity * item.price)
            })
            setSubTotal(cartSubTotal);
        } 
    };
    
    function isEmpty() {
        if(cartItems.length !== 0) {
            if(subTotal >= 500){
                setDiscount(30);
                setShipping(0);
            }else{
                setDiscount(30);
                setShipping(60);
            }
            
            
        } else {
            setDiscount(0);
            setShipping(0);
        }
    };

    useEffect(()=> {
        isEmpty();
        computeSubTotal();
        setGrandTotal(subTotal + shipping - discount);
        setTotal(grandTotal);
    }, [cartItems, discount, shipping]);
    

  return (
    <Container>
       <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Sub Total</SummaryItemText>
                        <SummaryItemPrice>P {subTotal}.00</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Estimated Shipping</SummaryItemText>
                        <SummaryItemPrice>P {shipping}.00</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Discount</SummaryItemText>
                        <SummaryItemPrice>P {discount}.00</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem type='total'>
                        <SummaryItemText>Total</SummaryItemText>
                        <SummaryItemPrice>P {grandTotal}.00</SummaryItemPrice>
                    </SummaryItem>               
                </Summary> 
    </Container>
  )
};

export default OrderSummary;