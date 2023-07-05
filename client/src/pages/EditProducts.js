import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

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
const Note = styled.div`
color: red;
font-size: 20px;
`;

const EditProducts = () => {

    const  navigate = useNavigate();
        //navigate to dashboard
    
    function handleClick(e) {
        e.preventDefault();
        alert("Add Item Successful");
    };
    function handleClickRemove(e) {
        e.preventDefault();
        alert("Item Removed");
    };    

       // event handler for all inputs
    function onChange(e) {
        
    };

  return (
    <div>
        <Title>EditProducts</Title>
        <Note>Feature Not Yet Available</Note>
        <form>         
            <div>
                <Label>Name of Product:</Label>
                <Input value={"Insert name or product"}/>
            </div>
            <div>
                <Label>Product Id:</Label>
                <Input value={"Insert name or product"}/>
            </div>
            <div>
                <Label>Image URL:</Label>
                <Input 
                    type='text'
                    name='img'
                    placeholder='image url'
                    onChange={onChange}
                    required/>
            </div>
            <div>
                <Label>Description:</Label>
                <Input 
                    type='text'
                    name='description'
                    placeholder='description'
                    onChange={onChange}
                    required/>
            </div>
            <div>
                <Label>Price of Item:</Label>
                <Input 
                    type='text'
                    name='price'
                    placeholder='price'
                    onChange={onChange}
                    required/>
            </div> 
            
                        
            <Button >Edit Product</Button>  
                    </form>
        <Button>
            <Link to='/dashboard'>Return to Dashboard</Link>                 
        </Button>
    </div>
  )
};

export default EditProducts;