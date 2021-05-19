export const dateFormatter = (dateString : String) : string  => {
    
    const [fecha, horarw] = dateString.split("T")
    const hora = horarw.split(".")[0]
    return `${fecha}/${hora}`
}