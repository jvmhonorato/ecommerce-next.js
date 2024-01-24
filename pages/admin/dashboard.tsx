import axios from 'axios';
import Link from 'next/link';

import { Bar } from 'react-chartjs-2'
import {Chart as ChartJS,
     CategoryScale,
         LinearScale,
         BarElement,
         Title,
         Tooltip,
         Legend
        } from 'chart.js'
import React, { useEffect, useReducer } from 'react'
import { getError } from '@/utils/error';

ChartJS.register( 
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend);

    interface ChartOptions {
        responsive: boolean;
        plugins: {
          legend: {
            position: 'top' | 'bottom' | 'left' | 'right';
          };
        };
      }
      

    export const options:ChartOptions = {
        responsive:true,
        plugins: {
            legend: {
                position: 'top'
            },
        },
    }

// função com estado e ação
function reducer(state:any, action:any){
    switch (action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true, error: ''};
        case 'FETCH_SUCCESS':
            return {...state, loading: false, summary: action.payload, error: ''};
         case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};
              default:
                state;   
    }
}




const AdminDashboardScreen = () => {
const[{ loading, error, summary }, dispatch] = useReducer(reducer,{
    loading:true,
    summary:{salesData: []},
    error: '',
});


useEffect(()=>{
    const fetchData = async () => {
        try{
            dispatch({type: 'FETCH_REQUEST'});
            const { data } = await axios.get(`/api/admin/summary`);
            dispatch({ type: 'FETCH_SUCCESS', payload: data});
           }catch(err){
            dispatch({type: 'FETCH_FAIL', payload: getError(err)})
        }
    };
    fetchData();
    },[])
    
    interface ChartData {
        labels: string[];
        datasets: {
          label: string;
          backgroundColor: string;
          data: number[];
        }[];
      }
      
      const data: ChartData = {
        labels: summary.salesData.map((x: any) => x._id),
        datasets: [
          {
            label: 'Sales',
            backgroundColor: 'rgba(162, 222, 208, 1)',
            data: summary.salesData.map((x: any) => x.totalSales),
          },
        ],
      };
      
  return (
    <>
        <div className='grid md:grid-cols-4 md:gap-5'>
            <div>
                <ul>
                    <li>
                        <Link className='text-indigo' href="/admin/dashboard">
                            <p className='font-bold text-xl'>Painel Principal</p>
                        </Link>
                    </li>
                    <li>
                        <Link className='text-indigo' href='/admin/orders'>Ordens de Pagamento</Link>
                    </li>
                    <li>
                        <Link className='text-indigo' href='/admin/products'>Produtos</Link>
                    </li>
                    <li>
                        <Link className='text-indigo' href='/admin/users'>Usuários</Link>
                    </li>
                    
                </ul>
            </div>
            <div className='md:col-span-3'>
                <h1 className='mb-4 text-xl'>Painel do Administrador</h1>
                 {loading ? (
                 <div>Loading...</div>
                 ): error ? (
                 <div className='alert-error'>{error}</div>
                 ):(
                 <div>
                    <div className="grid grid-cols-1 md:grid-cols-4 ">
                        <div className='card m-5 p-5 bg-white rounded-md bg-opacity-80 m-2 p-2'>
                            <p className='text-3xl'>${summary.ordersPrice}</p>
                            <p>Vendas</p>
                            <Link className='text-indigo' href='/admin/sells'>Ver vendas</Link>
                        </div>
                        <div className='card m-5 p-5 bg-white rounded-md bg-opacity-80 m-2 p-2'>
                            <p className='text-3xl'>{summary.ordersCount}</p>
                            <p>Ordens</p>
                            <Link className='text-indigo bg-white rounded-md bg-opacity-80 m-2 p-2' href='/admin/orders'>Ver Ordens</Link>
                        </div>
                        <div className='card m-5 p-5 bg-white rounded-md bg-opacity-80 m-2 p-2'>
                            <p className='text-3xl'>{summary.productsCount}</p>
                            <p>Produtos</p>
                            <Link className='text-indigo'  href='/admin/products'>Ver Produtos</Link>
                        </div>
                        <div className='card m-5 p-5 bg-white rounded-md bg-opacity-80 m-2 p-2'>
                            <p className='text-3xl'>{summary.usersCount}</p>
                            <p>Usuários</p>
                            <Link className='text-indigo' href='/admin/users'>Ver Usuários</Link>
                        </div>
                        
                    </div>
                    <h2 className='text-xl'>Relatório de Vendas</h2>
                    <div className='bg-white rounded-md bg-opacity-80 m-2 p-2'>
                    <Bar options={options}
                         data={data}/>
                    </div>
                 </div>
                 )}   
            </div>
        </div>
    </>
  )
}

AdminDashboardScreen.auth = { adminOnly:true };
export default AdminDashboardScreen