import React, { useState, useReducer } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 20px 0; 
`;
const Title = styled.h1`
margin: 20px;
`;
const Input = styled.input`
flex: 1;
width: 500px;
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
const Note = styled.div`
color: red;
font-size: 20px;
`;
const InputCheckbox = styled.input`
margin: 10px;
`;

const initialState = {
    title: '',
    img: '',
    description: '',
    price: 0,
    productId: '',
    isActive: false
};


const EditProducts = () => {

    const  navigate = useNavigate(); //navigate to dashboard
    const [state, dispatch] = useReducer(reducer, initialState);
    const [body, setBody] = useState({});
    
   
    const handleClickEdit = async (e) => {
        e.preventDefault();
        try{
            const response = axios.put(`https://shop-soap-boulangerie-api.onrender.com/api/v1/products/editproduct/a001`, body);
            console.log(response);
        }catch(err){
            console.log(err);

        }
        alert("Item Removed");
    };    

    function reducer(state, action) {
        return {...state, [action.input] : action.value};
    };
       // event handler for all inputs
    function onChange(e) {
        const action = {
            input: e.target.name,
            value: e.target.value
        }

        dispatch(action);
    };
    function isChecked(e){
        const action = {
            input: e.target.name,
            value: e.target.checked
        }
        dispatch(action);
    };

  return (
    <Container>
        <Title>Edit Products</Title>
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
            <div style={{marginTop: "10px"}}>
                <Label >Categories</Label>
            </div>
            <div>
                <InputCheckbox 
                    type='checkbox'
                    name='categories'
                    value= "body soap"
                    onChange={e => isChecked(e)}
                    required/>
                <Label>Body Soap</Label>
            </div>
            <div>
                <InputCheckbox 
                    type='checkbox'
                    name='categories'
                    value= "fragrant soap"
                    onChange={e => isChecked(e)}
                    required/>
                <Label>Fragrant Soap</Label>
            </div>
            <div>
                <InputCheckbox 
                    type='checkbox'
                    name='categories'
                    value= "facial soap"
                    onChange={e => isChecked(e)}
                    required/>
                <Label>Facial Soap</Label>
            </div>
            <div  style={{display:"flex", justifyContent:"center"}}>
              <Button>Edit Product</Button>    
            </div>                        
              
        </form>
        <a onClick={() => navigate("/dashboard")}>
          <Button>Return to Dashboard</Button>
        </a>
    </Container>
  )
};

export default EditProducts;