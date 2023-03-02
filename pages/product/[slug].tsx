
import React, { useContext } from "react";
import { useRouter } from "next/router"
import Link from "next/link";
import Image from "next/image";
import { StoreContext } from '../../utils/Store'
import db from "@/utils/db";
import Product from "@/models/Product";
import axios from "axios";
import { toast } from "react-toastify";

const ProductScreen = (props:any) => {
    const { product } = props;
    const router = useRouter()
    const {state, dispatch } = useContext(StoreContext)
    if(!product){
      return <div>Not found</div>

    }
    const addToCartHandler = async() => {
        //logic to add same iten to Cart
        const existItem = state.cart.cartItems.find((x:any) => x.slug === product.slug)
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);

        if (data.countInStock < quantity){
            
            return toast.error('Sorry. Product is out of stock');
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: {...product, quantity  }});
        router.push('/cart')
         
    }
    return(
        <> 
          
              <div className="py-2">
                <Link href='/'>Back to products</Link>
              </div>
              <div className="grid md:grid-cols-4 md:gap-3">
                <div className="md:col-span-2">
                    <Image 
                    src={product.image} 
                    alt={product.name}
                    width={640}
                    height={640}
                    
                     ></Image>
                </div>
                <div>
                    <ul>
                        <li>
                            <h1 className="text-lg">{product.name}</h1>
                        </li>
                        <li>Category: {product.category}</li>
                        <li>Brand: {product.brand}</li>
                        <li>{product.rating} of {product.numReviews} reviews</li>
                        <li>Description: {product.description}</li>
                    </ul>
                </div>
                <div>
                    <div className="card p-5 ">
                    <div className="mb-2 flex justify-between">
                        <div>Price</div>
                        <div>R${product.price}</div>
                    </div>
                    <div className="mb-2 flex justify-between">
                        <div>Status</div>
                         <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>   
                    </div>
                    <button onClick={addToCartHandler} className="primary-button w-full ">Add to cart</button>
                    </div>
                    
                </div>
              </div>
          
        </>
    )

}  

export async function getServerSideProps(context:any) {
    const { params } = context;
    const { slug } = params;

    await db.connect();
    const product = await  Product.findOne({slug}).lean();
    await db.disconnect();
    return {
        props: {
            product: product ? db.convertDocToObj(product) : null
        }
    }
}


export default ProductScreen