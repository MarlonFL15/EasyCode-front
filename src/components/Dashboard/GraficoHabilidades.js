import React, {useEffect, useState} from 'react'
import Blockly from '../Questions'
import { Grid, Divider, Typography } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import colors from '../Colors'
import UserSVG from './../assets/user.svg'
import {getToken} from '../auth'
import axios from '../../bd/client'
import { Redirect, useHistory } from "react-router-dom";
import {getLogin} from '../auth'
import { Radar, Chart } from 'react-chartjs-2';
  
const useStyles = makeStyles((theme)=>({
}))

export default props =>{
    const classes = useStyles()
    const [dataPratica, setDataPratica] = useState([])
    const [dataTeorica, setDataTeorica] = useState([])
    useEffect(() => {
        axios.get('getPontuacaoByUser/'+getToken()).then(response =>{
            const user = response.data
            const data = {}
            const data1 = {}
            axios.get('getPontuacaoTotal').then(response =>{
                const total = response.data
                Object.keys(total).map(el => {
                    if(user[el])
                        data[el] = user[el]/total[el]*100
                    else
                        data[el] = 0
                })
                setDataPratica(data)


                axios.get('getPontuacaoQuiz/'+getToken()).then(response => {
                    const userQuiz = response.data
                    console.log('valor do userquiz: ')
                    console.log(userQuiz)
                    Object.keys(total).map(el => {
                        if(userQuiz[el])
                            data1[el] = userQuiz[el]
                        else
                            data1[el] = 0
                    })   
                    console.log(data1) 
                    setDataTeorica(data1)
                }).catch(err => {
                    console.log('erro')
                })

            })
        })

        
    },[]);

    Chart.defaults.global.defaultFontFamily="Poppins";
    Chart.defaults.global.defaultFontColor="#000000";

    return(
        <div>
            <Radar
            style={{
            }}
            data={{
                fill:false,
                labels: Object.keys(dataPratica),
                
                datasets: [
                    {
                        label:'Habilidades Práticas',
                        data: Object.values(dataPratica),
                        backgroundColor:'rgba(38, 100, 208, 0.6)',
                        borderColor: colors.blue
                    
                    },
                    {
                         label:'Habilidades Teóricas',
                         data: Object.values(dataTeorica),
                         backgroundColor:'rgba(226, 5, 76, 0.6)',
                         borderColor: colors.red
                    }
                ],
                
            }}
            options = {{
                legend: {
                    position: 'right',
                    display: false,
                    labels: {
                        fontFamily: "Poppins",
                        fontColor: '#1b1c1a',
                        fontWeight: 'bold'
                    }
                  },
                scale: { 
                    width: 1000, 
                    ticks: {
                        suggestedMax: 100
                    }
                },
                layout: {
                    
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 10
                    }
                }
            }}
                
                
                >
            </Radar>    
        </div>
    )
}