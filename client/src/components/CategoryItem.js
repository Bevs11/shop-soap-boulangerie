import styled from "styled-components";
import { Link } from 'react-router-dom';

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
`;

  //Component for Categories
const CategoryItem = ({item}) => {
  return (
    <Container>
        <Image src={item.img}/>
        <Info>
            <Title>{item.title}</Title>
            <Button>
            <Link to='/products'>SHOP NOW</Link>
            </Button>
        </Info>
    </Container>
  )
}

export default CategoryItem;