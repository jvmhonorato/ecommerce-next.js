/* eslint-disable no-unused-vars */
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react'
import { toast } from 'react-toastify';
import Layout from '@/components/Layout';
import { getError } from '@/utils/error';

function reducer(state:any, action:any){
    switch (action.type) {
         case 'FETCH_REQUEST':
            return {...state, loading: true, error: ''};
         case 'FETCH_SUCCESS':
            return {...state, loading: false, users: action.payload, error: ''};
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

const AdminUserScreen = () => {
    const[{ loading, error, users, loadingCreate, successDelete, loadingDelete }, dispatch] = useReducer(reducer,{
        loading:true,
        users:[],
        error: '',
    });

    useEffect(()=>{
        const fetchData = async () => {
            try{
                dispatch({type: 'FETCH_REQUEST'});
                const { data } = await axios.get(`/api/admin/users`);
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

    const deleteHandler = async (userId:any) => {
        if(!window.confirm('Você tem certeza?!')){
           return;
        } 
        try{
           dispatch({type: 'DELETE_REQUEST'});
           await axios.delete(`/api/admin/users/${userId}`)
           dispatch({type: 'DELETE_SUCCESS'});
           toast.success('User deleted successfully')

        }catch(err){
           dispatch({type: 'DELETE_FAIL'})
           toast.error(getError(err))
        }  
}

  return (
    <Layout title='Usuário Admin'>

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
                        <Link className='text-indigo' href='/admin/products'><p >Produtos</p></Link>
                    </li>
                    <li>
                        <Link className='text-indigo' href='/admin/users'><p className='font-bold text-xl'>Usuários</p></Link>
                    </li>
                    
                </ul>
            </div>
            <div className='overflow-x-auto md:col-span-3'>
                <h1 className='mb-4 text-3xl font-semibold'>Usuários</h1>
                {loadingDelete && <div>Deleting...</div>}
                {loading ? (
                 <div>Loading...</div>
                 ): error ? (
                 <div className='alert-error'>{error}</div>
                 ):(
                 <div className='overflow-x-auto bg-white rounded-md bg-opacity-80 p-2 m-2'>
                    <table className='min-w-full'>
                        <thead>
                            <tr>
                                <th className='px-5 text-left'>ID</th>
                                <th className='p-5 text-left'>NOME</th>
                                <th className='p-5 text-left'>EMAIL</th>
                                <th className='p-5 text-left'>ADMIN</th>
                                <th className='p-5 text-left'>AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user:any)=> (
                                
                                <tr key={user._id} className='border-b'>
                                    <td className='p-5'>{user._id.substring(20, 24)}</td>
                                    <td className='p-5'>{user.name}</td>
                                    <td className='p-5'>{user.email}</td>
                                    <td className='p-5'>{user.isAdmin ? 'YES' : 'NO'}</td>
                                    <td className='p-5'>
                                        <Link type='button' className='edit-button' href={`/admin/user/${user._id}`} passHref>
                                            Editar
                                        </Link>
                                        &nbsp;
                                        <button type='button' className='delete-button' onClick={() => deleteHandler(user._id)}>
                                            Deletar
                                        </button>
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
AdminUserScreen.auth = {adminOnly:true}
export default AdminUserScreen