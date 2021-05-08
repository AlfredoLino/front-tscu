import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const SuccessBar : React.FC<any> = ( { successState, handler, children } ) : JSX.Element => {

    return (
    <Snackbar open = {successState} autoHideDuration = {6000} onClose = {handler}>
        <MuiAlert onClose = {handler} variant = "filled" severity = "success" color = "success" elevation = {6} >{children}</MuiAlert>
    </Snackbar>
    );

}

export default SuccessBar;
