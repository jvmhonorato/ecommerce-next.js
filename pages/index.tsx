import ProductItem from '@/components/ProductItem';
import Product from '@/models/Product';
import data from '@/utils/data';
import db from '@/utils/db';
import React from 'react';

const Home = ({products}:{products:any}) => {
  return (
    <> 
     <h1 className="text-3xl font-bold ">Home Page</h1>
     <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
      {products.map((product:any)=> (
        <ProductItem product={product} key={product.slug}></ProductItem>
      ))}
     </div>
    
    </>
  )
} 

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products
    }
   }
  }



export default Home
