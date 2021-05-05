import React from 'react';
import ReactDom from "react-dom"
import Button from "@material-ui/core/Button";
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import {useStyles} from "./Signin"
const ConfirmReg = () => {
    const classes = useStyles()
    return ReactDom.createPortal (
        <div className="modal">

                    <h3>Seguro que quiere proceder</h3>
                    <div className = "modal-ops">
                        <Button 
                                className = {classes.btnMod} 
                                startIcon = {<ArrowUpwardRoundedIcon />} 
                                color = 'secondary' variant = "contained" size = "large" > Cancelar
                        </Button>
                        
                        <Button 
                                className = {classes.btnMod} 
                                startIcon = {<ArrowUpwardRoundedIcon />} 
                                color = 'secondary' variant = "contained" size = "large" > Registrarse
                        </Button>
                    </div>
                </div>
                ,
                document.getElementById("portal") as HTMLElement
    );
}

export {ConfirmReg};