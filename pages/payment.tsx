import CheckoutWizard from '@/components/CheckoutWizard'
import React, { useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { StoreContext } from '@/utils/Store';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';


 

const PaymentScreen = () => {
    const [ selectPaymentMethod, setSelectedPaymentMethod ] = useState('')
    const { state, dispatch } = useContext(StoreContext) 
    const {cart} = state
    const {shippingAddress, paymentMethod} = cart;

    const router = useRouter()

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!setSelectedPaymentMethod){
           return toast.error('Payment Method not selected')
        }
         dispatch({ type:'SAVE_PAYMENT_METHOD', payload: selectPaymentMethod})
         Cookies.set(
            'cart',
            JSON.stringify({
                ...cart,
                paymentMethod: selectPaymentMethod,
            })
         );
         router.push('placeorder')
    }
    useEffect(():any => {
        if(!shippingAddress){
         return router.push('/shipping')
        }
        setSelectedPaymentMethod(paymentMethod || '');
    },[paymentMethod, router,shippingAddress.address])
  return (
    <>
      <CheckoutWizard activeStep={2}/>
      <form className='mx-auto max-w-screen-md' onSubmit={submitHandler}>
        <h1 className='mb-4 text-xl'>Payment Method</h1>
        {['PayPal', 'Stripe', 'CashOnDelivery'].map((payment) => (
          <div key={payment} className='mb-4'>
            <input
              name='paymentMathod'
              className='p-2 outline-none focus:ring-0'
              id={payment}
              type='radio'
              checked={selectPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />
            <label className='p-2' htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}
        <div className='mb-4 flex justify-between'>
          <button
            className='default-button'
            type='button'
            onClick={() => router.push('/shipping')}
          >
            Back
          </button>
          <button className='primary-button' type='submit'>
            Next
          </button>
        </div>
      </form>
    </>
  
  )
}
PaymentScreen.auth = true
export default PaymentScreen