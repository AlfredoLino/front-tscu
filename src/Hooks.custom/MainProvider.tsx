import React, {useReducer, useContext} from 'react';
import {MainReducer, MainContextState, MainContextPayload} from "../dispatchers/MainContext.reducer" 


interface MainContextReducer {
    state ?: MainContextState,
    dispatch ?: React.Dispatch<MainContextPayload>
}

const MainContext : React.Context<MainContextReducer> = React.createContext<MainContextReducer>({}) 



const MainProvider : React.FC = ({children}) : JSX.Element => {
    const [state, dispatch] = useReducer(MainReducer, {})
    return (
        <MainContext.Provider value = {{state, dispatch}}>
            {children}
        </MainContext.Provider>
    );
}

export default MainProvider;
export function useMainContext() {
    return useContext(MainContext)  
} 