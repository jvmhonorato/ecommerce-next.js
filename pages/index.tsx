import ProductItem from '@/components/ProductItem';
import data from '@/utils/data';
import React from 'react';

export default function Home() {
  return (
    <> 
     <h1 className="text-3xl font-bold ">Home Page</h1>
     <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
      {data.products.map((product)=> (
        <ProductItem product={product} key={product.slug}></ProductItem>
      ))}
     </div>
    
    </>
  )
}
