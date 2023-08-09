import styled from "styled-components";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from "../context/ShopContextProvider";
import { popularProducts } from "../data"; // TODO: be replaced by API URI



/*Styling */
const Container = styled.div``;
const Wapper = styled.div`
padding: 50px;
display: flex;
`;
const ImgContainer = styled.div`
flex:1;
`;
const Image = styled.img`
width:100%;
height: 90vh;
object-fit: cover;
`;
const InfoContainer = styled.div`
flex: 1;
padding: 0 50px;
`;
const Title = styled.h1``;
const Desc = styled.p`
margin: 20px 0;
`;
const Price = styled.span`
font-size: 40px;
`;
const AddContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 50%;
margin: 20px 0;
`;
const AmountContainer = styled.div`
display: flex;
align-items: center;
font-weight: bold;
`;
const Amount = styled.span`
width:30px;
height: 30px;
border-radius: 10px;
border: 1px solid teal;
display: flex;
align-items: center;
justify-content: center;
margin: 0 5px;
`;
const Button = styled.button`
padding: 15px;
border-radius: 10px;
font-weight: bold;
cursor: pointer;

&:hover{
    background-color: pink;
}
`;
/*End of Styling */

const ProductPage = () => {
    let  navigate = useNavigate();
    
    const { viewingId, cartItems, soapsData, setCartItems} = useContext(ShopContext);

    const [soapQuantity, setSoapQuantity] = useState(1);

    let soapIndex;
    const findIndex = () => {
        for (let i = 0; i < soapsData.length ; i++) {
          if(soapsData[i].productId === viewingId){
            soapIndex = i;          
          }
        } 
    };
    findIndex();
   
    let newSoapObject = {};
    const createNewSoapData = (index, quantity) => {
        newSoapObject = {
            productId: soapsData[index].productId,
            quantity: quantity,
            title: soapsData[index].title,
            img: soapsData[index].img,
            description: soapsData[index].description,
            price: soapsData[index].price
        };

    }
    
    const goToCart = (e) => {
        e.preventDefault();
        console.log('new soap object product page', newSoapObject);
        
        if(cartItems.find(item => item.productId === viewingId)){
            console.log("viewing in cart");
            let index = cartItems.findIndex(item => item.productId === viewingId);
            let newQuantity = cartItems[index].quantity += soapQuantity;
            createNewSoapData(index, newQuantity);
            console.log("newsoap object", newSoapObject); // correct
            let newCart = cartItems.splice(index, 1);
            console.log("new cart", newCart);
            //console.log("new cart", newCart.push(newSoapObject));

            setCartItems(newCart);
    
        } else {
            
            createNewSoapData(soapIndex, soapQuantity)
            setCartItems(cartItems => [...cartItems, newSoapObject]);
        }


        navigate('/cart');
    };
    

    return (
        <>   
            <Container>
                <Wapper>
                    <ImgContainer>
                        <Image src={soapsData[soapIndex].img}/>
                    </ImgContainer>
                    <InfoContainer>
                        <Title>{soapsData[soapIndex].title}</Title>
                        <Desc>{soapsData[soapIndex].description}</Desc>
                        <Price>P {soapsData[soapIndex].price}.00 / pc</Price>
                        <AddContainer>
                            <AmountContainer>
                                <button onClick={() => setSoapQuantity(soapQuantity - 1)}>
                                    <RemoveIcon/>
                                </button>
                                <Amount>{soapQuantity}</Amount>
                                <button onClick={() => setSoapQuantity(soapQuantity + 1)}>
                                    <AddIcon />
                                </button>
                            </AmountContainer>
                            <Button onClick={goToCart}> Add to Cart
                            </Button>
                        </AddContainer>
                    </InfoContainer>
                </Wapper>
            </Container>  
    </>
    )
};

export default ProductPage;