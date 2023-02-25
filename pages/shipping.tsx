import CheckoutWizard from '@/components/CheckoutWizard'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import React from 'react'


interface LoginFormValues {
    fullName: string;
    address: string;
    city: string;
    cep: string;
    country: string;
    
  }

 const ShippingScreen = () => {
    const initialValues: LoginFormValues = {
       fullName:'',
       address:'',
       city:'',
       cep:'',
       country:'',
      };

    const validationSchema = Yup.object({
        fullName: Yup.string()
                     .required('Full Name is Required'),
        address: Yup.string()
                     .required('Address is Required')
                     .min(3, 'Address must be at least 3 characters'),
        city: Yup.string()
                     .required('Please enter City'),
         cep: Yup.string()
                     .matches(/^[0-9]{5}-[0-9]{3}$/,'Format: 00000-000')
                     .required('CEP is Required'),
        country: Yup.string()
                     .required('Please enter Country')
                     
       });

    const handleSubmit = async () => {}
  return (
    <>
     <CheckoutWizard activeStep={1}/>
     <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
        <Form className='mx-auto max-w-screen-md'>
            <h1 className='mb-4 text-xl'>Shipping Address</h1>
            <div className='mb-4'>
                <label htmlFor='fullName'>Full Name</label>
                <Field className='w-full' id='fullName' name='fullName'  placeholder="Full Name" autoFocus />
                <div className='text-red-500'>
                <ErrorMessage name='fullName'/>
                </div>
            </div>
            <div className='mb-4'>
                <label htmlFor='fullName'>Address</label>
                <Field className='w-full' id='address' name='address'  placeholder="Address" autoFocus />
                <div className='text-red-500'>
                <ErrorMessage name='address'/>
                </div>
                
            </div>
            <div className='mb-4'>
                <label htmlFor='fullName'>City</label>
                <Field className='w-full' id='city' name='city'  placeholder="City" autoFocus />
                <div className='text-red-500'>
                <ErrorMessage name='city'/>
                </div>
                
            </div>
            <div className='mb-4'>
                <label htmlFor='fullName'>CEP</label>
                <Field className='w-full' id='cep' name='cep'  placeholder="CEP" autoFocus />
                <div className='text-red-500'>
                <ErrorMessage name='cep'/>
                </div>
                
            </div>
            <div className='mb-4'>
                <label htmlFor='fullName'>Country</label>
                <Field className='w-full' id='country' name='country'  placeholder="Country" autoFocus />
                <div className='text-red-500'>
                <ErrorMessage name='country'/>
                </div>
                
            </div>

        </Form>

     </Formik>
    </>
  )
}

export default ShippingScreen