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



const Layout = ({title, children}:any) => {
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
         <div className="flex min-h-screen  flex-col justify-between">
            <header>
                <nav className="flex h-12 justify-between shadow-md items-center">
                    <Link href="/">
                        <p className="text-lg pl-2 font-bold">Outfit Store</p>
                    </Link>
                    <div className="flex"> 
                                    
                    <Link href="/cart">
                        <p className="p-2">Cart{cartItemsCount > 0 && (
                            <span className="ml-1 rounded-full bg-red-600 px-2 text-xs font-bold text-white">
                                {cartItemsCount}
                             </span>
                        )}</p>
                    </Link>
                    {status ===  'loading' ? (
                        ''
                        ) : session?.user ? (
                           <Menu as='div' className='relative inline-block p-2'>
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
            <footer className="flex h-10 justify-center items-center shadow-inner">
                <p className="font-semibold"><span>Copyright</span> &copy; 2023 Outfit Store</p>
             </footer>
        </div>
        </>
    )
}

export default Layout