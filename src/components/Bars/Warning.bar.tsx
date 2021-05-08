import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
const WarningBar : React.FC<any> = ({errorState, handler, children}) : JSX.Element => {
    return (
        <Snackbar open = {errorState} autoHideDuration = {6000} onClose = {handler}>
            <MuiAlert onClose = {handler} variant = "filled" severity = "error" color = "error" elevation = {6} > {children} </MuiAlert>        
        </Snackbar>
        
    );
}

export default WarningBar;
