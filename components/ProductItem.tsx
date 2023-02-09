

import Link from "next/link";
import React from "react";

interface ProductProps{
    product:{
    name?: string;
    slug?: string;
    category?: string;
    image?: string;
    price?: number;
    brand?: string;
    rating?: number;
    numReviews?: number;
    countInStock?: number;
    description?: string;
    }

    
}


//paramater {product} will be turn the object product come fomr data.ts
const ProductItem = ({product}:ProductProps) => {
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
             <button className="primary-button">Add to Cart</button>
            </div>
        </div>
    )
}
export default ProductItem