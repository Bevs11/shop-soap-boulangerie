import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


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
const Options = styled.div`
`;
const Title = styled.h1`
margin: 20px;
`;
const Input = styled.input`
flex: 1;
min-width: 50%;
height: 20px;
margin: 10px 10px 0 0;
`;
const Label = styled.label`
height: 20px;
margin: 10px 10px 0 0;
font-family: helvetica;
font-weight: 200;
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

const RemoveProducts = () => {
    const [itemCode, setItemCode] = useState('');
 
    const removeItem = async() => {
        try {
          const response = await axios.post('http://localhost:8010/api/v1/products/removeproduct', { itemCode} );
          if (response) {
              alert('product is removed');
          }
        } catch (error) {
            console.log(error);
          alert('cannot remove product');
        }
      }
    function handleClick(e) {
        e.preventDefault();
        removeItem();
      };
   
  return (
    <div>
        <Title>REMOVE PRODUCTS</Title>
        <form>
            <div>
                <Label>Item Code:</Label>
                <Input 
                    type='text'
                    name='productId'
                    placeholder='item code'
                    onChange={e => setItemCode(e)}
                />
            </div>
            <Button onClick={handleClick}> 
             REMOVE ITEM
            </Button> 
        </form>
        <Button>
            <Link to='/dashboard'>Return to Dashboard</Link>                 
        </Button>
    </div>
  )
};

export default RemoveProducts;