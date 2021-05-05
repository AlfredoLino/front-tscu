import React from 'react';
import Navbar from "../Navbar"
import "../../styles/Main.css"
const Layout : React.FC = ({children}) : JSX.Element => {
    return (
        <div>
            <Navbar variant = "normal"/>
            <main className = "content-center">
                {children}
            </main>
        </div>
    );
}

export default Layout;
