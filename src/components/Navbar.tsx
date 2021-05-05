import React from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {useHistory} from "react-router-dom"
import Button from "@material-ui/core/Button";
import "../styles/Navbar.css"
interface navProps {

    variant ?: "log" | "normal" | "signin"

}

const Navbar : React.FC<navProps> = (props) : JSX.Element => {

    const history = useHistory()

    const handlerLink = () =>{
        if(props.variant === "log")
            history.push("/sign")
        else
            history.push("/login")
    }

    return (
        <header>
            <nav>
                {props.variant !== "normal" ?  
                        <>
                            <div>
                                <p className = 'nav-title'>
                                    Assist-/ATAM/-
                                </p>
                                <p className = 'nav-subtitle'>Asistente durante el covid</p>
                            </div>
                            {props.variant === "log" && <Button onClick = {handlerLink} startIcon = {<ArrowForwardIcon />} color = 'secondary' variant = "text"  
                            size = "small" > Registrarse </Button> }
                            {props.variant === "signin" && <Button onClick = {handlerLink} startIcon = {<ArrowForwardIcon />} color = 'secondary' variant = "text"  
                            size = "small" > Iniciar </Button> }
                        </>
                    :
                        <>
                            <div>
                                <p className = 'nav-title'>
                                    Assit-/ATAM/-
                                </p>
                                <p className = 'nav-subtitle'>Asistente durante el covid</p>
                            </div>
                            <Button startIcon = {<ArrowForwardIcon />} color = 'secondary' variant = "text"  
                            size = "small" > Salir </Button>
                        </>
                }
            </nav>
        </header>
        
    );
}

export default Navbar;
