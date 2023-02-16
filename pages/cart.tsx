import { StoreContext } from '../utils/Store';
import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiOutlineXCircle } from "react-icons/hi";


const CartScreen = () => {
    const {state, dispatch} = useContext(StoreContext);
    const {
        cart: {cartItems},
    } = state
    const removeItemHandler = (item:any) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload:item})
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
                                              <td className='p-5 text-right'>{item.quantity}</td> 
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
                  
                    </div>
                  )}
        </div>
        </>
    )
}

export default CartScreen