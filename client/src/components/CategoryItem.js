import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
flex:1;
margin: 3px;
height: 70vh;
position: relative;
`;
const Image = styled.img`
width:100%;
height:100%;
object-fit:cover;
`;
const Info = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;
const Title = styled.h1`
color: violet;
margin: 20px;
`;
const Button = styled.button`
border: none;
padding: 20px;
border-radius: 5px;
cursor: pointer;
font-weight: bold;

&:hover {
  transform: scale(1.2);
  box-shadow: 2px 2px 5px grey;}
`;

  //Component for Categories
const CategoryItem = ({item}) => {
  const navigate = useNavigate();
  return (
    <Container>
        <Image src={item.img}/>
        <Info>
            <Title>{item.title}</Title>
            <Button onClick={() => navigate("/products")}>
              SHOP NOW
            </Button>
        </Info>
    </Container>
  )
}

export default CategoryItem;