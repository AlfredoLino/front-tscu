import React from 'react';
import Navbar from "./Navbar"
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {makeStyles} from "@material-ui/core/styles"
import {logProps} from "../interfaces/LogProps"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import "../styles/Login.css"
import { reducerLog } from '../dispatchers/Log.reducer';
import { useHistory } from 'react-router-dom';




const useStyles = makeStyles({
    txtfield: {
        width: "25em",
        marginTop: "5px",
        marginBottom : "5px"
    },
    btnLog: {
        marginTop: "5px"
    }
})



const Login : React.FC<logProps> = (props) : JSX.Element => {

    const history = useHistory()

    const classes = useStyles()
    const [open , setOpen] = React.useState<boolean>(false);

    const [state, dispatch] = React.useReducer(reducerLog, {

        email: "",
        password: ""
        
    })


    type inputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    
    const handlerEmail = (e : inputEvent) => {
        dispatch({action: "setEmail",  email : e.target.value})
    }

    const handlerPass = (e : inputEvent) => {
        dispatch({action: "setPass", pass : e.target.value})
    }

    type submitEvent = React.MouseEvent<HTMLButtonElement | MouseEvent>
    
    const handlerLog = async (e : submitEvent) => {
        e.preventDefault()
        try {
            const req = await fetch('http://localhost:8080/login', {
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
                history.push("/")

            }else{
                setOpen(true)
            }
        } catch (error) {
            
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
                <hr/>
                <div className = "lc-fields">
                    <form>
                        <TextField onChange = {handlerEmail} value = {state.email} className = {classes.txtfield} label = "Usuario" variant="outlined"/>
                        <TextField onChange = {handlerPass} value = {state.password} className = {classes.txtfield} label = "Contraseña" variant="outlined"/>
                        <Button type = "submit" className = {classes.btnLog} startIcon = {<ArrowForwardIcon />} 
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
