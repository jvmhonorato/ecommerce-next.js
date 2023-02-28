import CheckoutWizard from '@/components/CheckoutWizard'
import React, { useContext, useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useRouter } from 'next/router'
import { StoreContext } from '@/utils/Store';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

interface LoginFormValues {
    paymentMethod?:string;
    otherProp?: any;
  }

const initialValues: LoginFormValues = {
   paymentMethod:''
  };
  

const PaymentScreen = () => {
    const [ selectPaymentMethod, setSelectedPaymentMethod ] = useState('')
    const { state, dispatch } = useContext(StoreContext) 
    const {cart} = state
    const {shippingAddress, paymentMethod} = cart;

    const router = useRouter()

    const handleSubmit = (e:any) => {
        e.preventDefault();
        if(!setSelectedPaymentMethod){
            toast.error('Payment Method not selected')
        }
         dispatch({ type:'SAVE_PAYMENT_METHOD', payload: selectPaymentMethod})
         Cookies.set(
            'cart',
            JSON.stringify({
                ...cart,
                paymentMethod: selectPaymentMethod,
            })
         )
    }
    useEffect(():any => {
        if(!shippingAddress){
         return router.push('/shipping')
        }
        setSelectedPaymentMethod(paymentMethod || '');
    },[])
  return (
    <>
      <CheckoutWizard activeStep={2}/>
      <Formik 
      initialValues={initialValues}
      onSubmit={handleSubmit}
      >
        <Form className='mx-auto max-w-screen-md'>
      <h1 className='mb-4 text-xl'>Payment Method</h1>
      {
        ['PayPal','Stripe', 'CashOnDelivery'].map((payment)=> (
            <div key={payment} className='mb-4'> 
             <Field name='paymentMethod' className='p-2 outline-none focus-ring-0' id={payment} type='radio' checked={selectPaymentMethod === payment} onChange={() => setSelectedPaymentMethod(payment)}/>
             <label className='p-2' htmlFor={payment}>{payment}</label>
            </div>
        ))
      }
      <div className='mb-4 flex justify-between'>
        <button onClick={()=> router.push('/shipping')} type='button' className='default-button'>Back</button>
        <button type='submit' className='primary-button'>Next</button>
      </div>
      </Form>
    </Formik>
    </>
  
  )
}

export default PaymentScreen