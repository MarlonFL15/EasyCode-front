import React, {useEffect, useState} from 'react'
import Blockly from '../Questions'
import { Grid, Divider, Typography } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import colors from '../Colors'
import UserSVG from './../assets/user.svg'
import {getToken} from '../auth'
import axios from '../../bd/client'
import { Redirect, useHistory } from "react-router-dom";

import { Bar, Chart } from 'react-chartjs-2';
  
const useStyles = makeStyles((theme)=>({
}))

export default props =>{
    const classes = useStyles()

    const [data, setData] = useState([])
    useEffect(() => {
       
        axios.get('/getHistoricByAssunto',{
            params: {
                assunto: props.assunto,
                idUsuario: getToken()
            }
        }).then(response => {
            console.log(response.data)
            setData(response.data)
        }).catch(err => {
            alert(err)
        })

    },[]);
    Chart.defaults.global.defaultFontFamily="Poppins";
    Chart.defaults.global.defaultFontColor="#000000";
    return(
        <div >
            <Bar 
           
            data={{
                labels: data,
                datasets: [
                  {
                    label: 'Submissões',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor:'rgba(38, 100, 208, 0.6)',
                    borderColor: colors.blue,
                    data: data
                  },
                ]
                
            }}
         
            options={{
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: '#666666',
                            suggestedMin: 0,
                            
                        }
                    }]
                },
                legend: {
                    position: 'right',
                    display: false,
                  },
            }}
            
            >
            </Bar>    
        </div>
    )
}