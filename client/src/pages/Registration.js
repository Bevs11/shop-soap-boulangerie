import { useReducer, useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";




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
const ErrorMessage = styled.small`
margin-top: 20px;
font-weight: bold;
color: red;

`;
const InputRadio = styled.input`
margin: 10px;
`;
const Button = styled.button`
width: 95%;
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


const Registration = () => {
   
    const initialState = {
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        email: '',
        isAdmin: false
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
    function handleClick(e) {
        e.preventDefault();
        console.log(state);
        if (isValid(state)){
            console.log('is valid');
            axios.post('http://localhost:8010/api/v1/user/register', state).then(response => {
            if (response.status === 201) {
                alert("Registration Successful. Go to dashboard?");
                navigate('/dashboard');
            } else {
                alert("registration not successful")
            }
        })
        }        
    };
 
    const regexNumber = /\d/;
    const regexLetters = /[A-Za-z]/;
    const regexSpecialCharacter = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
    const [errorMessage, setErrorMessage] = useState('Please fill out all fields');

    let  navigate = useNavigate();
        //navigate to dashboard
    function isValid(userInput) {
        if (userInput.firstname !== '' && userInput.lastname !== '' && userInput.email !== '') {
            if (!regexNumber.test(userInput.firstname) && !regexNumber.test(userInput.firstname) && userInput.firstname.length > 3 && userInput.lastname.length > 3 && !regexSpecialCharacter.test(userInput.firstname) && !regexSpecialCharacter.test(userInput.lasttname)){
                setErrorMessage('');
                return true;
            } else {
                setErrorMessage('Please provide valid first name and last name. First name and Last name must not have any numbers or special characters. ');
            return false;
            }
            } else {
            setErrorMessage('Please fill out all fields');
            return false;
        }
    };    

    useEffect(()=> {
        isValid(state); 
    }, [state]);
    

  return (
    <div>
        <Container>
            <Wrapper>
                <Title>User Registration</Title>
                <form>
                    <div>
                        <Label>Username:</Label>
                        <Input 
                            type='text'
                            name='username'
                            placeholder='username'
                            onChange={onChange}
                            required/>
                    </div>
                    <div>
                        <Label>Password:</Label>
                        <Input 
                            type='text'
                            name='password'
                            placeholder='password'
                            onChange={onChange}
                            required/>
                    </div>
                    <div>
                        <Label>Firstname:</Label>
                        <Input 
                            type='text'
                            name='firstname'
                            placeholder='firstname'
                            onChange={onChange}
                            required/>
                    </div>
                    <div>
                        <Label>Lastname:</Label>
                        <Input 
                            type='text'
                            name='lastname'
                            placeholder='lastname'
                            onChange={onChange}
                            required/>
                    </div>
                    <div>
                        <Label>Email:</Label>
                        <Input 
                            type='email'
                            name='email'
                            placeholder='email'
                            onChange={onChange}
                            required/>
                    </div>
                    
                    <div>
                        <InputRadio 
                                type='checkbox'
                                name='isAdmin'
                                onChange={e => isChecked(e)}
                                required/>
                        <Label>admin</Label>
                    </div>
                    
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                    <Button onClick={handleClick}> 
                        REGISTER
                    </Button>  
                </form>
                <div>Already have an account? 
                    <Link to='/login'>LOGIN HERE</Link>
                </div>
            </Wrapper>
        </Container>
    </div>
  )
};

export default Registration;