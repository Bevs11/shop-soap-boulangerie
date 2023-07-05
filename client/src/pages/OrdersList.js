import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Lists from '../components/Lists';

const Title = styled.h1`
margin: 20px;
`;
const Button = styled.button`
width: 50%;
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
const Wrapper = styled.div`
border: 1px solid black;
width: 50%;
background-color: rgb(211, 211, 211);
height: 500px;
margin-left: 25%;
`;
const Info = styled.div`
border: 1px solid black;
width: 80%;
background-color: gray;
height: 80%;
margin-left: 10%;
margin-top: 10%;
`;
const SearchButton = styled.button`
width: 20%;
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
const Form = styled.div`
width: 80%;
margin-left: 10%;
`;

const OrdersList = () => {
  const [id, setId] = useState('');
  const [orderList, setOrderList] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
    try {
      const response = await axios.get('http://localhost:8010/api/v1/orders/pending' );
      setOrderList(response.data.order);
      console.log(response.data.order);
    } catch (error) {
      console.log ('cannot retrieve order list')
    }
  };
  
  const searchData = async() => {
    try {
      const response = await axios.get(`http://localhost:8010/api/v1/orders/ordernumber/${id}` );
      setOrderDetails(response.data.order);
      console.log(response.data.order);
    } catch (error) {
      console.log ('cannot retrieve order list')
    }
  };

  return (
    <div>
        <Title>List of Pending Orders</Title>
        <Wrapper>
            {
                orderList.map(orders => {
                return <p>{orders._id}</p>

                })
            }
        </Wrapper>

        <Form>
            <Title>Details</Title>
            <Label>Order Id:</Label>
            <Input 
                type='text'
                name='orderId'
                placeholder='orderId'
                onChange={e => setId(e.target.value)}
                required/>
            <SearchButton onClick={searchData}>Search</SearchButton>
            <Wrapper>
            {
                <Lists userId={orderDetails.userId} amount={orderDetails.amount} address={orderDetails.address} contact={orderDetails.contact} status={orderDetails.status} />
            }
            </Wrapper>       
        </Form>
        <Button>
            <Link to='/dashboard'>Return to Dashboard</Link>                 
        </Button>
    </div>
  )
};

export default OrdersList;