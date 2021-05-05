import React, {useReducer, useContext} from 'react';
import {MainReducer, MainContextState, MainContextPayload} from "../dispatchers/MainContext.reducer" 


interface MainContextReducer {
    state : MainContextState,
    dispatch : React.Dispatch<MainContextPayload>
}



let MainContext : React.Context<MainContextReducer>;

const MainProvider : React.FC = ({children}) : JSX.Element => {
    const [state, dispatch] = useReducer(MainReducer, {})

    MainContext = React.createContext<MainContextReducer>({state, dispatch}) 
    return (
        <MainContext.Provider value = {{state, dispatch}}>
            {children}
        </MainContext.Provider>
    );
}

export default MainProvider;
export function useMainContext() {
    return useContext<MainContextReducer>(MainContext)  
} 