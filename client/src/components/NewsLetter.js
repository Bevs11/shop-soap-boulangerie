import { Send } from '@mui/icons-material';
import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';

const Container = styled.div`
height: 60vh;
background-color: #fcf5f5;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`;
const Title = styled.h1`
font-size: 70px;
margin: 20px;
`;
const Desc = styled.div`
font-size: 24px;
margin-bottom: 20px;
`;
const InputContainer = styled.div`
width: 50%;
height: 40px;
background-color: white;
display: flex;
justify-content: space-between;
border: 1px solid lightgrey;
`;
const Input = styled.input`
border: none;
flex: 8;
padding-left: 20px;
`;
const Button = styled.button`
flex:1;
border: none;
background-color: pink;

&:hover{
  transform: scale(1.2);
}
`;

  //Component that Opt in customers who want to receive newsletters
const NewsLetter = () => {

  const [email, setEmail] = useState('');
  const onClickHandler = (e) => {
    e.preventDefault();
    if (email !== ''){
      axios.post('http://localhost:8010/api/v1/emails/addemail', {email}).then(response => {
        if (response.status === 201) {
          alert('Email submitted. Thank you for subscribing to our newsletter.');
          setEmail('');
        }
      }
      )
    } else {
      alert('please type your email');
    }
  }

  return (
    <Container>
        <Title>NewsLetter</Title>
        <Desc>Get timely updates from your favorite products.</Desc>
        <InputContainer>
          
          <Input  
            type = 'text'
            value = { email }
            placeholder='Your email'
            onChange = {e => setEmail(e.target.value)}
            />
            <Button onClick={onClickHandler}>
                <Send/>
            </Button>
       
        </InputContainer>
    </Container>
  )
};

export default NewsLetter;