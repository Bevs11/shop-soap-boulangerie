import React, {useContext} from 'react'
import { ShopContext } from "../context/ShopContextProvider";
import styled from 'styled-components';

const Title = styled.div`
margin-left: 20px;
margin-top: 20px;
font-size: 25px;
font-family: arial;
font-weight: bold;
`;

const Greetings = () => {
    const {userInformation, isLoggedIn} = useContext(ShopContext);
  return (
    <div>
        {isLoggedIn
        && <Title>Hello, {userInformation?.username}</Title>
        }
    </div>
    
  )
}

export default Greetings