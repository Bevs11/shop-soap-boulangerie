import styled from 'styled-components';
import {popularProducts} from '../data';
import Product from './Product.js';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { ShopContext } from "../context/ShopContextProvider";
import SimpleBackdrop from "./SimpleBackdrop.js";

const Container = styled.div`
padding: 20px;
display: flex;
flex-wrap: wrap
`;

  //Component for the ProductList that displays all available products for sale
const Products = (filters, sort) => { 
  const { soapsData, settingSoapsData, soapFilters, setSoapFilters} = useContext(ShopContext);
  const [soaps, setSoaps] = useState([]);

  const getSoapData = async () => {
    try{
      const response = await axios.get("https://shop-soap-boulangerie-api.onrender.com/api/v1/products/get/active");
      if (response) {
        settingSoapsData(response.data.products);
        if (soaps.length === 0 && !filters){
          console.log("triggered");
          setSoaps(response.data.products);
        }
        
      }
    } catch (error) {
      console.log('cannot retrieve list')
    }
  }

  useEffect(() => {
    getSoapData() 
  }, []);

  useEffect(()=> {
        if(soapsData){
          if (filters){
            let newData;
            if (filters.filters.type){
              const findCategory = (item, filter) => {
                if (filter === "all"){
                  return true
                } else {
                  return item.categories.includes( String(filter)); 
                }
              }
              newData = soapsData.filter((soap) => findCategory(soap, filters.filters.type ));
            }else{
              newData = [...soapsData]
            }
            if (filters.filters.sort === "ascending" || filters.filters.sort === "descending"){
              if (filters.filters.sort === "ascending"){
                newData.sort((a,b) =>{return a.price - b.price})
                console.log("asc");
              }else{
                newData.sort((a,b) =>  {return -a.price + b.price})
                console.log("des");
              }
            }            
            setSoaps(newData);
          } else {
            setSoaps(soapsData);
          } 
        }
          
  }, [filters])
 
  return (
    <Container>
      {soaps ? soaps.map(item=>(
        <Product 
          key={item.productId}
          id={item.productId}
          quantity = {1}
          title={item.title}
          img={item.img}
          desc={item.description}
          price={item.price}
        />
      ))
       : <SimpleBackdrop/>
      }
    </Container>
  )
};

export default Products;