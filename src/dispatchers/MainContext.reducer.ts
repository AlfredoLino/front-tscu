import { SocketOptions } from "socket.io-client"
import { DefaultEventsMap } from "socket.io-client/build/typed-events"
import {Socket} from "socket.io-client"
interface MainContextState {
    token ?: undefined | String,
    usuario ?: undefined | String,
    email ?: undefined | String
    socketcon ?: Socket
}

type MainContextPayload = 
    {action : "setToken", token: String} |
    {action : "setUsuario", Usuario: {email: String, usuario: String}} |
    {action : "setSocket", socket: Socket}


const MainReducer = (state: MainContextState, payload: MainContextPayload) : MainContextState => {
    switch (payload.action) {
        case "setToken":
            return {...state, token : payload.token}
        case "setSocket":
            return {...state, socketcon : payload.socket}
        case "setUsuario":
            return {...state, email: payload.Usuario.email, usuario : payload.Usuario.usuario }
        default:
            return {...state}
    }
}

export {MainReducer}
export type {MainContextState, MainContextPayload}