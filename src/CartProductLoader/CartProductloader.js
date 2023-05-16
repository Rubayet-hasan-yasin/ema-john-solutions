import { getShoppingCart } from "../utilities/fakedb";

const cartProductLoader = async () =>{
    const loadedProducts = await fetch('http://localhost:5000/products');
    const products = await loadedProducts.json();

    const storedCart = getShoppingCart();
    const saveCart = [];


    for(const id in storedCart){
        const addedProduct = products.find(pd=> pd._id === id);
        if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            saveCart.push(addedProduct);
        }
    }
    



    return saveCart;
}

export default cartProductLoader;