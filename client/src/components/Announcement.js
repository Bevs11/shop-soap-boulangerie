import styled from "styled-components";

const Container = styled.div`
height: 30px;
background-color: teal;
color: white;
display: flex;
align-items: center;
justify-content: center;
font-size: 14px;
`;

// Component for the header that displays discounts
const Announcement = () => {
  return (
    <Container>Super Deal! Free Shipping on Orders Over 500 Pesos</Container>
  )
};

export default Announcement;