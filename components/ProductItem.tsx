

import ProductInterface from "@/interfaces/ProductInterface";
import Link from "next/link";
import React, { useContext } from "react";
import { StoreContext } from '../utils/Store'




//paramater {product} will be turn the object product come from data.ts
const ProductItem = ({product}:ProductInterface) => {
    const {state, dispatch } = useContext(StoreContext)
    
    const addToCartHandler = () => {
        //logic to add same iten to Cart
        const existItem = state.cart.cartItems.find((x:any) => x.slug === product.slug)
        const quantity = existItem ? existItem.quantity + 1 : 1;
        dispatch({ type: 'CART_ADD_ITEM', payload: {...product, quantity  }});
        
    }
    return(
        <div className="card">
            <Link href={`/product/${product.slug}`}>
                <img src={product.image}
                alt={product.name}
                className="rounded shadow"
                />
            </Link>

            <div className="flex flex-col items-center justify-center p-5">
             <Link href={`/product/${product.slug}`}>
                <h2 className="text-lg">{product.name}</h2>
             </Link>
             <p className="mb-2">{product.brand}</p>
             <p>R${product.price}</p>
             <button onClick={addToCartHandler} className="primary-button mt-2">Add to Cart</button>
            </div>
            
        </div>
    )
}
export default ProductItem