import { Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import React from 'react';
import Informe from "./Informe"
import {dateFormatter} from "../utils/dateformatter"
import {InformeInterface} from "../interfaces/InformeInterface"
import "../styles/Bitacora.css"
import { getInformes, postInforme } from './ComponentUtils/Bitacora';
import { inputEvent, submitEvent } from '../types/InputTypes';

interface BitacoraInterface {
    photo : string
}

const Bitacora : React.FC<BitacoraInterface> = ( {photo} ) : JSX.Element => {




    const [informes, setInformes] = React.useState<InformeInterface[]>();
    const [informe, setInforme] = React.useState<string>("")
    
    const onChangeInforme = (e : inputEvent) => {
        setInforme(e.target.value)
    }

    const onSubmitInforme = (e : submitEvent) => {
        e.preventDefault()
        postInforme(informe).then(ok => {
            getInformes(setInformes)
            setInforme("")
        }).catch(err => {
            console.log(err)
        })
    } 

    React.useEffect(() => {
        getInformes(setInformes);
    },[])
    
    return (
        <>
            <h1 className = "title-bitacora">Bitacora: </h1>
            <form>
                <TextField value = {informe} onChange = {onChangeInforme} fullWidth className = "input-informe"  variant = "outlined" label = "Nuevo informe" multiline rows = {4} />
                <Button onClick = {onSubmitInforme} className = "submit-form" type = "submit" variant = "contained" >Crear Informe</Button>
            </form>
            <ul>
                <li>
                    {informes && informes!.map((rec) => <Informe content = {rec.informe} photo = {photo} date = {dateFormatter(rec.createdAt)} />)}
                </li>

            </ul>
        </>
    );
}

export default Bitacora;
