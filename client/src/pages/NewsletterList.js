import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



const Title = styled.h1`
margin: 20px;
`;
const Wrapper = styled.div`
border: 1px solid black;
width: 50%;
background-color: rgb(211, 211, 211);
height: 500px;
margin-left: 25%;
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

const NewsletterList = () => {

  const [newsletterList, setNewsletterList] = useState([]);
  
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
    try {
      const response = await axios.get('https://shop-soap-boulangerie-api.onrender.com/api/v1/emails/addemail' );
      setNewsletterList(response.data.email);
      console.log(newsletterList);
    } catch (error) {
      console.log ('cannot retrieve list')
    }
  };

  return (
    <div>
        <Title>List of Emails for NewsLetter</Title>
        <Wrapper>
            {
              newsletterList.map(list => {
                return <p>{list.email}</p>
              })
            }
        </Wrapper>
        <Button>
            <Link to='/dashboard'>Return to Dashboard</Link>                 
        </Button>
    </div>
  )
};

export default NewsletterList;