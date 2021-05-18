import { Home } from '@material-ui/icons';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

interface pHome {
    component ?: any,
    isPrivate : boolean,
    path : string,
    exact : boolean
}

const PrivateRoute : React.FC<pHome> = ({component: Component, isPrivate, ...rest}) : JSX.Element => {
    React.useEffect(() => {
        console.log(localStorage.getItem("token"));
        
    }, [])
    return (
        <Route {...rest}
            render = {props => (
                localStorage.getItem("token") !== null && isPrivate ?
                    <Component /> :
                    <Redirect to = "/login" />

            )}
        />   
        

    );
}

export default PrivateRoute;
