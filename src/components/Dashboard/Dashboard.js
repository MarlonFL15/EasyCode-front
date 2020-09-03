import React, { useEffect, useState } from 'react'
import Blockly from '../Questions'
import { Grid, Divider, Typography, LinearProgress, Box } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import colors from '../Colors'
import UserSVG from './../assets/user.svg'
import { getToken } from '../auth'
import axios from '../../bd/client'
import CodeIcon from '@material-ui/icons/Code';
import { Redirect, useHistory } from "react-router-dom";
import GraficoHabilidade from './GraficoHabilidades';
import GraficoSubmissoes from './GraficoSubmissoes'
import CheckIcon from '@material-ui/icons/Check';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

const Percentual = withStyles({
    root: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        '& .MuiLinearProgress-barColorPrimary': {
            backgroundColor: '#fff',
        }
    }
})(LinearProgress);

const Text = withStyles({
    root: {
        fontFamily: 'Quicksand, sans-serif'
    },
})(Typography);

const useStyles = makeStyles((theme) => ({
    top: {
        height: '50%',
        minHeight: 280,
        backgroundColor: colors.blue,
        borderRadius: 10,
        padding: 15,
        margin: 6,
        color: '#fff',
        textAlign: 'center',
        '& img': {
            height: 100,
            marginTop: 10
        }
    },
    bottom: {
        backgroundColor: colors.blue,
        height: '30%',
        color: '#fff',
        padding: 15,
        minHeight: 180,
        borderRadius: 10,
        margin: 6,
    },
    graphic: {
        //backgroundColor: colors.blue,
        border: '1px solid blue',
        height: '100%',
        minHeight: 180,
        borderRadius: 10,
        margin: 6,
        //color:'#fff',
        color: colors.blue,
    }
}))
export default props => {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [historic, setHistoric] = useState([])
    const [foto, setFoto] = useState(null)

    const classes = useStyles()
    const history = useHistory()


    const PercentualLabel = (props) => {
        return (
            <Box display="flex" alignItems="center" style={{marginTop: 30}}>
                <Box width="100%" mr={1}>
                    <Percentual variant="determinate" value={props.percent} />
                </Box>
                <Box minWidth={35}>
                    <Typography variant="body2" style={{color:'#fff', fontFamily: 'Quicksand, sans-serif'}}>{`${Math.round(
                        props.percent,
                    )}%`}</Typography>
                </Box>
            </Box >
        )
    }
    useEffect(() => {
        // Atualiza o titulo do documento usando a API do browser
        axios.get('getUserById/' + getToken()).then(response => {
            setEmail(response.data[0].email)
            setNome(response.data[0].nome)

            /**
             * Recupera a imagem do perfil
             */
            if (response.data[0].foto) {
                const enc = new TextDecoder("utf-8");
                const arr = new Uint8Array(response.data[0].foto.data);
                const downloadUrl = enc.decode(arr)
                console.log(downloadUrl)
                setFoto(downloadUrl)
            }

        }).catch(err => {

        })

        /**Recupera o histórico do usuário */
        axios.get("/getQuizByUser/" + getToken()).then(response => {
            let arrayquiz = response.data
            //console.log("deu tudo certo")


            axios.get("/getRespostasByUser/" + getToken()).then(response => {
                let arrayquestao = response.data
                let array = arrayquestao.concat(arrayquiz)

                // console.log('antes: ')
                // console.log(array)
                array.sort((a1, a2) => {
                    var date1 = new Date(a1.datacriacao)
                    var date2 = new Date(a2.datacriacao)

                    if (date1.getTime() > date2.getTime())
                        return -1
                    else if (date1.getTime() < date2.getTime())
                        return 1
                    else
                        return 0
                })
                console.log('depois: ')
                console.log(array)
                setHistoric(array)

            }).catch(err => {

            })


        }).catch(err => {
        })
    }, []);


    return (
        <Grid container style={{ padding: 7 }}>
            <Grid item sm={4}>
                <div className={classes.top}>
                    <Text variant="h6" style={{ textAlign: 'center' }}><b>Meu perfil</b></Text>
                    <img src={foto ? foto : UserSVG} />
                    <Text variant="h6" style={{ textAlign: 'center' }}>{nome}</Text>
                    <Text variant="h6" style={{ textAlign: 'center' }}>Nivel X</Text>
                    <Text variant="h6" style={{ textAlign: 'center' }}>{email}</Text>
                </div>
            </Grid>
            <Grid item sm={8}>
                <div className={classes.top}>
                    <Text variant="h6" style={{ textAlign: 'center' }}><b>Conquistas</b></Text>
                </div>
            </Grid>
            <Grid container sm={12} spacing={1}
                style={{ marginTop: 10, padding: '0 5px', marginBottom: 10 }}>
                <Grid item sm={12}>
                    <Divider light />
                </Grid>
                <Grid item sm={12}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                    <Text variant="h6"><b>Histórico de atividades</b></Text>
                    <Text variant="h6" > veja mais</Text>
                </Grid>
            </Grid>
            <Grid item sm={4}>

                <div className={classes.bottom} style={{ backgroundColor: colors.green }}>
                    <Text variant="h6" style={{ textAlign: 'center' }}><b>Seleção</b></Text>
                    <Text style={{ textAlign: 'center', }}>Submissão</Text>
                    <Divider style={{backgroundColor: 'rgba(255, 255, 255, 0.5)'}}/>
                    <Text variant="h6" style={{ textAlign: 'center', }}>Nome da questão</Text>
                    <Text style={{ textAlign: 'center', margin: 'auto'}}><CheckIcon />Resposta correta</Text>
                </div>
            </Grid>
            <Grid item sm={4}>
                <div className={classes.bottom} style={{ backgroundColor: colors.red }}>
                    <Text variant="h6" style={{ textAlign: 'center' }}><b>Sequência</b></Text>
                    <Text style={{ textAlign: 'center', }}>Quiz</Text>
                        <PercentualLabel percent={50}/>
                    <Text style={{ textAlign: 'center' }}>5 acertos de 7 questôes</Text>

                </div>
            </Grid>
            <Grid item sm={4}>
                <div className={classes.bottom} style={{ backgroundColor: colors.yellow }}>
                    <Text variant="h6" style={{ textAlign: 'center', }}><b> Repetiçaõ</b></Text>
                    <Text style={{ textAlign: 'center', }}>Quiz</Text>

                    <PercentualLabel percent={100}/>
                    <Text style={{ textAlign: 'center' }}>10 acertos de 10 questôes</Text>
                </div>
            </Grid>
            <Grid item sm={6}>
                <div className={classes.graphic}>
                    <Text variant="h6" style={{ textAlign: 'center' }}><b>Habilidades</b></Text>
                    <GraficoHabilidade />
                </div>
            </Grid>
            <Grid item sm={6}>
                <div className={classes.graphic}>
                    <Text variant="h6" style={{ textAlign: 'center' }}><b>Exercícios na semana</b></Text>
                    <GraficoSubmissoes />
                </div>
            </Grid>
        </Grid>
    )
}