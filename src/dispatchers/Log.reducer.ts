import {Actions} from "./LogSign.dispatcher"

interface StateLog {
    email: String,
    password: String
}

const reducerLog = (state: StateLog, payload: Actions) : StateLog => {
    switch (payload.action) {
        case "setEmail":
            return {...state, email : payload.email}
        
        case "setPass":
            return {...state, password : payload.pass}
        default:
            return state;
    }
}

export {reducerLog}