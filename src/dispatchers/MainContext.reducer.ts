interface MainContextState {
    token ?: undefined | String,
    usuario ?: undefined | String,
    email ?: undefined | String
}

type MainContextPayload = 
    {action : "setToken", token: String} |
    {action : "setUsuario", Usuario: {email: String, usuario: String}}


const MainReducer = (state: MainContextState, payload: MainContextPayload) : MainContextState => {
    switch (payload.action) {
        case "setToken":
            return {...state, token : payload.token}
        case "setUsuario":
            return {...state, email: payload.Usuario.email, usuario : payload.Usuario.usuario }
        default:
            return {...state}
    }
}

export {MainReducer}
export type {MainContextState, MainContextPayload}