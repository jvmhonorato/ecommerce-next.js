import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '@/components/Layout';
import { getError } from '@/utils/error';


type FormValues = {
    name:string;
    slug:string;
    price:string; 
    category:string; 
    image:File; 
    flavor: string;
    countInStock: number;
    description: string;
   };

function reducer(state:any, action:any){
    switch(action.type){
        case 'FETCH_REQUEST':
            return {...state, loading: true , error:''};
            case 'FETCH_SUCCESS':
           return {...state, loading: false, error:''};
           case 'FETCH_FAIL':
            return {...state, loading:false, error:action.payload};
            case 'UPLOAD_REQUEST':
                return {...state, loadingUpload: true, errorUpload:''};
            case 'UPLOAD_SUCCESS':
                return {...state, loadingUpload:false, errorUpload:''};
            case 'UPLOAD_FAIL':
                return {...state, loadingUpload:false, errorUpload:action.payload};        
            default: 
            return state;
    }
}

const AdminProductEditScreen = () => {
    const router = useRouter()
    const {query} = useRouter();
    const productId:any = query.id;
    const [{loading, error, loadingUpdate, loadingUpload}, dispatch] = useReducer(reducer, {
        loading:true,
        error:''
    });

    const {register,handleSubmit, formState: {errors}, setValue} = useForm<FormValues>();

    useEffect(()=>{
        const fetchData = async () => {
            try {
                dispatch({type:'FETCH_RESQUEST'})
                const {data} = await axios.get(`/api/admin/products/${productId}`);
                dispatch({type:'FETCH_SUCCESS'})
                setValue('name', data.name);
                setValue('slug', data.slug);
                setValue('price', data.price);
                setValue('image', data.image);
                setValue('category', data.category);
                setValue('flavor', data.flavor);
                setValue('countInStock', data.countInStock);
                setValue('description', data.description);
            }catch (err){
                dispatch({type: 'FETCH_FAIL'})
            }
        }
        fetchData();
    },[productId, setValue])


     const uploadHandler = async (e:any, imageField:any = 'image') => {
        const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
        try{
            dispatch({type:'UPLOAD_REQUEST'});
            const { data:{ signature, timestamp }  } = await axios('/api/admin/cloudinary-sign');

            const file = e.target.files[0];
            const formData:any = new FormData();
            formData.append('file', file);
            formData.append('signature', signature);
            formData.append('timestamp', timestamp);
            formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
            const { data } = await axios.post(url, formData);

            dispatch({ type: 'UPLOAD_SUCCESS'});
            setValue(imageField, data.secure_url);
            toast.success('File upload successfully');

        }catch(err){
            dispatch({type:'UPLOAD_FAIL', payload: getError(err)});
            toast.error(getError(err));
        }
     }

    const submitHandler = async ({name, slug, price, category, image,  flavor, countInStock,description}:any) => {
       try{
        dispatch({type:'UPDATE_REQUEST'});
        await axios.put(`/api/admin/products/${productId}`, {
            name, slug, price, category, image, flavor, countInStock,description   
        });
        dispatch({type:'UPDATE_SUCCESS'});
        toast.success('Produto atualizado com sucesso!')
        router.push('/admin/products');
       }catch(err){
        dispatch({type:'UPDATE_FAIL', payload: getError(err)});
       }
    };
    
    return (
        <Layout title={`Produto: ${productId}`}>
            
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
                        <Link className='text-indigo' href='/admin/users'>Usuários</Link>
                    </li>
                    
                </ul>
                </div>
                <div className='md:col-span-3'>
                {loading ? (
                 <div>Loading...</div>
                 ): error ? (
                 <div className='alert-error'>{error}</div>
                 ):(
                    <form className='mx-auto max-screen-md' onSubmit={handleSubmit(submitHandler)}>
                            <h1 className='mb-4 text-3xl font-semibold'>{` Produto ${productId}`}</h1>
                            <div className='bg-white rounded-md bg-opacity-80 m-2 p-2'>
                            <div className='mb-4'>
                                <label htmlFor='name' >Nome</label>
                                <input 
                                type='text' 
                                className='w-full' 
                                id='name' 
                                autoFocus 
                                {...register('name',{required: 'Insira o nome do produto'})}
                                />
                               {errors.name && (<div className='text-red'>{errors.name.message}</div>)}
                            </div>
                            <div className='mb-4'>
                                <label htmlFor='price' >Slug</label>
                                <input 
                                type='text' 
                                className='w-full' 
                                id='slug' 
                                
                                {...register('slug',{required: 'Insira o slug do produto'})}
                                />
                               {errors.slug && (<div className='text-red'>{errors.slug.message}</div>)}
                            </div>
                            <div className='mb-4'>
                                <label htmlFor='price' >Preço</label>
                                <input 
                                type='text' 
                                className='w-full' 
                                id='price' 
                                
                                {...register('price',{required: 'Insira o preço do produto'})}
                                />
                               {errors.price && (<div className='text-red'>{errors.price.message}</div>)}
                            </div>
                            <div className='mb-4'>
                                <label htmlFor='image' >Imagem</label>
                                <input 
                                type='text' 
                                className='w-full' 
                                id='image' 
                                
                                {...register('image',{required: 'Insira a imagem do produto'})}
                                />
                               {errors.image && (<div className='text-red'>{errors.image.message}</div>)}
                            </div>
                            <div className='mb-4'>
                                <label htmlFor='imageFile'>Upload image</label>
                                <input type='file' className='w-full' id='imageFile' onChange={uploadHandler}/>
                                {loadingUpload && <div></div>}
                            </div>
                            <div className='mb-4'>
                                <label htmlFor='category' >Categoria</label>
                                <input 
                                type='text' 
                                className='w-full' 
                                id='category' 
                                
                                {...register('category',{required: 'Insira a categoria do produto'})}
                                />
                               {errors.category && (<div className='text-red'>{errors.category.message}</div>)}
                            </div>
                            <div className='mb-4'>
                                <label htmlFor='brand' >Sabor</label>
                                <input 
                                type='text' 
                                className='w-full' 
                                id='flavor' 
                                
                                {...register('flavor',{required: 'Insira o sabor do produto'})}
                                />
                               {errors.flavor && (<div className='text-red'>{errors.flavor.message}</div>)}
                            </div>
                            <div className='mb-4'>
                                <label htmlFor='countInStock' >Em Stock</label>
                                <input 
                                type='text' 
                                className='w-full' 
                                id='countInStock' 
                                
                                {...register('countInStock',{required: 'Insira a quantidade em stock do produto'})}
                                />
                               {errors.countInStock && (<div className='text-red'>{errors.countInStock.message}</div>)}
                            </div>
                            <div className='mb-4'>
                                <label htmlFor='image' >Descrição</label>
                                <input 
                                type='text' 
                                className='w-full' 
                                id='description' 
                                
                                {...register('description',{required: 'Insira a descrição do produto'})}
                                />
                               {errors.description && (<div className='text-red'>{errors.description.message}</div>)}
                            </div>
                            <div className='mb-4'>
                                <button disabled={loadingUpdate} className='primary-button'>
                                    {loadingUpdate ? 'Loading' : 'Update'}
                                </button>

                            </div>
                            <div className='mb-4'>
                                <Link href={`/admin/products`}></Link>
                            </div>
                         </div>
                    </form>
                 )}
                </div>
              </div>
            
        </Layout>
    )
}
AdminProductEditScreen.auth = {adminOnly: true};
export default AdminProductEditScreen