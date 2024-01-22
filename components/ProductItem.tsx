


import Link from "next/link";
import React from "react";





//paramater {product} will be turn the object product come from data.ts
const ProductItem = ({product, addToCartHandler}:any) => {
    
    return(
        <div className="card bg-white bg-opacity-30 hover:bg-opacity-70">
            <div className='flex flex-col items-center justify-center p-5' >
            <Link href={`/product/${product.slug}`}>
                <img src={product.image}
                alt={product.name}
                className="rounded shadow"
                />
            </Link>
            </div>
          

            <div className="flex flex-col items-center justify-center p-5">
             <Link href={`/product/${product.slug}`}>
                <h2 className="text-lg">{product.name}</h2>
             </Link>
             <p className="mb-2">{product.brand}</p>
             <p>R${product.price}</p>
             <button onClick={() => addToCartHandler(product)} className="primary-button mt-2">Add to Cart</button>
            </div>
            
        </div>
    )
}
export default ProductItem