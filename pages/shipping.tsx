import CheckoutWizard from '@/components/CheckoutWizard'
import { StoreContext } from '@/utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'

type FormValues = {
    fullName: string;
    address: string;
    city: string;
    cep: string;
    country: string;
  };

const ShippingScreen = () => {
    const router = useRouter()
    const {state, dispatch } = useContext(StoreContext)
    const { cart } = state
    const { shippingAddress } = cart

    const { handleSubmit, register, formState: {errors}, setValue} = useForm<FormValues>()


    useEffect(()=> {
        setValue('fullName',shippingAddress.fullName)
        setValue('address',shippingAddress.address)
        setValue('city',shippingAddress.city)
        setValue('cep',shippingAddress.cep)
        setValue('country',shippingAddress.country)
    },[setValue, shippingAddress])

    const submitHandler = async ({fullName, address, city, cep, country}:FormValues ) => {
        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: { fullName, address, city, cep, country },
        })
        Cookies.set('cart',JSON.stringify({
            ...cart
            ,shippingAddress: {
                fullName,
                address,
                city,
                cep,
                country
                

            },
        }))
        router.push('/payment')
        
    }
  return (
    <>
      <CheckoutWizard activeStep={1}/>
      <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
     <h1 className='mb-4 text-xl'>Shipping Address</h1> 
     <div className='mb-4'>
     <label htmlFor='fullName'>
        Full Name:</label>
        <input type="text" className='w-full' {...register('fullName', { required: true })} />
        {errors.fullName && <span className='text-red-500'>Full name is required contain at least 3 characters</span>}
     </div>   
     
        <div className='mb-4'>
        <label htmlFor='address'>
        Address:</label>
        <input type="text" className='w-full' {...register('address', { required: true, minLength:3} )} />
        {errors.address && <span className='text-red-500'>Address is required and must contain at least 3 characters</span>}
        </div>
      
        <div className='mb-4'>
        <label htmlFor='city'>
        City:</label>
        <input type="text" className='w-full' {...register('city', { required: true })} />
        {errors.city && <span className='text-red-500'>City is required</span>}
        </div>
      
        <div className='mb-4'>
        <label htmlFor='cep'>
        CEP:
        </label>
        <input type="text" className='w-full' {...register('cep', { required: true, pattern: /^[0-9]{5}(?:-[0-9]{3})?$/i })} />
        {errors.cep && <span className='text-red-500'>CEP is required and must be in the format 00000-000</span>}
        </div>
   

        <div className='mb-4'>
        <label htmlFor='country'>
        Country:
        </label>
        <input type="text" className='w-full' {...register('country', { required: true })} />
        {errors.country && <span className='text-red-500'>Country is required</span>}
        </div>
      
      
      <button className='primary-button' type="submit">Submit</button>
      </form>
    </>
  )
}

ShippingScreen.auth = true;
export default ShippingScreen