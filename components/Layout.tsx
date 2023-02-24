import Head from "next/head";
import Link from "next/link";
import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from '../utils/Store'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useSession } from "next-auth/react";



const Layout = ({title, children}:any) => {
    const { status, data: session } = useSession();
    const { state, dispatch } = useContext(StoreContext)
    const { cart } = state
    const [cartItemsCount, setCartItemsCount] = useState(0)
    useEffect(()=>{
        setCartItemsCount(cart.cartItems.reduce((a:any,c:any)=> a + c.quantity,0))
    },[cart.cartItems]) 
    
    return(
        <>
          <Head>
                <title>{title ? title + '- Outfit Clothes':'Outfit Clothes'}</title>
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
                    <p className="p-2">{status === 'loading' ? (
                        'loading'
                        ) : session?.user ? (
                            session.user.name
                            ):(
                          <Link href="/login">
                          <p className="p-2">Login</p> 
                       </Link>
                    )}</p>
                  
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