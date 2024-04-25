import Head from "next/head";
import Link from "next/link";
import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from '../utils/Store'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { signOut, useSession } from "next-auth/react";
import { Menu } from '@headlessui/react'
import DropdownLink from "./DropdownLink";
import Cookies from "js-cookie";
import { BsInstagram } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";

import { FaCartArrowDown } from "react-icons/fa";
import { useTheme } from 'next-themes'
import ThemeToogle from "./ThemeToogle";



const Layout = ({title, children}:any) => {
  // eslint-disable-next-line no-unused-vars
  const { theme, setTheme } = useTheme()
    const { status, data: session }:any = useSession();
    const { state, dispatch } = useContext(StoreContext)
    const { cart } = state
    const [cartItemsCount, setCartItemsCount] = useState(0)

    useEffect(()=>{
        setCartItemsCount(cart.cartItems.reduce((a:any,c:any)=> a + c.quantity,0))
    },[cart.cartItems]) 


    const logoutClickHandler = () => {
        Cookies.remove('cart')
        dispatch({ type:'CART_RESET' })
        signOut({callbackUrl: '/login'})
    }
    
    return(
        <>
          <Head>
                <title>{title ? title + ' - Outfit Clothes':'Outfit Clothes'}</title>
                <meta name="description" content="store of clothes"/>
                <link rel="icon" href="/ecommerce2.ico"/>
            </Head>
            <ToastContainer position='bottom-center' limit={1} />
         <div className=" flex min-h-screen  flex-col justify-between">
         
            <header>
                <nav className="flex h-12 justify-between shadow-md items-center">
                    <Link href="/">
                        <p className="text-lg ml-3 pl-2 font-bold">Outfit Store</p>
                    </Link>
                    <div className="text-lg font-bold flex items-center"> 
                    <ThemeToogle/>
                    <Link href='/cart' className='p-2'>
                <div className=' flex justify-between py-3'>
                  <div className='hover:bg-rose p-2 rounded-full'>
                  <FaCartArrowDown />
                    </div>
                    <div>
                  {cart.cartItems.length > 0 && (
                    <span className='ml-1 rounded-full bg-indigo-500 px-2 text-xs font-bold text-white'>{cartItemsCount}</span>
                  )}
                  </div>
                  </div>
                  
                 </Link>

                 
                    {status ===  'loading' ? (
                        ''
                        ) : session?.user ? (
                           <Menu as='div' className='relative inline-block mr-3 p-2'>
                             <Menu.Button className='text-blue-600'>
                                {session.user.name}
                             </Menu.Button>
                             <Menu.Items className='absolute right-0 w-56 origin-top-right shadow-lg'>
                                <Menu.Item>
                                    <DropdownLink className='dropdown-link' href='/profile'>
                                        Profile
                                    </DropdownLink>
                                </Menu.Item>
                                <Menu.Item>
                                    <DropdownLink className='dropdown-link' href='/order-history'>
                                        Order History
                                    </DropdownLink>
                                </Menu.Item>
                                {session.user.isAdmin && (
                            <Menu.Item>
                            <DropdownLink className='dropdown-link' href="/admin/dashboard">
                              Painel Admin
                            </DropdownLink>
                            </Menu.Item>
                            )}
                                <Menu.Item>
                                    
                                        <Link className='dropdown-link' href='/#' onClick={logoutClickHandler} >
                                            Logout
                                        </Link>
                                        
                                    
                                </Menu.Item>
                             </Menu.Items>
                           </Menu>
                            ):(
                          <Link href="/login">
                          <p className="p-2">Login</p> 
                       </Link>
                    )}
                  
                    </div> 
                </nav>
            </header>
            <main className="container m-auto mt-4 px-4">
              {children}
            </main>
            <footer className='flex h-20 justify-between items-center shadow-inner bg-pink font-semibold '>
          <div className='flex justify-between px-4'>
          <span className='font-semibold'>Copyright </span> 
           <p className='px-1'> &copy; </p>2023 Outfit Store
          </div>
          <div className='flex justify-between px-2'>
            <Link className='flex px-1' href='https://www.instagram.com/'><BsInstagram/></Link>
            <Link className='flex px-3' href='https://api.whatsapp.com/send?phone=5571999999999&text=Ol%C3%A1,%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20produto'><BsWhatsapp/></Link>
          </div>
      
        </footer>
        </div>
        </>
    )
}

export default Layout