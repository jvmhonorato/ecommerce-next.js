import { StoreContext } from '../utils/Store';
import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiOutlineXCircle } from "react-icons/hi";
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { toast } from 'react-toastify';


const CartScreen = () => {
    const router = useRouter();
    const {state, dispatch} = useContext(StoreContext);
    const {
        cart: {cartItems},
    } = state
    const removeItemHandler = (item:any) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload:item})
    }
    const updateCartHandler = async(item:any, qty:any) => {
        const quantity = Number(qty);
        const { data } = await axios.get(`/api/products/${item._id}`);
        if(data.countInStock < quantity){
          return  toast.error('Sorry. Product is out of stock');
        }
        dispatch({type:'CART_ADD_ITEM', payload:{...item, quantity}})
         toast.success('Product updated in the cart')
    }
    return(
        <>
        <div>
            <h1 className='mb-4 text-xl'>Shopping Cart</h1>
            {
                cartItems.length === 0 ? 
                  (
                    <div>
                        Cart is empty.<Link href='/'>Back to Main page</Link>
                    </div>
                  )
                  :
                  (
                    <div className='grid md:grid-cols-4 md:gap-5'>
                        <div className='overflow-x-auto md:col-span-3'>
                            <table className='min-w-full'>
                                <thead className='border-b'>
                                    <tr>
                                        <th className='px-5 text-left'>Item</th>
                                        <th className='p-5 text-right'>Quantity</th>
                                        <th className='p-5 text-right'>Price</th>
                                        <th className='p-5'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item:any)=> (
                                        <tr key={item.slug} className='border-b'>
                                              <td>
                                               <Link href={`/product/${item.slug}`}>
                                                
                                                    <Image 
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={50}
                                                    height={50}
                                                    >

                                                    </Image>
                                                
                                                </Link>  
                                              </td> 
                                              <td className='p-5 text-right'>
                                                <select value={item.quantity} onChange={(e) => updateCartHandler(item, e.target.value)}>
                                                {
                                                    [...Array(item.countInStock).keys() ].map(x => (
                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                    ))
                                                }
                                                </select>
                                              </td> 
                                              <td className='p-5 text-right'>R${item.price}</td>
                                              <td className='p-5 text-right'>
                                                <button onClick={() => removeItemHandler(item)}>
                                                   <HiOutlineXCircle></HiOutlineXCircle>
                                                </button>
                                                </td>  
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div >
                            <div className='card p-5 text-xl text-center'>
                            <ul>
                                <li>
                                    <div className='pb-3'>
                                          Subtotal ({cartItems.reduce((a:any,c:any) => a + c.quantity, 0)}) 
                                          {''}
                                          : R$
                                          {cartItems.reduce((a:any,c:any) => a + c.quantity * c.price, 0)}
                                    </div>
                                </li>
                                <li>
                                    <button onClick={() => router.push('login?redirect=/shipping')} className='primary-button w-full'>
                                        Check Out
                                    </button>
                                </li>
                            </ul>  
                            </div>          
                        </div>
                    </div>
                  )}
        </div>
        </>
    )
}

export default dynamic(()=> Promise.resolve(CartScreen), {ssr:false})