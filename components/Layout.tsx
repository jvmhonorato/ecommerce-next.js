import Head from "next/head";
import Link from "next/link";
import React, { useContext } from "react";
import { StoreContext } from '../utils/Store'



const Layout = ({title, children}:any) => {
    const { state, dispatch } = useContext(StoreContext)
    const { cart } = state
    
    return(
        <>
          <Head>
                <title>{title ? title + '- Outfit Clothes':'Outfit Clothes'}</title>
                <meta name="description" content="store of clothes"/>
                <link rel="icon" href="/ecommerce2.ico"/>
            </Head>
         <div className="flex min-h-screen  flex-col justify-between">
            <header>
                <nav className="flex h-12 justify-between shadow-md items-center">
                    <Link href="/">
                        <p className="text-lg pl-2 font-bold">Outfit Store {cart.cartItems.length}</p>
                    </Link>
                    <div className="flex"> 
                                    
                    <Link href="/cart">
                        <p className="p-2">Cart{cart.cartItems.length > 0 && (
                            <span className="ml-1 rounded-full bg-red-600 px-2 text-xs font-bold text-white">
                                {cart.cartItems.reduce((a:any,c:any)=> a + c.quantity,0)}
                             </span>
                        )}</p>
                    </Link>
                    <Link href="/login">
                       <p className="p-2">Login</p> 
                    </Link>
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