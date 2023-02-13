import Layout from "@/components/Layout";
import React from "react";
import { useRouter } from "next/router"
import data from "@/utils/data";

const ProductScreen = () => {
    const { query } = useRouter();
    const { slug } = query;
    const product = data.products.find(x => x.slug === slug);
    if(!product){
      return <div>Not found</div>

    }
    return(
        <> 
          <Layout title={product?.name}>
              <h1>{product.name}</h1>  
          </Layout>
        </>
    )

}  
export default ProductScreen