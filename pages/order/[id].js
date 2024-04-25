import { getError } from '@/utils/error';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {  useEffect, useReducer } from 'react'
import { toast } from 'react-toastify';


const reducer = (state, action) => {
     switch (action.type) {
         case 'FECTH_REQUEST':
            return {...state, loading: true , error: ''};
         case 'FECTH_SUCCESS':
            return {...state, loading:false, order:action.payload, error: ''}   
          case 'FECTH_FAIL':
            return {...state, loading:false, error:action.payload}  
          case 'PAY_REQUEST':
            return {...state, loadingPay:true};
          case 'PAY_SUCCESS':
                return {...state, loadingPay:false, successPay: true}  
         case ' PAY_FAIL':
            return {...state, loadingPay:false, errorPay: action.payload}
          case 'PAY_RESET':
            return {...state, loadingPay: false, successPay: false, errorPay: ''}  
            default:
                state;

     }
}
const OrderScreen  = () => {
    const [{isPending}, paypalDispatch] = usePayPalScriptReducer();

    const {query} = useRouter();
    const orderId = query.id;


    const [{loading, error, order, successPay, loadingPay},
         dispatch, ] = useReducer(reducer, {
        loading:true,
        order: {},
        error: '',

    })
    useEffect(()=> {
        const fetchOrder = async () => {
            try{
            dispatch({type:'FECTH_REQUEST'});
            const {data} = await axios.get(`/api/orders/${orderId}`)
            dispatch({type: 'FECTH_SUCCESS', payload: data})
        }catch (err) {
            dispatch({type: 'FECTH_FAIL', payload: getError(err)})
         }
        };
        if(!order._id || successPay || (order._id && order._id !== orderId)) {
            fetchOrder()
            if (successPay){
                dispatch({type: 'PAY_RESET'})
            }
        }else {
            const loadPayalScript = async () => {
               const {data: clientId} = await axios.get('/api/keys/paypal');
               paypalDispatch({
                type:'resetOptions',
                value: {
                    'client-id': clientId,
                    currency: 'BRL'
                },
               });
               paypalDispatch({ type:'setLoadingStatus', value:'pending'}); 
            };
            loadPayalScript();
        }
        
    },[order, orderId, paypalDispatch, successPay]);
    const {shippingAddress,
         paymentMethod,
          orderItems,
           itemsPrice,
            taxPrice,
             shippingPrice,
              totalPrice,
               isPaid,
                paidAt,
                isDelivered,
                 deliveredAt} = order

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: { value: totalPrice },

                },
            ]
        }).then((orderId)=> {
            return orderId;
        })
    }
    const onApprove = (data, actions) => {
        return  actions.order.capture().then(async function(details){
            try {
                dispatch({type: 'PAY_REQUEST'});
                const { data } = await axios.put(
                    `/api/orders/${order._id}/pay`,details 
                );
                dispatch({type: 'PAY_SUCCESS', payload: data});

            }catch(err){
                dispatch({type: 'PAY_FAIL', payload: getError(err)});
                toast.error(getError(err));
            }
        });
    }
    const onError = () => {

    }

  return (
    <>
         <h1 className='mb-4 text-xl'>{`Order ${orderId}`}</h1>
         {loading ? 
         (<div>
            Loading...
         </div>)
         :
         error ? 
         (<div className='alert-error'>
            {error}
         </div>)
         :
         (<div className='grid md:grid-cols-4 md:gap-5'>
            <div className='overflow-x-auto md:col-span-3'>
                <div className='card p-5'>
                    <h2 className='mb-2 text-lg'>ShippingScreen</h2>
                    <div>
                        {shippingAddress.fullName},{' '}
                         {shippingAddress.address},{' '}
                         {shippingAddress.city},{' '}
                          {shippingAddress.cep}, {' '}
                          {shippingAddress.country}
                    </div>
                    {isDelivered ? 
                    (<div className='alert-success'> 
                      Delivered at {deliveredAt}
                    </div>
                     )
                     :
                     (
                     <div className='alert-error'>
                        Not Delivered
                     </div>
                        )
                        }
                </div>
                <div className='card p-5'>
                       <h2 className='mb-2 text-lg'>Payment Method</h2>  
                       <div>{paymentMethod}</div> 
                       {isPaid ? (
                        <div className='alert-success'> Paid at {paidAt}</div>
                       ):(
                        <div className='alert-error'>Not Paid</div>
                       )}  
                </div>
                <div className='card overflow-x-auto p-5'>
                <h2 className='mb-2 text-lg'>Order Items</h2> 
                <table>
                    <thead>
                        <tr>
                            <th className='px-5 text-left'>Item</th>
                            <th className='p-5 text-right'>Quantity</th>
                            <th className='p-5 text-right'>Price</th>
                            <th className='p-5 text-right'>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderItems.map((item)=> (
                            <tr key={item._id} className='border-b'>
                             <td>
                                <Link href={`/product/${item.slug}`}>
                                    <div className='flex items-center'>
                                    <img 
                                        src={item.image}
                                        alt={item.name}
                                        className="rounded shadow"
                                        width={50}
                                        height={50}
                                        />
                                        &nbsp;
                                        {item.name}
                                    </div>
                                </Link>
                              </td>
                              <td className='p-5 text-right'>{item.quantity}</td>
                              <td className='p-5 text-right'>{item.price}</td>
                              <td className='p-5 text-right'>
                                R${item.quantity * item.price}
                              </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
            <div>
                <div className='card p-5'>
                           <h2 className='mb-2 text-lg'>Order Sumary</h2> 
                           <ul>
                             <li>
                                <div className='mb-2 flex justify-between'>
                                    <div>Items</div>
                                    <div>R${itemsPrice}</div>
                                </div>
                             </li>
                             <li>{''}
                                <div className='mb-2 flex justify-between'>
                                    <div>Tax</div>
                                    <div>R${taxPrice}</div>
                                </div>
                             </li>
                             <li>{''}
                                <div className='mb-2 flex justify-between'>
                                    <div>Shipping</div>
                                    <div>R${shippingPrice}</div>
                                </div>
                             </li>
                             <li>{''}
                                <div className='mb-2 flex justify-between'>
                                    <div>Total</div>
                                    <div>R${totalPrice}</div>
                                </div>
                             </li>
                              {!isPaid && (
                                <li>
                                    {isPending ? (<div>Loading...</div>
                                    ):(
                                    <div className='w-full'>
                                        <PayPalButtons
                                        createOrder={createOrder}
                                        onApprove={onApprove}
                                        onError={onError}
                                        ></PayPalButtons>
                                    </div>)}
                                    {loadingPay &&  <div>Loading...</div>}
                                </li>
                              )}
                           </ul>
                </div>
            </div>
         </div>
         )
         }
    </>
  )
}

OrderScreen.auth = true
export default OrderScreen