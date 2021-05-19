import React, {useEffect} from 'react';
import Layout from './Layout/Layout';
//import {Bar} from "react-chartjs-2"
import {useHistory } from 'react-router-dom';
import {PhotoCamera, Publish} from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { server } from '../ngrok_server';
import SuccessBar from './Bars/Success.bar';
import Bitacora from "./Bitacora"
import "../styles/Home.css"

const Home : React.FC = () : JSX.Element => {
    
    const fileRef = React.useRef<HTMLImageElement>(null)
    const uploadRef = React.useRef<HTMLInputElement>(null)
    const [photoUrl, setPhotoUrl] = React.useState( localStorage.getItem("pf") === 'null' ? `${server.adress}/nopicture.png`:`${server.adress}/user/${localStorage.getItem("pf")}` );
    const [isUpOk, setUpOk] = React.useState(false)
    const hist = useHistory()
    /*
    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
        
    };
    
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Another'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3, 12],
                backgroundColor: [
                    '#02475e',
                ],
                borderColor: [
                    
                    '#687980',
                    '#f3bda1',
                    '#fefecc'
                ],
                borderWidth: 5
            }
        ]
        
    }
    */
    const [isUploading, setUploading] = React.useState(false);

    const onUploadFile = () => {
        setUploading(true)
        const pFile = uploadRef.current!.files![0]
        const formData = new FormData()
        
            formData.append('perfil', pFile)
        
        console.log(uploadRef.current!.files![0].name)
        fetch(`${server.adress}/upload/${localStorage.getItem("id")}`, {
            method: "POST",
            body: formData
        }).then(res => {
            if(res.ok){
                localStorage.setItem("pf", `${localStorage.getItem("id")}${pFile.name}`)
                setPhotoUrl(`${server.adress}/user/${localStorage.getItem("pf")}`)
                fileRef.current!.src = `${server.adress}/user/${localStorage.getItem("pf")}`
                console.log(res)
                setUploading(false)
                setUpOk(true)
                setProfilePic(undefined)
            }
        }).catch( err => {
            console.log(err)
        })
        
    }

    const quitPhoto = () => {
        
        setPhotoUrl(`${server.adress}/user/${localStorage.getItem("pf")}`)
        setProfilePic(undefined)
    }
    
    const inputFileOnCh = (e : React.ChangeEvent<HTMLInputElement>) => {
        
        if(e.target!.files![0]){
            setProfilePic(e.target!.files![0])
            var reader = new FileReader()
            reader.readAsDataURL(e.target!.files![0])
            reader.onload = (ev : ProgressEvent<FileReader>) => {
                //fileRef.current!.src = reader.result!.toString()
                setPhotoUrl(reader.result!.toString())
            }
        }else{
            return
        }
    }
    
    const [profilePic, setProfilePic] = React.useState<File>();
    useEffect( () => {
        console.log(localStorage.getItem("pf") === 'null')
        if(localStorage.getItem("token") == null)
            hist.push("/login")
    } )

    const handlerSucc = () => {
        setUpOk(!isUpOk)
    }

    return (
        <Layout>
            <h1 className = "text-center">Homepage</h1>

            <img alt = "profilepick" ref = {fileRef} style = {{height: "200px", width:"200px"}} className = "avatar" src = { photoUrl } />
            
            <h3 className = "text-center">{localStorage.getItem("nombre")}</h3>
            <p className = "text-center"> <i>{localStorage.getItem("email")}</i> </p>

            <div style = {{marginTop : "15px"}}>
                    <input onChange = {inputFileOnCh} disabled = {isUploading} style = {{display:'none'}} ref = {uploadRef} id = "pic-picker" accept = "image/*" type="file" name="example" />
                    <label htmlFor="pic-picker">
                        <Button disabled = {isUploading} className = "picker_photo" startIcon = {<PhotoCamera/>} component = "span" variant = "contained" color = "primary"> Seleccionar foto </Button>
                    </label>
                    <Button className = "upload_photo" onClick = {onUploadFile} disabled = {profilePic && !isUploading  ? false : true} startIcon = {<Publish />} variant = "contained" color = "secondary" >{isUploading ? "Subiendo foto..." : "Subir Foto"}</Button>
                    <Button className = "cancel_photo" variant = "contained" color = "primary" onClick = {quitPhoto} disabled = {profilePic && !isUploading  ? false : true} > Cancelar </Button>
            </div>
            
            {profilePic && 
            <div className = "photo-p-container">
                <img alt = "pickedphoto" className = "profile_photo" />
                
                

            </div>
            }

            <hr />

            <Bitacora photo = {photoUrl} />
            
            <SuccessBar successState = {isUpOk} handler = {handlerSucc}> Imagen subida con exito </SuccessBar>

            

            {/** 
             * 
             <div className="plot">
                <Bar
                    options = {options}
                    type = 'bar'
                    data = {data} 
                    height = {150}
                    width = {300}
                    color = '#000'
                />


            </div>
            

            */}
            
            
            
            
        </Layout>
    );
}

export default Home;
