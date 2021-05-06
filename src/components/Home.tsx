import React, {useEffect} from 'react';
import Layout from './Layout/Layout';
import {Bar} from "react-chartjs-2"
import {useMainContext} from "../Hooks.custom/MainProvider"
const Home = () => {

    const mainProvider = useMainContext()
    useEffect( () => {
        console.log(mainProvider.state.token)
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

    return (
        <Layout>
            {mainProvider.state.token && <h1>{mainProvider.state.token}</h1>}
            <h1>Homepage</h1>
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
