import { useReducer, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from "../context/ShopContextProvider";
import axios from "axios";
import SimpleBackdrop from '../components/SimpleBackdrop';

/* Styling*/
const Container = styled.div`
width: 100vw;
height:  80vh;
display: flex;
align-items: center;
justify-content: center;
`;
const Wrapper = styled.div`
width: 40%;
padding: 20px;
`;
const Title = styled.h1`
font-size: 30px;
margin-bottom: 20px; 

`;
const Form = styled.div`
display: flex;
flex-direction: column;
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
width: 100%;
background-color: rgb(230, 230, 230);
padding: 5px;
cursor: pointer;
font-size: 30px;
font-weight: bold;
border-radius: 5px;
margin-top: 20px;
margin-bottom: 20px;


&:hover{
    background-color: pink;
}
`;
const ErrorMessage = styled.small`
margin-top: 20px;
font-weight: bold;
color: red;
`;
/*Styling End*/

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  contact: '',
  address: ''
};


function reducer(state, action) {

  return {...state, [action.input] : action.value};
};

// Component for the CheckoutPage that includes the for to be filled out 
const Checkout = () => {
  let  navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initialState);
  const regexLetters = /[A-Za-z]/;

    // input validation
  const {setUserInformation, userInformation, cartItems, isLoggedIn, total, setCartItems} = useContext(ShopContext);
  const [errorMessage, setErrorMessage] = useState('Please fill out all fields');
  const [name, setName] = useState(null); // name in UI
  const [loading, setLoading] = useState(false); //loading

  const token = localStorage.getItem('token');
  const config = {
    headers: {"Authorization": `Bearers ${token}`}
    };
  
  const getUserData = async() => {
    try {
      // TODO: change url
      const response = await axios.get(`https://shop-soap-boulangerie-api.onrender.com/api/v1/user/getuser/${userInformation.username}`, config );
      if (response.status === 200) {
        // save user data in userInformation
        setUserInformation(response.data.user);
        // TODO: remove this block of code
        // console.log('checkout user', response.data.user);
        // console.log('total', total);
      }
    }catch (error) {
      console.log('Getting User data Unsuccessful', error);
    }
  };

  useEffect(()=> {
    if (isLoggedIn){
      getUserData();
    }
  }, []);

  // set name in UI
  useEffect(()=>{
    setName(`${userInformation.firstname} ${userInformation.lastname}`);
  },[userInformation])

  useEffect(()=> {
    isValid(state);
  }, [state]);
  
    //Used to check validity of Form inputs
  function isValid(userInput) {
    if(userInput.contact !== '' && userInput.address !== '') {
      if( !regexLetters.test(userInput.contact)){
        setErrorMessage('');
        return true;
      } else {
        setErrorMessage('Please provide valid address and contact number.');
        return false;
      }
    }else {
      setErrorMessage('Please fill out all fields');
      return false;
    }
  };

  
  let newCartInfo = [];
  cartItems.map(item => {
      newCartInfo = [...newCartInfo, {productId : item.productId, quantity : item.quantity}]
  })
 

const sendOrder = async (e) => {
    e.preventDefault();

    let orderDetails = {
      userId: '',
      items: [],
      amount: 0,
      address: '',
      contact: '',
    };
    orderDetails.userId = userInformation.userId;
    orderDetails.items = newCartInfo;
    orderDetails.amount = total;
    orderDetails.address = state.address;
    orderDetails.contact = state.contact;

    console.log('order details', orderDetails);
  
    try{
      const response = await axios.post('https://shop-soap-boulangerie-api.onrender.com/api/v1/orders/neworder', orderDetails );
      if (response.status === 201){
        console.log("order details", response.data)
        alert('order successful');
        navigate('/ordersuccessful');
        setCartItems([]);
      } 
    }catch(error){
      console.log('order was not sent');
    }
  }
 

    // Function to navigate page to OrderSuccessful page
  function handleClick(e) {
    
    if (isValid(state)){
      setUserInformation(state);
      
    }
  };

    // event handler for all inputs
  function onChange(e) {
    const action = {
      input: e.target.name,
      value: e.target.value
    }
    dispatch(action);
  };

  return (
    <Container>
    <Wrapper>
        <Title>ORDER FORM</Title>
        {
          !isLoggedIn && <p>Please register/login first before ordering</p>
        }        
        <Form>
            <Label>Name:</Label> 
            {userInformation 
            ? <div>{name}</div>
            : <div>not working</div>}
            
            <Label>Contact Number:</Label>
            <Input 
              type='text'
              name='contact'
              placeholder='contact number'
              onChange={onChange}
              required/>
            <Label>Home Address:</Label>
            <Input 
              type='text'
              name='address'
              placeholder='address'
              onChange={onChange}
              required/>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <Button onClick={sendOrder}>Order</Button>
            <div>Don't have an account yet? 
                    <Link to='/registration'>REGISTER HERE</Link>
            </div>            
        </Form>
    </Wrapper>
</Container>
  )
};

export default Checkout;