import React, {useEffect} from 'react';
import Layout from './Layout/Layout';
import {Bar} from "react-chartjs-2"
import Avatar from '@material-ui/core/Avatar';
import {useHistory } from 'react-router-dom';
import {PhotoCamera, Publish} from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    selectPhotoButton : {borderTopRightRadius : "0", borderBottomRightRadius: "0"},
    upPhotoButton : {borderTopLeftRadius : "0", borderBottomLeftRadius: "0"}
})


const Home : React.FC = () : JSX.Element => {
    const fileRef = React.useRef<HTMLImageElement>(null)
    const styles = useStyles()
    const hist = useHistory()
    useEffect( () => {
        if(localStorage.getItem("token") == null)
            hist.push("/login")
    } )
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

    const inputFileOnCh = (e : React.ChangeEvent<HTMLInputElement>) => {
                        
        setProfilePic(e.target!.files![0])
        var reader = new FileReader()
        reader.readAsDataURL(e.target!.files![0])
        reader.onload = (ev : ProgressEvent<FileReader>) => {
            fileRef.current!.src = reader.result!.toString()
        }
    }
    
    const [profilePic, setProfilePic] = React.useState<File>();
    return (
        <Layout>
            <h1>Homepage</h1>
            <Avatar src = "http://localhost:8080/user/pp.jpg" style = {{height: "100px", width: "100px"}} />
            <div style = {{marginTop : "15px"}}>
                    <input onChange = {inputFileOnCh} style = {{display:'none'}} id = "pic-picker" accept = "image/*" type="file" name="example" />
                    <label htmlFor="pic-picker">
                        <Button className = {styles.selectPhotoButton} startIcon = {<PhotoCamera/>} component = "span" variant = "contained" color = "primary"
                         /*onClick = {(e) => {
                            
                            const formData = new FormData()
                            formData.append('perfil', fileRef.current!.files![0])

                            fetch("http://localhost:8080/upload/17070714", {
                                method: "POST",
                                body: formData
                            }).then(res => {
                                console.log(res);
                            }).catch( err => {
                                console.log(err)
                            })
                            
                        }}*/
                        > Seleccionar foto </Button>
                    </label>
                    <Button className = {styles.upPhotoButton} startIcon = {<Publish />} variant = "contained" color = "secondary" >Subir foto</Button>
            </div>
            
            <img style = {{height : "auto/2", width : "auto/2", marginTop : "15px"}} ref = {fileRef} src="" alt="" />
            <p>Alfredo Lino Mendoza</p>
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
            
            
            
        </Layout>
    );
}

export default Home;
