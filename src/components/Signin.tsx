import React, {useReducer} from 'react';
import Navbar from "./Navbar"
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import CloseIcon from '@material-ui/icons/Close';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import WarningBar from "./Bars/Warning.bar"
import SuccessBar from "./Bars/Success.bar"
import {Link} from "react-router-dom"
import {makeStyles} from "@material-ui/core/styles"
import {reducerSign} from "../dispatchers/LogSign.dispatcher"
import { useHistory } from 'react-router-dom'
import {server} from "../ngrok_server"
import "../styles/Signin.css"
const useStyles = makeStyles({
    
    btnLog: {
        marginTop: "5px"
    },
    btnMod: {
        margin: "15px"
    }
})

interface logProps {
    regVariant : "normal" | "log" | "signin"
}

const Signin : React.FC<logProps> = (props) : JSX.Element => {
    const classes = useStyles()
    const history = useHistory()
    const [state, dispatch] = useReducer(reducerSign, {
        email: "",
        nombre: "",
        password: "",
        passwordConf: ""

    })
    const [openError, setOpenError] = React.useState(false);
    const [openSuccess, setOpenSuccess] = React.useState(false);
    const onSubmit = async (e : any) => {
        e.preventDefault()
        try {
            const req = await fetch(`${server.adress}/signin`,{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    email: state.email,
                    pass: state.password,
                    nombre: state.nombre
                }
                )
            })
            const data = await req.json()
            if(data.ok){
                setOpenSuccess(true);
            }else{
                console.log("OPenSnack")
                setOpenError(true)
                
            }
        } catch (error) {
            setOpenError(true)
        }
        
    } 

    const checkPassLength = () : JSX.Element => state.password.length >= 8 ? <CheckRoundedIcon color = "primary" /> : <CloseIcon color = "error" />

    const checkEmail = () : JSX.Element => state.email.includes("@")  ? <CheckRoundedIcon color = "primary" /> : <CloseIcon color = "error" />

    const checkNombre = () : JSX.Element => state.nombre.length >= 3  ? <CheckRoundedIcon color = "primary" /> : <CloseIcon color = "error" />
    
    const checkPass = () : JSX.Element => state.password === state.passwordConf && state.password.length >= 8 
    ? <CheckRoundedIcon color = "primary" /> : <CloseIcon color = "error" />

    type inputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

    const handlerEmail = (e: inputEvent) => 
    {
        dispatch({action: "setEmail", email: e.target.value})
    }
    const handlerNombre = (e: inputEvent) => 
    {
        dispatch({action: "setNombre", nombre: e.target.value})
    }
    const handlerPass = (e: inputEvent) => 
    {
        console.log("passEvent")
        dispatch({action: "setPass", pass: e.target.value})
    }
    const handlerPassConf = (e: inputEvent) => 
    {
        dispatch({action: "setPassConf", passConf: e.target.value})
    }

    const formIsOk = () : boolean => !(state.password.length >= 8 &&  (state.email.includes("@")) && state.password === state.passwordConf)

    

    const handlerWarning = () => {
        setOpenError(!openError)
    }
    const handlerSuccess = () => {
        setOpenSuccess(!openSuccess)
    }

    return (
        <>
        {/** Redireccion a la pagina principal si el token ya está en el LocalStorage */}

        {localStorage.getItem("token") && history.push("/") }

        {/* JSX */}
        <Navbar variant = {props.regVariant} />
            <div className = "sign-card">
                <div className = "lc-body">
                    <h3 className = "lc-title">
                    <ArrowUpwardRoundedIcon />
                    Registrarse</h3>
                </div>
                <div className="logo-containt">
                    
                    <img className = "logo" src={`${server.adress}/covidatam.png`} alt="logo" />
                </div>
                <hr/>
                <div className = "lc-fields">
                    <form>
                        <TextField value = {state.email} onChange = {handlerEmail} 
                            className = "txtfield" label = "Email" variant="outlined"/>
                        <TextField value = {state.nombre} onChange = {handlerNombre} 
                            className = "txtfield" label = "Nombre" variant="outlined"/>
                        <TextField value = {state.password} onChange = {handlerPass} 
                            type = "password" className = "txtfield" label = "Contraseña" variant="outlined"/>
                        <TextField value = {state.passwordConf} onChange = {handlerPassConf} 
                            type = "password" className = "txtfield" label = "Confirmar Contraseña" variant="outlined"/>
                        <p> {checkPassLength()} Contraseña con almenos 8 caracteres.</p>
                        <p> {checkPass()} Contraseñas iguales.</p>
                        <p> {checkEmail()} Email válido.</p>
                        <p>{checkNombre()} Nombre</p>
                
                        <Button 
                            disabled = {formIsOk()}
                            onClick = {onSubmit}
                            type = "submit"
                            className = "submit_b"
                            startIcon = {<ArrowUpwardRoundedIcon />} 
                            color = 'primary' variant = "contained" size = "large" > Registrarse
                        </Button>
                    </form>
                    
                </div>
                {/* SnackBars */}
                <WarningBar errorState = {openError} handler = {handlerWarning} > ERROR: El correo ya ha sido registrado previamente en nuestra página. </WarningBar>
                <SuccessBar successState = {openSuccess} handler = {handlerSuccess} >Registro con exito. Ahora puede <Link style = {{color: "#f3bda1"}} to = "/login">iniciar sesion </Link>.</SuccessBar>
            </div>
        </>
    );
}

export default Signin;
export {useStyles}