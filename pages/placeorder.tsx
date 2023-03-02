import CheckoutWizard from '@/components/CheckoutWizard'
import { StoreContext } from '@/utils/Store'
import Link from 'next/link'

import React, { useContext } from 'react'


const PlaceorderScreen = () => {
    const {state, dispatch} = useContext(StoreContext)
    const {cart} = state
    const {cartItems, shippingAddress, paymentMethod} = cart

  return (
    <>
    <CheckoutWizard activeStep={3}/>
     <h1 className='mb-4 text-xl'>Place Order</h1>
     {cartItems.length === 0 ? 
     (
     <div>
        Cart is empty. <Link href='/'>Go Shipping</Link>
     </div>
     ) : 
     (
        <div className='grid md:grid-cols-4 md:gap-5'>
            <div className='overflow-x-auto md:col-span-3'>
                <div>
                    <h2 className='mb-2 text-lg'>Shipping Address</h2>
                    <div>
                        {shippingAddress.fullName}, {shippingAddress.address}, {''}
                        {shippingAddress.city},{shippingAddress.cep}, {shippingAddress.country}
                    </div>
                    <div>
                        <Link href='/shipping'>Edit</Link>
                    </div>
                </div>
            </div>
        </div>
     )
     }
    </>
    
  )
}

export default PlaceorderScreen