import React, {createContext, useEffect, useState} from 'react'


export const ShopContext = createContext(null);

  // Creates the default cart data where all items is 0
/*
  const getDefaultCart = () => {  
  let cart = {}
  for (let i=1; i<popularProducts.length + 1; i++ ) {
    cart[i] =0;
  }
  return cart;
};
*/
  //Holds the data of number of per items that is chosen by user
const ShopContextProvider = (props) => {
  const initialUserInfo = {
    firstname: '',
    lastname: '',
    username: 'user',
    items: [],
    address: '',
    contact: '',
    email: '',
    isAdmin: false
  }

  // function settingUserInformation(property, value) {
  //     setUserInformation({...userInformation, [property] : value });
  // }

  const [cartItems, setCartItems] = useState([]);
  const [viewingId, setViewingId] = useState('a001');
  const [userInformation, setUserInformation] = useState(initialUserInfo);
  const [soapsData, setSoapsData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [total, setTotal] = useState(0);
  
  // setting if user is logged in
  
  


  const addingToCart = (itemId, number) => {
    let itemIndex;
    if (cartItems.length !== 0) {
     
      for (let i = 0; i < cartItems.length ; i++) {
          if (cartItems[i].productId === itemId) {
            itemIndex = i;
          }
      }
      if (itemIndex)  {
          console.log("if is activated in adding to cart");
          cartItems[itemIndex].quantity += number;
      } else {

        for (let i = 0; i < cartItems.length ; i++) {
          if (soapsData[i].productId === itemId) {
            itemIndex = i;
            let newItem = {
              productId:itemId, 
              quantity: number,
              title: soapsData[itemIndex].title,
              img: soapsData[itemIndex].img,
              description: soapsData[itemIndex].description,
              price: soapsData[itemIndex].price
            }
            setCartItems(
              cartItems.push(newItem)
            );
            console.log("cart has:",cartItems);




          }
        }
        
        
      };
    } else {
   
      for (let i = 0; i < soapsData.length ; i++) {
  
          if (soapsData[i].productId === itemId) {
            itemIndex = i;
            setCartItems(cartItems.push({
              productId:itemId, 
              quantity: number,
              title: soapsData[itemIndex].title,
              img: soapsData[itemIndex].img,
              description: soapsData[itemIndex].description,
              price: soapsData[itemIndex].price
            }))
            console.log('Cart hads 2: ',cartItems);
    }
          }
      }
      
      console.log('added item: ',cartItems);  
  }

// Log changes in cart
useEffect(() => {
  console.log("cart edited", cartItems);
},[cartItems])


  const editQuantity = (operation, id) => {
    let itemIndex;
    for (let i = 0; i < cartItems.length ; i++) {
      if(cartItems[i].productId === id){
        itemIndex = i;
      }
    }

    if(operation === "add"){
      cartItems[itemIndex].quantity += 1; 
    }else{
      cartItems[itemIndex].quantity -= 1; 
    }


  }


    //holds the id number that the user wants to check
  const settingId = (id) => {
      setViewingId(id);
  };

  const settingSoapsData = (data) => {
      setSoapsData(data);
  }

 
    //Summary of all data within this context
  const contextValue = {cartItems, settingId, viewingId, userInformation, settingSoapsData, soapsData, isLoggedIn, addingToCart, editQuantity, setIsLoggedIn, setUserInformation, isUserAdmin, setIsUserAdmin, setCartItems, setViewingId, total, setTotal};

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
};

export default ShopContextProvider;