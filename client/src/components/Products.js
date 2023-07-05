import styled from 'styled-components';
import {popularProducts} from '../data';
import Product from './Product.js';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { ShopContext } from "../context/ShopContextProvider";

const Container = styled.div`
padding: 20px;
display: flex;
flex-wrap: wrap
`;

  //Component for the ProductList that displays all available products for sale
const Products = () => { 
  const { soapsData, settingSoapsData} = useContext(ShopContext);

  const getSoapData = async () => {
    try{
      const response = await axios.get("http://localhost:8010/api/v1/products/");
      if (response) {
        settingSoapsData(response.data.product)
      }
    } catch (error) {
      console.log('cannot retrieve list')
    }

  }
  useEffect(() => {
    getSoapData();
  }, []);
 
  return (
    <Container>
      {soapsData.map(item=>(
      <Product 
      id={item.productId}
      quantity = {1}
      title={item.title}
      img={item.img}
      desc={item.description}
      price={item.price}
       />
      ))}
    </Container>
  )
};

export default Products;