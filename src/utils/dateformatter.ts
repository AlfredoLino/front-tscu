export const dateFormatter = (date : Date) : string  => {
    let dateString = date.toISOString()
    return `${dateString.split("T")[0]}/${date.toTimeString().split(" ")[0]}`
}