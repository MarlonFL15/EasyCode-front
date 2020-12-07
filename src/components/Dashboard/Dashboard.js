import React, { useEffect, useState } from 'react'
import Blockly from '../Questions'
import { Grid, Divider, Typography, LinearProgress, Box, Card, IconButton, ListItemIcon } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import colors from '../Colors'
import UserSVG from './../assets/user.svg'
import { getToken } from '../auth'
import axios from '../../bd/client'
import CodeIcon from '@material-ui/icons/Code';
import { Redirect, useHistory, useLocation } from "react-router-dom";
import GraficoHabilidade from './GraficoHabilidades';
import GraficoSubmissoes from './GraficoSubmissoes'
import Conquistas from './Conquistas'
import CheckIcon from '@material-ui/icons/Check';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import CloseIcon from '@material-ui/icons/Close';
import './grid.css'
import Avatar from '../Avatar'

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
        height: '100%',
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
        height: '170%',
        minHeight: 200,
        borderRadius: 10,
        //color:'#fff',
        fontFamily: 'Poppins',
        fontSize: 18,
        fontWeight: 700,
    },
    title: {
        fontFamily: 'Poppins',
        fontSize: 18,
        fontWeight: 700,
    },
    description: {
        fontFamily: 'Poppins',
        fontSize: 12,
        fontWeight: 400,
    },
    image: {
        height: 100,
        width: 100,
        margin: '0 auto',
        marginTop: '-25%',
        '& img': {
            height: 100
        }
    },
    card: {
        padding: 15,
        overflow: 'visible',
        outline: 'none',
        border: 'none',
        '&:hover': {
            transform: 'scale(1.1)',
            marginBottom: 10,
        }
    }
}))
export default props => {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [historic, setHistoric] = useState([])
    const [cards, setCards] = useState([])
    const [foto, setFoto] = useState(null)

    const classes = useStyles()
    const history = useHistory()


    const PercentualLabel = (props) => {
        return (
            <Box display="flex" alignItems="center" style={{ marginTop: 30 }}>
                <Box width="100%" mr={1}>
                    <Percentual variant="determinate" value={props.percent} />
                </Box>
                <Box minWidth={35}>
                    <Typography variant="body2" style={{ color: '#fff', fontFamily: 'Quicksand, sans-serif' }}>{`${Math.round(
                        props.percent,
                    )}%`}</Typography>
                </Box>
            </Box >
        )
    }

    const HistoricBox = (props) => {
        var color = ""
        if (props.categoria === "Matemática" || props.categoria === "Textos")
            color = colors.blue
        if (props.categoria === "Repetição")
            color = colors.yellow
        if (props.categoria === "Sequência")
            color = colors.red
        if (props.categoria === "Seleção")
            color = colors.green

        if (props.questao){
            return <div className={classes.bottom} style={{ backgroundColor: color }}>
                <Text variant="h6" style={{ textAlign: 'center' }}><b>{props.categoria}</b></Text>
                <Text style={{ textAlign: 'center', }}>Quiz</Text>
                <PercentualLabel percent={parseFloat(props.acertos / props.questoes) * 100} />
                <Text style={{ textAlign: 'center' }}>{props.acertos} acertos de {props.questoes} questôes</Text>

            </div>
        }
        if (props.blocks){
            return <div className={classes.bottom} style={{ backgroundColor: color }}>
                <Text variant="h6" style={{ textAlign: 'center' }}><b>{props.categoria}</b></Text>
                <Text style={{ textAlign: 'center', }}>Submissão</Text>
                <Divider style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} />
                <Text variant="h6" style={{ textAlign: 'center', }}>{props.nomeQuestao}</Text>
                {props.correto?
                    <Text style={{display:'flex', justifyContent: 'center' }}><CheckIcon />Resposta correta</Text>:
                    <Text style={{display:'flex', justifyContent: 'center' }}><CloseIcon />Resposta incorreta</Text>
                }
            </div>
        }
        return null
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
                
                setHistoric(array)
                setCards(array.splice(0,3))

            }).catch(err => {
            })
        }).catch(err => {
        })
    }, []);

    const CardPlay = ()=> {
        const history = useHistory()

        return (
            <Card variant="outlined" className="play"
                style={
                    {
                        backgroundColor: 'purple',
                        color: '#FFFFFF',
                        fontFamily: 'Poppins',
                        padding: '5px 15px', 
                        border: 'none'
                    }
                }>
                Vamos para a<br/>jornada?
                <IconButton color="#FFFFF" onClick={()=>history.push('/jornada')}
                style={{
                    float: 'right',
                    top: 120
                }}>
                    <ClearRoundedIcon/>
                </IconButton>
            </Card>

        )
    }
    console.log(cards)
    return (
        <Grid container style={{minWidth: 400}} className="container">
            <div className="top" style={{ padding: 7, background: colors.blue, width: '100%'}}/>
            <div className="grid-container" style={{ padding: 7,}}>
                <Card variant="outlined" className="perfil"  style={{padding: 20, border: 'none', fontSize: 14, overflow: 'visible'}}>
                    <div style={{textAlign: 'center'}}>
                    <div className={classes.image}>
                        <Avatar/>
                    </div>
                        Meu Painel
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <div>Conquistas</div>
                        <div>Ver tudo</div>
                    </div>
                    <div>
                        aaaaaaaaaaaaaaa
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <div>Histórico</div>

                        <div>Ver tudo</div>
                    </div>
                    <div>
                        aaaaaaaaaaaaaaa
                    </div>
                </Card>
                <div className="text">
                    Olá, <span>{nome.split(" ")[0]}!</span><br/>
                    <div>O que iremos praticar<br/>hoje?</div>
                    </div>
                <div className="cards">
                    <Card variant="outlined"  className={classes.card} onClick={()=>history.push('/quiz')}>
                    <div className={classes.image}>
                        <img src={require('./memo_1f4dd.png')}></img>
                    </div>
                        <div className={classes.title}>Quiz</div>
                        <div className={classes.description}>Ultimo resolvido:<br/>Comando If e Else 75%</div>
                    </Card>
                    <Card variant="outlined" className={classes.card} onClick={()=>history.push('/questoes')}>
                        <div className={classes.image}>
                            <img src={require('./puzzle-piece-apple.png')}></img>
                        </div>
                        <div className={classes.title}>Blocos</div>
                        <div className={classes.description}>Ultimo resolvido:<br/>Comando If e Else 75%</div></Card>
                    <Card variant="outlined" className={classes.card} onClick={()=>history.push('/tabelas-verdade')}>
                        <div className={classes.image}>
                        <img src={require('./clipboard-apple.png')}></img>

                        </div>
                        <div className={classes.title}>Tabela-verdade</div>
                        <div className={classes.description}>Ultimo resolvido:<br/><span>Vizinhança</span> em 5m</div></Card>
                </div>
                <Card variant="outlined" className="charts" style={{padding: 20, border: 'none'}}>
                <div className={classes.graphic}>
                    <Text variant="h6" style={{ fontWeight: 700 }}><b>Habilidades</b></Text>
                    <GraficoHabilidade className="habilidades"/>
                </div>
                <div className={classes.graphic}>
                    <Text variant="h6" style={{ fontWeight: 700,}}><b>Exercícios na semana</b></Text>
                    <GraficoSubmissoes />
                </div>
                </Card>
                <CardPlay/>
            </div>
            
            {/* <Grid item sm={4}>
                <div className={classes.top}>
                    <Text variant="h6" style={{ textAlign: 'center' }}><b>Meu perfil</b></Text>
                    <img src={foto ? foto : UserSVG} />
                    <Text variant="h6" style={{ textAlign: 'center' }}>{nome}</Text>
                    <Text variant="h6" style={{ textAlign: 'center' }}>Nivel X</Text>
                    <Text variant="h6" style={{ textAlign: 'center' }}>{email}</Text>
                </div>
            </Grid>
            <Grid item sm={8}>
                <Conquistas></Conquistas>
                
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
            {cards.map(el => {
                return (
                    <Grid item sm={4}>
                        <HistoricBox questao={el.tipo==2?true:false} blocks={el.tipo==1?true:false} 
                            correto={el.correto} categoria={el.assunto} nomeQuestao={el.titulo} acertos={el.certas} questoes={el.questoes}/>
                    </Grid> 
                )
            })}
           
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
            </Grid> */}
        </Grid>
    )
}