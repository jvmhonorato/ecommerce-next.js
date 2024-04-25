import ProductItem from '@/components/ProductItem';
import Product from '@/models/Product';
import db from '@/utils/db';
import { StoreContext } from '@/utils/Store';
import axios from 'axios';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';

const Home = ({products}:{products:any}) => {
  const {state, dispatch} = useContext(StoreContext)
  const { cart } = state

  const addToCartHandler = async(product:any) => {
    //logic to add same iten to Cart
    const existItem = cart.cartItems.find((x:any) => x.slug === product.slug)
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity){
        return  toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: {...product, quantity  }});
    
     
}
  return (
    <div className='flex flex-col mt-11 '> 
     <h1 className="text-3xl font-bold ">Home Page</h1>
     <div className='ml-4 grid grid-cols-1 gap-1 gap-x-16 md:grid-cols-3 lg:grid-cols-4 mt-24 mb-16'>
      {products.map((product:any)=> (
        <ProductItem addToCartHandler={addToCartHandler} product={product} key={product.slug}></ProductItem>
      ))}
     </div>
    
    </div>
  )
} 

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj)
    }
   }
  }



export default Home
