import styled from "styled-components";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContextProvider";

/*Styling */
const Container = styled.div``;
const Info = styled.div``;
const Product = styled.div`
display: flex;
`;
const ProductDetail = styled.div`
flex: 2;
display: flex;
padding-left: 30px;
`;
const PriceDetail = styled.div`
flex: 1;
display: flex;
align-items: center;
flex-direction: column;
`;
const Image = styled.img`
width: 200px;
`;
const Details = styled.div`
padding: 20px;
display: flex;
flex-direction: column;
justify-content: space-around;
`;
const ProductName = styled.div``;
const ProductId = styled.div``;
const ProductAmountContainer = styled.div`
display: flex;
align-items:center;
margin-bottom: 20px;
`;
const ProductAmount = styled.div`
font-size: 30px;
margin: 5px 10px;
`;
const ProductPrice = styled.div`
font-size: 30px;

`;
const Hr = styled.hr`
margin: 20px 0;
`;
/*End of Styling */

    //Component that displays all items inside the cart
const ShoppingBag = (props) => {
    const { cartItems, setCartItems } = useContext(ShopContext);
    const [partialTotal, setPartialTotal] = useState();
    const [quantity, setQuantity] = useState(null);



    // funciton for delete button
    const removeFromCart = (id) => {
        let index = cartItems.findIndex((item) => item.productId === id);
        let newCart = [...cartItems];
        newCart.splice(index, 1)
        setCartItems(newCart);
    }

    // function to add to cart
    const editItemQuantity = (operator, id) => {
        let index = cartItems.findIndex((item) => item.productId === id);
        let newCart = [...cartItems];
        if(operator === "add"){
            if (newCart[index].quantity < 20) {
            newCart[index].quantity += 1;
            }
        } else {
            newCart[index].quantity -= 1;
        }
        if(newCart[index].quantity <= 0){
            newCart.splice(index, 1);
        } 

        
        setCartItems(newCart);
    }

    useEffect(() => {
        setQuantity(props.quantity);
        setPartialTotal(quantity * props.price)
    }, [cartItems, editItemQuantity]);



    return (
    <Container>
        <Info>
            <Product>
                <ProductDetail>
                    <Image src={props.img} />
                    <Details>
                        <ProductName><b>Product:{" "}</b>{props.title}</ProductName>
                        <ProductId><b>ID:{" "}</b>{props.itemId}</ProductId>
                    </Details>
                </ProductDetail>
                <PriceDetail>
                    <ProductAmountContainer>
                        <button onClick={() => editItemQuantity("minus", props.itemId)}>
                            <RemoveIcon/>
                        </button>
                        <ProductAmount>{quantity}</ProductAmount>
                        <button onClick={() => editItemQuantity("add", props.itemId)}>
                            <AddIcon/>
                        </button>
                        <button style={{marginLeft: "10px"}} onClick={() => removeFromCart(props.itemId)}>
                            Delete
                        </button>
                    </ProductAmountContainer>
                    <ProductPrice>PerPiece: P {props.price}.00</ProductPrice>
                    <ProductPrice>Total: P {partialTotal}.00</ProductPrice>
                </PriceDetail>
            </Product>
            <Hr/>
        </Info>          
                

    </Container>
  )
}

export default ShoppingBag;
