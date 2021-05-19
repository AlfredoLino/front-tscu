import { InformeInterface } from "../../interfaces/InformeInterface";
import { server } from "../../ngrok_server";

export const getInformes = (setInformes : React.Dispatch<React.SetStateAction<InformeInterface[] | undefined>> ) => {
    fetch(`${server.adress}/getInformes/${localStorage.getItem("id")}`).then(res => res.json())
    .then(recs => {
        setInformes(recs.records)
    }).catch(err => {
        console.log(err);
    })
}


export const postInforme = async (texto : string) : Promise<boolean> => {
    try {
        const req = await fetch(`${server.adress}/postinforme`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                informe: texto,
                UsuarioId : localStorage.getItem("id")
            })
        })

        const res = await req.json()
        return res.ok
    } catch (error) {
        return false
    }
}