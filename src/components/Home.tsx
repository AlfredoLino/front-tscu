import React, {useEffect} from 'react';
import Layout from './Layout/Layout';
//import {Bar} from "react-chartjs-2"
import Avatar from '@material-ui/core/Avatar';
import {useHistory } from 'react-router-dom';
import {PhotoCamera, Publish, Cancel} from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { server } from '../ngrok_server';
import IconButton from '@material-ui/core/IconButton';
import "../styles/Home.css"

const Home : React.FC = () : JSX.Element => {

    const fileRef = React.useRef<HTMLImageElement>(null)
    const uploadRef = React.useRef<HTMLInputElement>(null)
    const hist = useHistory()
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

    const onUploadFile = () => {
                            
        const formData = new FormData()
        formData.append('perfil', uploadRef.current!.files![0])

        fetch(`${server.adress}/upload/17070714`, {
            method: "POST",
            body: formData
        }).then(res => {
            console.log(res);
        }).catch( err => {
            console.log(err)
        })
        
    }

    const quitPhoto = () => {
        setProfilePic(undefined)
    }
    
    const inputFileOnCh = (e : React.ChangeEvent<HTMLInputElement>) => {
        
        setProfilePic(e.target!.files![0])
        var reader = new FileReader()
        reader.readAsDataURL(e.target!.files![0])
        reader.onload = (ev : ProgressEvent<FileReader>) => {
            fileRef.current!.src = reader.result!.toString()
        }
    }
    

    const [profilePic, setProfilePic] = React.useState<File>();
    useEffect( () => {
        if(localStorage.getItem("token") == null)
            hist.push("/login")
    } )
    return (
        <Layout>
            <h1 className = "text-center">Homepage</h1>

            <Avatar style = {{height: "200px", width:"200px"}} className = "avatar" src = {`${server.adress}/user/pp.jpg`} />
            
            <p className = "text-center">Alfredo Lino Mendoza</p>
            <div style = {{marginTop : "15px"}}>
                    <input onChange = {inputFileOnCh} style = {{display:'none'}} ref = {uploadRef} id = "pic-picker" accept = "image/*" type="file" name="example" />
                    <label htmlFor="pic-picker">
                        <Button className = "picker_photo" startIcon = {<PhotoCamera/>} component = "span" variant = "contained" color = "primary"> Seleccionar foto </Button>
                    </label>
                    <Button className = "upload_photo" onClick = {onUploadFile} disabled = {profilePic ? false : true} startIcon = {<Publish />} variant = "contained" color = "secondary" >Subir foto</Button>
            </div>
            
            {profilePic && 
            <div className = "photo-p-container">
                <img className = "profile_photo" ref = {fileRef} />
                <IconButton onClick = {quitPhoto} className = "a-button"  > <Cancel /> </IconButton>
                

            </div>
            }
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
