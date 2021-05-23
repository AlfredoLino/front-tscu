import React from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {useHistory} from "react-router-dom"
import Button from "@material-ui/core/Button";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Drawer, List, ListItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import "../styles/Navbar.css"
import IconButton from '@material-ui/core/IconButton';
import { server } from '../ngrok_server';
interface navProps {

    variant ?: "log" | "normal" | "signin",
    handler ?: any

}

const Navbar : React.FC<navProps> = (props) : JSX.Element => {

    const history = useHistory()

    const handlerLink = () =>{
        if(props.variant === "log")
            history.push("/sign")
        else
            history.push("/login")
    }
    const [drawer, setDrawer] = React.useState(false);
    const handlerDrawer = () => {
        setDrawer(!drawer)
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("nombre");
        localStorage.removeItem("pf")
        localStorage.removeItem("id")
        history.push("/login")
    }
    return (
        <>
        <header>
            <nav>
                {props.variant !== "normal" ?  
                        <>
                            <div>
                                <p className = 'nav-title'>
                                    Assist-/ATAM/-
                                </p>
                                <p className = 'nav-subtitle'>Asistente durante el covid <span><i>v{server.version}</i></span> </p>
                            </div>
                            {props.variant === "log" && <Button onClick = {handlerLink} startIcon = {<ArrowForwardIcon />} color = 'secondary' variant = "text"  
                            size = "small" > Registrarse </Button> }
                            {props.variant === "signin" && <Button onClick = {handlerLink} startIcon = {<ArrowForwardIcon />} color = 'secondary' variant = "text"  
                            size = "small" > Iniciar </Button> }
                        </>
                    :
                        <>
                            <div className = 'normal__nav'>
                                <button onClick = {handlerDrawer} id = 'button__nav'><MenuIcon/></button>
                                <div>
                                    <p className = 'nav-title'>
                                        
                                        Assit-/ATAM/-
                                    </p>
                                    <p className = 'nav-subtitle'>Asistente durante el covid <span><i>v{server.version}</i></span></p>
                                </div>
                            </div>
                            <Button onClick = {logout} startIcon = {<ArrowForwardIcon />} color = 'secondary' variant = "text"  
                            size = "small" > Salir </Button>
                        </>
                }
            </nav>
        </header>
        <Drawer open = {drawer} anchor = 'left' onClose = {handlerDrawer}>
            <List>
                <ListItem>
                    <TextField placeholder = "#Codigo de amigo" />
                    <IconButton><SearchIcon/> </IconButton>
                </ListItem>
            </List>
        </Drawer>
        </>
    );
}

export default Navbar;
