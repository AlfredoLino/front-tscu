
type Actions = { action : "setEmail", email: String } |
{ action : "setPass", pass: String } |
{ action : "setPassConf", passConf: String }

interface StateForm {

    email: String,
    password: String,
    passwordConf: String

}

const reducerSign = (state : StateForm, payload : Actions) : StateForm => {
    switch (payload.action) {
        case "setEmail":
            return {...state, email : payload.email}
        case "setPass":
            return {...state, password : payload.pass}
        case "setPassConf":
            return {...state, passwordConf : payload.passConf}
        default:
            return state
    }
}
export {reducerSign}
export type {Actions}