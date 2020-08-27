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
import { Radar } from 'react-chartjs-2';
  
const useStyles = makeStyles((theme)=>({
}))

export default props =>{
    const classes = useStyles()
    const [data, setData] = useState([])
    useEffect(() => {
        // Atualiza o titulo do documento usando a API do browser
        axios.get('getPontuacaoByUser/'+getToken()).then(response =>{
            const user = response.data
            const data = {}
            axios.get('getPontuacaoTotal').then(response =>{
                const total = response.data
                Object.keys(total).map(el => {
                    if(user[el])
                        data[el] = user[el]/total[el]*100
                    else
                        data[el] = 0
                })
                setData(data)
            })
        })

    },[]);

    
    

    return(
        <div>
            
            <Radar
            data={{
                fill:false,
                labels: Object.keys(data),
                
                datasets: [{
                    label:'Suas habilidades',
                    data: Object.values(data),
                    backgroundColor:'rgba(38, 100, 208, 0.6)',
                    borderColor: colors.blue
                    
                }],
                
            }}
            options = {{
                legend: {
                    position: 'top'
                  },
                scale: {
                    
                    ticks: {
                        suggestedMax: 100
                    }
                }
            }}
            backgroundColor={'white'}
                
                
                >
            </Radar>    
        </div>
    )
}