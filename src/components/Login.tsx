import React from 'react';
import Navbar from "./Navbar"
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {logProps} from "../interfaces/LogProps"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import "../styles/Login.css"
import { reducerLog } from '../dispatchers/Log.reducer';
import { useHistory } from 'react-router-dom';
import {server} from "../ngrok_server";
import { inputEvent, submitEvent } from '../types/InputTypes';




const Login : React.FC<logProps> = (props) : JSX.Element => {

    const history = useHistory()

    const [open , setOpen] = React.useState<boolean>(false);

    const [state, dispatch] = React.useReducer(reducerLog, {

        email: "",
        password: ""
        
    })
    React.useEffect(() => {
        console.log(localStorage.getItem("id") == null);
    }, [])

    
    const handlerEmail = (e : inputEvent) => {
        dispatch({action: "setEmail",  email : e.target.value})
    }

    const handlerPass = (e : inputEvent) => {
        dispatch({action: "setPass", pass : e.target.value})
    }

    
    const handlerLog = async (e : submitEvent) => {
        e.preventDefault()
        try {
            const req = await fetch(`${server.adress}/login`, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    email : state.email,
                    pass : state.password
                })
            })
            const res = await req.json()
            console.log(res)
            if(res.ok){
                
                localStorage.setItem("token", res.token)
                localStorage.setItem("email", res.email)
                localStorage.setItem("nombre", res.nombre)
                localStorage.setItem("id", res.id)
                localStorage.setItem("pf", res.pf)
                history.push("/")

            }else{
                setOpen(true)
            }
        } catch (error) {
            console.log("Error catch", error)
            setOpen(true)
        }
    }

    const handlerWarning = () => {
        setOpen(!open)
    }
    return (
        <>
        
        {/** Redireccion a la pagina principal si el token ya está en el LocalStorage */}

        {localStorage.getItem("token") && history.push("/") }

        {/* JSX */}

        <Navbar variant = {props.regVariant} />
            <div className = "login-card">
                <div className = "lc-body">
                    <h3 className = "lc-title">
                        <ArrowForwardIcon />
                        Login
                    </h3>
                </div>
                <div className="logo-containt">
                    
                    <img className = "logo" src= {`${server.adress}/covidatam.png`} alt="logo" />
                </div>
                <hr/>
                <div className = "lc-fields">
                    <form>
                        <TextField onChange = {handlerEmail} value = {state.email} className = "txtfield" label = "Usuario" variant="outlined"/>
                        <TextField onChange = {handlerPass} value = {state.password} className = "txtfield" label = "Contraseña" variant="outlined"/>
                        <Button type = "submit" className = "submit_b" startIcon = {<ArrowForwardIcon />} 
                        color = 'primary' variant = "contained" size = "large" 
                        onClick = {handlerLog}
                        > Entrar </Button>
                    </form>
                </div>
            </div>
            <Snackbar open = {open} autoHideDuration = {6000} onClose = {handlerWarning}>
                <MuiAlert onClose = {handlerWarning} variant = "filled" severity = "error" color = "error" elevation = {6} > ERROR AL INICIAR SESION EN LA PAGINA </MuiAlert>
                    
            </Snackbar>
        </>
    );
}

export default Login;
