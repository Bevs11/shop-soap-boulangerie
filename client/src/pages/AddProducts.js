import React, { useReducer, useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";


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
const InputCheckbox = styled.input`
margin: 10px;
`;

const AddProducts = () => {

    
    const  navigate = useNavigate();
        //navigate to dashboard

    function handleClickRemove(e) {
        e.preventDefault();
        alert("Item Removed"); 
    };

    const initialState = {
        title: '',
        img: '',
        description: '',
        price: 0,
        productId: '',
        isActive: false
    };

    const [state, dispatch] = useReducer(reducer, initialState);
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
    function reducer(state, action) {
        console.log(action);
        return {...state, [action.input] : action.value};
    };
    const sendData = async() => {
        try {
          const response = await axios.post('http://localhost:8010/api/v1/products/addproduct', state );
          alert('product is added')
        } catch (error) {
          alert('cannot send product')
        }
      };
    function handleClick(e) {
        e.preventDefault();
        console.log(state);
        sendData();
    };

  return (
    <div>
        <Container>
            <Title>ADMIN DASHBOARD</Title>
            <Wrapper>
                    <form>
                        <h1>Add an item</h1>
                            <div>
                                <Label>Name of Item:</Label>
                                <Input 
                                    type='text'
                                    name='title'
                                    placeholder='title'
                                    onChange={onChange}
                                    required/>
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
                            <div>
                                <Label>Item Code:</Label>
                                <Input 
                                    type='text'
                                    name='productId'
                                    placeholder='item code'
                                    onChange={onChange}
                                    required/>
                            </div>
                            <div>
                        <InputCheckbox 
                                type='checkbox'
                                name='isActive'
                                onChange={e => isChecked(e)}
                                required/>
                        <Label>active</Label>
                    </div>
                    
                        
                        <Button onClick={handleClick}> 
                          ADD PRODUCT
                        </Button>  
                    </form>
                    <Button>
                        <Link to='/dashboard'>Return to Dashboard</Link>                 
                    </Button>
                <div>Logout:
                    <Link to='/login'>CLICK HERE</Link>
                </div>
            </Wrapper>
        </Container>
    </div>
  )
};

export default AddProducts;