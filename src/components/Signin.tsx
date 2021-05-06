import React, {useReducer} from 'react';
import Navbar from "./Navbar"
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import CloseIcon from '@material-ui/icons/Close';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from "@material-ui/core/styles"
import {reducerSign} from "../dispatchers/LogSign.dispatcher"
import { useHistory } from 'react-router-dom';
import "../styles/Signin.css"
const useStyles = makeStyles({
    txtfield: {
        width: "25em",
        marginTop: "5px",
        marginBottom : "5px"
    },
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
        password: "",
        passwordConf: ""

    })

    const onSubmit = async (e : any) => {
        e.preventDefault()
        try {
            const req = await fetch("http://localhost:8080/signin",{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    email: state.email,
                    pass: state.password
                }
                )
            })
            const data = await req.json()
            if(data.ok){
                console.log("here")
                console.log(data)
            }else{
                console.log("OPenSnack")
                setOpen(true)
                
            }
        } catch (error) {
            console.log("ERROR")
        }
        
    } 

    const checkPassLength = () : JSX.Element => state.password.length >= 8 ? <CheckRoundedIcon color = "primary" /> : <CloseIcon color = "error" />

    const checkEmail = () : JSX.Element => state.email.includes("@")  ? <CheckRoundedIcon color = "primary" /> : <CloseIcon color = "error" />
    
    const checkPass = () : JSX.Element => state.password === state.passwordConf && state.password.length >= 8 
    ? <CheckRoundedIcon color = "primary" /> : <CloseIcon color = "error" />

    type inputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

    const handlerEmail = (e: inputEvent) => 
    {
        dispatch({action: "setEmail", email: e.target.value})
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

    const [open, setOpen] = React.useState(false);

    const handlerWarning = () => {
        setOpen(!open)
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
                <hr/>
                <div className = "lc-fields">
                    <form>
                        <TextField value = {state.email} onChange = {handlerEmail} 
                            className = {classes.txtfield} label = "Usuario" variant="outlined"/>
                        <TextField value = {state.password} onChange = {handlerPass} 
                            type = "password" className = {classes.txtfield} label = "Contraseña" variant="outlined"/>
                        <TextField value = {state.passwordConf} onChange = {handlerPassConf} 
                            type = "password" className = {classes.txtfield} label = "Confirmar Contraseña" variant="outlined"/>
                        <p> {checkPassLength()} Contraseña con almenos 8 caracteres.</p>
                        <p> {checkPass()} Contraseñas iguales.</p>
                        <p> {checkEmail()} Email válido.</p>
                
                        <Button 
                            disabled = {formIsOk()}
                            onClick = {onSubmit}
                            type = "submit"
                            className = {classes.btnLog} 
                            startIcon = {<ArrowUpwardRoundedIcon />} 
                            color = 'primary' variant = "contained" size = "large" > Registrarse
                        </Button>
                    </form>
                    
                </div>
                <Snackbar open = {open} autoHideDuration = {6000} onClose = {handlerWarning}>
                    <MuiAlert onClose = {handlerWarning} variant = "filled" severity = "error" color = "error" elevation = {6} > ERROR: El correo ya ha sido registrado previamente en nuestra página. </MuiAlert>
                    
                </Snackbar>
            </div>
        </>
    );
}

export default Signin;
export {useStyles}