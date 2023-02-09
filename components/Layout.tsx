import Head from "next/head";
import React from "react";

const Layout = ({children}:any) => {
    return(
        <div>
            <header>
            <Head>
                <title>Outfit Store</title>
                <meta name="description" content="store of clothes"/>
                <link rel="icon" href="/ecommerce2.ico"/>
            </Head>
            </header>
            <main>
            {children}
            </main>
            <footer>
                footer
            </footer>
        </div>
    )
}

export default Layout