import React, {useEffect, useState} from 'react'
import Blockly from '../Questions'
import { Grid, Divider, Typography } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import colors from '../Colors'
import UserSVG from './../assets/user.svg'
import {getToken} from '../auth'
import axios from '../../bd/client'
import { Redirect, useHistory } from "react-router-dom";

import { Line } from 'react-chartjs-2';
  
const useStyles = makeStyles((theme)=>({
}))

export default props =>{
    const classes = useStyles()
    const [dataPratica, setDataPratica] = useState([])
    const [dataTeorica, setDataTeorica] = useState([])
    const [max, setMax] = useState(0)
    useEffect(() => {
        const array = {}
        const array1 = {}
        axios.get('/getCountPontuacaoByUser/'+getToken()).then(response => {
            const dates = response.data
            for(let i = -7; 0 >= i; i++){    
                let j = 0
                var date = new Date();
                date.setDate(date.getDate()+i)
                if(date.getTime() < new Date(dates[0].data).getTime()){
                    array[date.getDate()+'/'+(date.getMonth()+1)] = 0
                    
                }
                else{
                    while(new Date(dates[j].data).getTime() <= date.getTime()){

                        j++;
                        if(j == dates.length)
                            break
                    }
                    array[date.getDate()+'/'+(date.getMonth()+1)] = dates[j-1].total
                    if(dates[j-1].total > max){
                        setMax(dates[j-1].total)
                    }

                }
                
            }
            setDataPratica(array)
            
        }).catch(err => {
            console.log(err)
        })
        
        axios.get('/getEnviosQuiz/'+getToken()).then(response => {
            const dates = response.data
            for(let i = -7; 0 >= i; i++){    
                let j = 0
                var date = new Date();
                date.setDate(date.getDate()+i)
                if(date.getTime() < new Date(dates[0].data).getTime()){
                    array1[date.getDate()+'/'+(date.getMonth()+1)] = 0
                    
                }
                else{
                    while(new Date(dates[j].data).getTime() <= date.getTime()){

                        j++;
                        if(j == dates.length)
                            break
                    }
                    array1[date.getDate()+'/'+(date.getMonth()+1)] = dates[j-1].total
                    if(dates[j-1].total > max){
                        setMax(dates[j-1].total)
                    }

                }
                
            }
            //console.log('ora ora amigo')
            //console.log(array1)
            setDataTeorica(array1)
            
        }).catch(err => {
            console.log(err)
        })

    },[]);
    
    return(
        <div>
            <Line data={{
                labels: Object.keys(dataPratica),
                datasets: [
                  {
                    label: 'Submissões',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor:'rgba(38, 100, 208, 0.6)',
                    borderColor: colors.blue,
                    data: Object.values(dataPratica)
                  },
                  {
                    label: 'Quiz',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor:'rgba(226, 5, 76, 0.6)',
                    borderColor: colors.red,
                    data: Object.values(dataTeorica)
                  }
                ]
                
            }}
            options={{
                scales: {
                    yAxes: [{
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: max+10
                        }
                    }]
                }
            }}
            // options = {{
                
            //     scale: {
                    
            //         ticks: {
            //             suggestedMax: 100,
            //             suggestedMin: 0
            //         }
            //     }
            // }}
            >
            </Line>    
        </div>
    )
}