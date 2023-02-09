import React from "react";

const Layout = ({children}:any) => {
    return(
        <div>
            <header>
            Header
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