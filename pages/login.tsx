import Link from 'next/link'
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


interface LoginFormValues {
    email: string;
    password: string;
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };
  

const  LoginScreen = () => {

    const handleSubmit = ({email, password}: LoginFormValues) => {
        // Submit login data to the server
        console.log(email, password)
      };
    
    
  return (
    <>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
         >
         <Form  className='mx-auto max-w-screen-md' >
          <h1 className='mb-4 text-xl'>Login</h1>
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
            <button type='submit' className='primary-button'>Login</button>
        </div>
        <div className='mb-4'>
            Don&apos;t have an account? &nbsp;
            <Link href='register'>Register</Link>
        </div>
      </Form>
     </Formik>
    </>
  )
}
export default LoginScreen
