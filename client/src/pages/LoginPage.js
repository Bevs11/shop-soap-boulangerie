import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { ShopContext } from "../context/ShopContextProvider";
import SimpleBackdrop from '../components/SimpleBackdrop';

const Container = styled.div`
width: 100vw;
height: 80vh;
display: flex;
align-items: center;
justify-content: center;
`;
const Wrapper = styled.div`
width: 80%;
display: flex;
flex-direction: column;
align-items: center;
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
const ErrorMessage = styled.div`
color: red;
display: flex;
justify-content: center;
`;

const LoginPage = () => {
    let  navigate = useNavigate(); //navigate to dashboard
    const [error, setError] = useState(false);    

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [loading, setLoading] = useState(false);  
         
    const { userInformation, setIsLoggedIn, setUserInformation, setIsUserAdmin} = useContext(ShopContext);

    const errorMessage = {
        username: "Incorrect Username",
        password: "Incorrect Password"
    }
    
    const loginHandler = async () => {
        try {
            const response = await axios.post( 'https://shop-soap-boulangerie-api.onrender.com/api/v1/user/login', { username, password });
            setLoading(false);
            if( response.status === 200 ){      
                localStorage.setItem('token', response.data.token );
                let newUserInfo = userInformation;    
                newUserInfo.username = response.data.username;
                newUserInfo.userId = response.data.id;              
                setUserInformation(newUserInfo);
                setIsLoggedIn(true); // changes login status to true                
                if (!response.data.isAdmin) {
                    setIsUserAdmin(true);
                    navigate('/dashboard');
                }else {
                    navigate('/'); 
                }               
                alert('You are logged in');    
            } else {
                console.log("invalid username or password");
                setError(true);
            }

        } catch (error){
            console.log("invalid password")
            setError(true);
        }
    }

    function handleClick(e) {
        e.preventDefault();
        setLoading(true);
        loginHandler();
        setPassword(null);
        setUsername(null);
    }

  return (
    <div>
        <Container>
            {loading 
            ? <SimpleBackdrop/>
            : <Wrapper>
                <Title>User Login</Title>
                <form>
                    <div>
                        <Label>Username:</Label>
                        <Input 
                            type='text'
                            name='username'
                            placeholder='username'
                            onChange={ e => setUsername(e.target.value)}
                            required/>
                    </div>
                    <div>
                        <Label>Password:</Label>
                        <Input 
                            type='text'
                            name='password'
                            placeholder='password'
                            onChange={ e => setPassword(e.target.value)}
                            required/>
                    </div>
                    {error && <ErrorMessage>{errorMessage.password}</ErrorMessage>}
                    <Button onClick={handleClick}> 
                        LOGIN
                    </Button>  
                </form>
                <div>Don't have an account yet? 
                    <Link to='/registration'>{" "}REGISTER HERE</Link>
                </div>
              </Wrapper>
            }
        </Container>
    </div>
  )
};

export default LoginPage;