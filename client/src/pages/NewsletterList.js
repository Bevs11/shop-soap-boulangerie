import React, { useEffect, useState } from 'react';
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
const Title = styled.h1`
margin: 20px;
`;
const Wrapper = styled.div`
border: 1px solid black;
width: 50%;
background-color: rgb(211, 211, 211);
height: 500px;
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

const NewsletterList = () => {
  const navigate = useNavigate();
  const [newsletterList, setNewsletterList] = useState([]);
  const token = localStorage.getItem('token');
  const config = {
      headers: {"Authorization": `Bearers ${token}`}
  };
  
  


  const fetchData = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.get('https://shop-soap-boulangerie-api.onrender.com/api/v1/emails', config );
      setNewsletterList(response.data.emailList);
      console.log("newsletterlist:", response);
    } catch (error) {
      console.log ('cannot retrieve list', error)
    }
    console.log("newsletterlist:", newsletterList);
  };

  return (
    <Container>
        <Title>List of Emails for NewsLetter</Title>
        <Button onClick={fetchData}>Get Data? </Button>
        <Wrapper>
            {
              newsletterList.map(list => {
                return <p>{list}</p>
              })
            }
        </Wrapper>
        <a onClick={() => navigate("/dashboard")}>
          <Button>Return to Dashboard</Button>
        </a>
    </Container>
  )
};

export default NewsletterList;