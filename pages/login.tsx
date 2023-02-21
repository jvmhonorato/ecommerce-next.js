import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form' 

const  LoginScreen = () => {

    const {handleSubmit, register, formState:{errors},} = useForm();
    const submitHandler = ({email, password}:any) => {
        return
    }
    const errorMsg:any = errors.email?.message
    
  return (
    <>
     <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
        <h1 className='mb-4 text-xl'>Login</h1>
        <div className='mb-4'>
            <label htmlFor='email'>Email</label>
            <input type="email"
            {...register('email',{required:'Please enter email',pattern:{value:/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i}} )} className='w-full' id='email' autoFocus></input>{errors.email && (<div className='text-red-500'>{errorMsg}</div>)}
        </div>
        <div className='mb-4'>
            <label htmlFor='password'>Password</label>
            <input type="password" className='w-full' id='password' autoFocus></input>
        </div>
        <div className='mb-4'>
            <button className='primary-button'>Login</button>
        </div>
        <div className='mb-4'>
            Don&apos;t have an account? &nbsp;
            <Link href='register'>Register</Link>
        </div>
     </form>
    </>
  )
}
export default LoginScreen
