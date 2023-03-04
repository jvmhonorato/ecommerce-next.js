import Link from 'next/link'
import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {signIn, useSession} from 'next-auth/react'
import * as Yup from 'yup';
import { getError } from '@/utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';



interface LoginFormValues {
    name: string;
    email: string;
    password: string;
    confirmpassword: string;
  }
  
 
  

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(4, 'Username must be at least 4 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
      confirmpassword: Yup.string()
      .min(6, 'confirm Password must be at least 6 characters')
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const initialValues: LoginFormValues = {
    name:'',
    email: '',
    password: '',
    confirmpassword: '',
  };
  

const  RegisterScreen = () => {

  const { data: session } = useSession()
  const router = useRouter()
  const { redirect }:any = router.query;

  useEffect(() => {
   if (session?.user){
    router.push(redirect || '/')
   }
  }, [router, session, redirect]);

    const handleSubmit = async ({name, email, password}: LoginFormValues) => {
        // Submit login data to the server
        
        try{
         await axios.post('/api/auth/signup',{name, email, password})

          const result:any = await signIn('credentials', {
            redirect: false,
            email,
            password,
          });
          if(result.error){
            toast.error(result.error)
          }
        }catch(err){
          toast.error(getError(err))
        }
      };
    
    
  return (
    <>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
         >
         <Form  className='mx-auto max-w-screen-md' >
          <h1 className='mb-4 text-xl'>Create Account</h1>
             <div className='mb-4'>
                 <label htmlFor='email'>Username</label>
              <Field autoFocus className='w-full' type="name" id="name" name="name" />
            <div className='text-red-500'>
              <ErrorMessage name="name" />
             </div>
             </div>

            <div className='mb-4'>
            <label htmlFor='email'>Email</label>
              <Field autoFocus className='w-full' type="email" id="email" name="email" />
            <div className='text-red-500'>
            <ErrorMessage name="email" />
            </div>
            
       
           </div>
           <div className='mb-4'>
            <label htmlFor='password'>Password</label>
            <Field autoFocus className='w-full' type="password" id="password" name="password" />
            <div className='text-red-500'>
                <ErrorMessage  name="password" />
            </div>
            
           </div>
           <div className='mb-4'>
           <label htmlFor='password'>Confirm Password</label>
            <Field autoFocus className='w-full' type="confirmpassword" id="confirmpassword" name="confirmpassword" />
            <div className='text-red-500'>
                <ErrorMessage  name="confirmpassword" />
            </div>
           </div>
        <div className='mb-4'>
            <button type='submit' className='primary-button'>Register</button>
        </div>
        <div className='mb-4'>
            Don&apos;t have an account? &nbsp;
            <Link className='text-indigo-600' href={`/register?redirect=${redirect || '/'}`}>Register</Link>
        </div>
      </Form>
     </Formik>
    </>
  )
}
export default RegisterScreen
