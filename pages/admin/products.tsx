import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react'
import { toast } from 'react-toastify';
import Layout from '@/components/Layout';
import { getError } from '@/utils/error';


function reducer(state:any, action:any){
    switch (action.type) {
         case 'FETCH_REQUEST':
            return {...state, loading: true, error: ''};
         case 'FETCH_SUCCESS':
            return {...state, loading: false, products: action.payload, error: ''};
         case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};
          case 'CREATE_REQUEST':
            return {...state, loadingCreate:true };
          case 'CREATE_SUCCESS':
             return {...state, loadingCreate:false } ;
           case 'CREATE_FAIL':
              return {...state, loadingCreate:false};  
           case 'DELETE_REQUEST':
            return {...state, loadingDelete:true};   
           case 'DELETE_SUCCESS':
             return {...state, loadingDelete:false, successDelete: true};   
           case 'DELETE_FAIL':
             return {...state, loadingDelete:false};   
           case 'DELETE_RESET':
             return {...state, loadingDelete:false, successDelete:false};   
           default: 
           return state;   
    }
}

const AdminProductsScreen = () => {

    const router = useRouter()
    const[{ loading, error, products, loadingCreate, successDelete, loadingDelete }, dispatch] = useReducer(reducer,{
        loading:true,
        products:[],
        error: '',
    });

    const createHandler = async () => {
        if(!window.confirm('Você tem certeza?')){
            return;
        }
        try{
            dispatch({type:'CREATE_REQUEST'});
            const { data } = await axios.post(`/api/admin/products`);
            dispatch({type: 'CREATE_SUCCESS'});
            toast.success('Produto criado com sucesso!')
            router.push(`/admin/product/${data.product._id}`);
        }catch(err){
            dispatch({type: 'CREATE_FAIL'});
            toast.error(getError(err))
        }
    }
    useEffect(()=> {
        const fetchData = async () => {
            try{
                dispatch({type: 'FETCH_REQUEST'});
                const { data } = await axios.get(`/api/admin/products`);
                dispatch({type:'FETCH_SUCCESS', payload:data});
                
            }catch (err) {
                dispatch({type:'FETCH_FAIL', payload:getError(err)}) 
            }
        };
        if(successDelete){
            dispatch({type:'DELETE_RESET'});

        }else{
            fetchData();
        }
        
    },[successDelete])

    const deleteHandler = async (productId:any) => {
             if(!window.confirm('Are you sure?')){
                return;
             } 
             try{
                dispatch({type: 'DELETE_REQUEST'});
                await axios.delete(`/api/admin/products/${productId}`)
                dispatch({type: 'DELETE_SUCCESS'});
                toast.success('Deleted successfully')

             }catch(err){
                dispatch({type: 'DELETE_FAIL'})
                toast.error(getError(err))
             }  
    }
  return (
    <Layout title='Produtos Admin'>
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
      <ul>
                    <li>
                        <Link className='text-indigo' href="/admin/dashboard">
                            <p>Painel Principal</p>
                        </Link>
                    </li>
                    <li>
                        <Link className='text-indigo' href='/admin/orders'>
                            <p >Ordens de Pagamento</p>
                         </Link>
                    </li>
                    <li>
                        <Link className='text-indigo' href='/admin/products'><p className='font-bold text-xl'>Produtos</p></Link>
                    </li>
                    <li>
                        <Link className='text-indigo' href='/admin/users'><p >Usuários</p></Link>
                    </li>
                    
                </ul>
            </div>
            <div className='overflow-x-auto md:col-span-3'>
                <div className='flex justify-between'>
                   <h1 className='mb-4 text-3xl font-semibold'>Produtos</h1>
                   {loadingDelete && <div>Deleting item...</div>}
                   <button 
                        disabled={loadingCreate} 
                        onClick={createHandler} 
                        className='primary-button'
                        >{loadingCreate ? 'Loading': 'Criar Produto'}
                     </button>
                </div>
                
                {loading ? (
                 <div>Loading...</div>
                 ): error ? (
                 <div className='alert-error'>{error}</div>
                 ):(
                 <div className='overflow-x-auto bg-white rounded-md bg-opacity-80 m-2 p-2 '>
                    <table className='min-w-full'>
                       <thead className='border-b'>
                       <tr>
                                <th className='px-5 text-left'>ID</th>
                                <th className='p-5 text-left'>NOME</th>
                                <th className='p-5 text-left'>PREÇO</th>
                                <th className='p-5 text-left'>CATEGORIA</th>
                                <th className='p-5 text-left'>QUANTIDADE</th>
                                <th className='p-5 text-left'>RATING</th>
                                <th className='p-5 text-left'>AÇÕES</th>
                            </tr>
                       </thead> 
                       <tbody>
                         {products.map((product:any)=> (
                            <tr key={product._id} className='border-b'>
                                <td className='p-5'>{product._id}</td>
                                <td className='p-5'>{product.name}</td>
                                <td className='p-5'>R$ {product.price}</td>
                                <td className='p-5'>{product.category}</td>
                                <td className='p-5'>{product.countInStock}</td>
                                <td className='p-5'>{product.rating}</td>
                                <td className='p-5 flex '>
                                    <div>
                                    <Link className='edit-button' href={`/admin/product/${product._id}`} passHref >Editar</Link> &nbsp; 
                                    </div>
                                    <div>
                                    <button onClick={()=> deleteHandler(product._id)} className='delete-button'>
                                        Delete
                                    </button>
                                    </div>
                                </td>
                            </tr>
                         ))}
                       </tbody>
                    </table>
                 </div>
                 )}
            </div>
      </div>

    </Layout>
  )
}

AdminProductsScreen.auth = {adminOnly: true};
export default AdminProductsScreen