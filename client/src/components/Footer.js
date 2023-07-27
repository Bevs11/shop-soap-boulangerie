import { Facebook, Instagram, Twitter, Home, Phone, Email } from "@mui/icons-material";
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';


const Logo = styled.h1``;
const Desc = styled.p`
margin: 20px 0;
`;
const SocialContainer = styled.div`
display: flex; 
`;
const SocialIcon = styled.h1`
width: 40px;
height: 40px;
border-radius: 50%;
color: white;
background-color: #${props=> props.color};
display: flex;
align-items: center;
justify-content: center;
margin-right: 20px;
`;
const Container = styled.div`
display: flex;
`;
const Left = styled.div`
flex:2;
display: flex;
flex-direction: column;
padding: 20px;
`;
const Center = styled.div`
flex:1;
padding: 20px;
`;
const Title = styled.h3`
margin-bottom: 20px;
`;
const List = styled.ul`
margin:0;
padding:0;
list-style:none;
`;
const ListItem = styled.li`
margin-bottom: 10px;
`;
const Links = styled.button`
all: unset;
cursor: pointer;

&:hover {
    transform: scale(1.2);}
`;
const Right = styled.div`
flex:1;
padding: 20px;
`;
const ContactItem = styled.div`
display: flex;
align-items: center;
margin-bottom: 5px;
`;
const Payment = styled.img`
margin-top: 10px;
height: 20px;
`;

    //Contains all footer items
const Footer = () => {
    const navigate = useNavigate();
  return (
    <Container>
<Left>
    <Logo>SOAP BOULANGERIE.</Logo>
    <Desc>Pure Organic Handcrafted Soaps </Desc>
    <SocialContainer>
        <SocialIcon color='3B5999'>
            <Facebook/>
        </SocialIcon>
        <SocialIcon color='E4405F'>
            <Instagram/>
        </SocialIcon>
        <SocialIcon color='E60023'>
            <Twitter/>
        </SocialIcon>
    </SocialContainer>
</Left>
<Center>
    <Title>
        Useful Links
    </Title>
    <List>
        <ListItem>
            <Links onClick={() => navigate("/")}>Home</Links>
        </ListItem>
        <ListItem>
            <Links onClick={() => navigate("/products")}>Assorted Soaps</Links>
        </ListItem>
        <ListItem>
            <Links onClick={() => navigate("/products")}>Fragrant Soaps</Links>
        </ListItem>
        <ListItem>
            <Links onClick={() => navigate("/products")}>Facial Soaps</Links>
        </ListItem>
    </List>
</Center>
<Right>
    <Title>Contact</Title>
    <ContactItem><Home style={{marginRight: '10px'}}/>Morong, Rizal</ContactItem>
    <ContactItem><Phone style={{marginRight: '10px'}}/>09XX-XXX-XXXX</ContactItem>
    <ContactItem><Email style={{marginRight: '10px'}}/>soapboulangerie@gmail.com</ContactItem>
    <Payment src='https://mindanaotimes.com.ph/wp-content/uploads/2021/05/GCash-Logo-Transparent-PNG-1.png'/>
</Right>
    </Container>
  )
};

export default Footer;