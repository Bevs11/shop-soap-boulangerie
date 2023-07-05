let prev = [
    {
        productId: "a001",
        quantity: 3
    }, {
        productId: "a002",
        quantity: 4
    }
]

setCartItems = [];

const addingToCart = (prev, itemId, number) => {
    let index;
    for (let i = 0; i < prev.length ; i++) {
        if (prev[i].productId === itemId) {
          index = i;
        }
    }
    if (index)  {
        console.log("if is activated");
        prev[index].quantity += number;
    } else {
       
        prev.push( {productId:itemId, quantity: number});
        console.log("else is activated");

      
    };
}


addingToCart(prev, "a003", 5);
console.log(prev);

const contextValue = {cartItems, addToCart, removeFromCart, settingId, viewingId, userInformation, getUserInformation, settingSoapsData, soapsData, isLoggedIn, settingIsLogged, addingToCart, removingFromCart };
