import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import React from 'react';
import Informe from "./Informe"
import {dateFormatter} from "../utils/dateformatter"
import "../styles/Bitacora.css"


interface BitacoraInterface {
    photo : string
}

const Bitacora : React.FC<BitacoraInterface> = ( {photo} ) : JSX.Element => {
    
    const date = dateFormatter(new Date())
    return (
        <>
        <h1 className = "title-bitacora">Bitacora: </h1>
        <form>
            <TextField fullWidth className = "input-informe"  variant = "outlined" label = "Nuevo informe" multiline rows = {4} />
            <Button className = "submit-form" type = "submit" variant = "contained" >Crear Informe</Button>

        </form>
        <ul>
            <li>
                <Informe photo = {photo} date = {date} />
            </li>

        </ul>
        </>
    );
}

export default Bitacora;
