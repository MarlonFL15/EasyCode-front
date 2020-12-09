import React, { useEffect, useState } from 'react'
import { Grid, Divider, Typography, LinearProgress, Box, Card, IconButton, ListItemIcon } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import colors from '../Colors'
import { getToken } from '../auth'
import axios from '../../bd/client'
import { Redirect, useHistory, Link } from "react-router-dom";
import GraficoHabilidade from './GraficoHabilidades';
import GraficoSubmissoes from './GraficoSubmissoes'
import ExtensionIcon from '@material-ui/icons/Extension';
import AssignmentIcon from '@material-ui/icons/Assignment';
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
        height: 130,
        width: 130,
        margin: '0 auto',
        marginTop: '-25%',
        '& img': {
            height: 130
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
    const [conquistas, setConquistas] = useState([])
    const [historic, setHistoric] = useState([])
    const [cards, setCards] = useState([])
    const [foto, setFoto] = useState(null)
    const [lastQuiz, setLastQuiz] = useState(null)
    const [lastBloco, setLastBloco] = useState(null)
    const [lastTable, setLastTable] = useState(null)

    const classes = useStyles()
    const history = useHistory()

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

        return (
            <div style={{ display: 'flex', fontSize: 13, width: 'calc(100% + 10px)', borderRadius: 3, backgroundColor: props.index % 2 === 0 ? colors.background : '', padding: 5, paddingTop: 8, marginLeft: -5 }}>
                <div style={{ width: '15%', }}>{props.blocks ? <ExtensionIcon fontSize="small" /> : <AssignmentIcon fontSize="small" />}</div>
                <div style={{ width: '30%' }}>{props.blocks ? props.nomeQuestao : '-'}</div>
                <div style={{ width: '30%' }}>{props.categoria}</div>
                <div style={{ width: '15%' }}>  {props.blocks ?
                    props.correto ?
                        <Text style={{ display: 'flex', justifyContent: 'center' }}><CheckIcon />Certo</Text> :
                        <Text style={{ display: 'flex', justifyContent: 'center' }}><CloseIcon />Errado</Text> :
                    parseFloat(props.acertos / props.questoes) * 100}</div>
            </div>
            // <div style={{ display: 'flex' }}>
            //     <Text style={{ textAlign: 'center', }}>Quiz</Text>
            //     <div>{props.blocks ? props.nomeQuestao : '-'}</div>
            //     <Text variant="h6" style={{ textAlign: 'center' }}><b>{props.categoria}</b></Text>
            //     <div>
            //         {props.blocks ?
            //             props.correto ?
            //                 <Text style={{ display: 'flex', justifyContent: 'center' }}><CheckIcon />Resposta correta</Text> :
            //                 <Text style={{ display: 'flex', justifyContent: 'center' }}><CloseIcon />Resposta incorreta</Text> :
            //             parseFloat(props.acertos / props.questoes) * 100}

            //     </div>
            // </div>
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

        axios.get('getConquistas/' + getToken()).then(response => {
            setConquistas(response.data)
        }).catch(e => {

        })
        /**Recupera o histórico do usuário */
        axios.get("/getQuizByUser/" + getToken()).then(response => {
            let arrayquiz = response.data
            setLastQuiz(response.data[0])
            //console.log("deu tudo certo")
            axios.get("/getRespostasByUser/" + getToken()).then(response => {
                setLastBloco(response.data[0])
                axios.get('getTabelasByUser/' + getToken()).then(response1 => {
                    setLastTable(response1.data[0])
                    let arrayquestao = response.data
                    let arraytabelas = response1.data
                    let array = arrayquestao.concat(arrayquiz).concat(arraytabelas)
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
                    setCards(array)

                })



                // console.log('antes: ')
                // console.log(array)

            }).catch(err => {
            })
        }).catch(err => {
        })
    }, []);

    const CardPlay = () => {
        const history = useHistory()

        return (
            <Card variant="outlined" className="play"
                style={
                    {
                        backgroundColor: colors.purple,
                        color: '#FFFFFF',
                        fontFamily: 'Poppins',
                        padding: '15px 30px',
                        border: 'none',
                        position: 'relative',
                        fontSize:24,
                        fontWeight: 600
                        // height: 250,
                    }
                }>
                Vamos para a<br />jornada?
                <img src={require('./cardPlayTop.svg')}
                    style={{
                        height: 70,
                        position: 'absolute',
                        top: 0,
                        right: 0
                    }} />
                <img src={require('./cardPlayBottom.svg')}
                    style={{
                        height: 150,
                        position: 'absolute',
                        bottom: 0,
                        left: 0
                    }} />
                <img src={require('./cardPlayButton.svg')}
                    style={{
                        height: 100,
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        cursor:'pointer'
                    }} onClick={() => history.push('/jornada')}/>
            </Card>

        )
    }

    return (
        <Grid container style={{ minWidth: 400 }} className="container">
            <div className="top" style={{ padding: 7, background: colors.blue, width: '100%' }} />
            <div className="grid-container" style={{ padding: 7, }}>
                <Card variant="outlined" className="perfil" style={{ padding: 20, border: 'none', fontSize: 14, overflow: 'visible' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Text variant="h6" style={{ fontWeight: 700 }}><b>Meu painel</b></Text>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', fontSize: 16, justifyContent: 'space-between' }}>
                        <div>Conquistas</div>
                        <Link to="/conquistas" style={{ textDecoration: 'none', color: colors.blue }}>Ver tudo</Link>
                    </div>
                    <Grid container spacing={1} style={{ maxHeight: 110, overflow: 'hidden' }}>
                        {conquistas.map(item => {
                            return (
                                <Grid item>
                                    <div
                                        style={{
                                            width: 45,
                                            height: 45,
                                            margin: '0 auto',
                                            backgroundColor: item.idUsuario?'none':colors.black,
                                            borderRadius: '100%',
                                            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)'
                                        }}>
                                        <img width={45} height={45} src={'media/Conquistas/' + item.id + ".svg"}
                                            style={{
                                                opacity: item.idUsuario?1:0.4,
                                            }} />
                                    </div>

                                </Grid>
                            )
                        })}

                    </Grid>
                    <div style={{ display: 'flex', flexDirection: 'row', fontSize: 16, justifyContent: 'space-between', marginTop: 10 }}>
                        <div>Histórico</div>
                    </div>
                    <div>
                        <div style={{ display: 'flex', fontWeight: 760, fontSize: 13, width: '100%' }}>
                            <div style={{ width: '15%' }}>Tipo</div>
                            <div style={{ width: '30%' }}>Nome</div>
                            <div style={{ width: '30%', overflow: 'hidden', textOverflow: 'ellipsis' }}>Categoria</div>
                            <div style={{ width: '25%', overflow: 'hidden', textOverflow: 'ellipsis' }}>Resultado</div>
                        </div>
                        <Grid container>
                            {cards.map((el, i) => {
                                { console.log(el) }
                                return (
                                    <Grid item xs={12}>
                                        <HistoricBox index={i} questao={el.tipo == 2 ? true : false} blocks={el.tipo == 1 ? true : false}
                                            correto={el.correto} categoria={el.assunto} nomeQuestao={el.titulo} acertos={el.certas} questoes={el.questoes} />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </div>
                </Card>
                <div className="text">
                    Olá, <span>{nome.split(" ")[0]}!</span><br />
                    <div>O que iremos praticar<br />hoje?</div>
                </div>
                <div className="cards">
                    <Card variant="outlined" className={classes.card} onClick={() => history.push('/quiz')}>
                        <div className={classes.image}>
                            <img src={require('./quiz.svg')}></img>
                        </div>
                        <div className={classes.title}>Quiz</div>
                        {lastQuiz ?
                            <div className={classes.description}>Ultimo resolvido:<br />{lastQuiz.assunto} {lastQuiz.percentual}%</div> : <div className={classes.description}>Nenhuma atividade recente</div>}
                    </Card>
                    <Card variant="outlined" className={classes.card} onClick={() => history.push('/questoes')}>
                        <div className={classes.image}>
                            <img src={require('./blocos.svg')}></img>
                        </div>
                        <div className={classes.title}>Blocos</div>
                        {lastBloco ?
                            <div className={classes.description}>Ultimo resolvido:<br />{lastBloco.titulo} - {lastBloco.assunto}</div> : <div className={classes.description}>Nenhuma atividade recente</div>}
                    </Card>
                    <Card variant="outlined" className={classes.card} onClick={() => history.push('/tabelas-verdade')}>
                        <div className={classes.image}>
                            <img src={require('./tabela_verdade.svg')}></img>

                        </div>
                        <div className={classes.title}>Tabela-verdade</div>
                        {lastTable ?
                            <div className={classes.description}>Ultimo resolvido:<br /><span>{lastTable.nome}</span> - {lastTable.nivel}</div> : <div className={classes.description}>Nenhuma atividade recente</div>}
                    </Card>
                </div>
                <Card variant="outlined" className="charts" style={{ padding: 20, border: 'none' }}>
                    <div className={classes.graphic}>
                        <Text variant="h6" style={{ fontWeight: 700 }}><b>Habilidades</b></Text>
                        <GraficoHabilidade className="habilidades" />
                    </div>
                    <div className={classes.graphic}>
                        <Text variant="h6" style={{ fontWeight: 700, }}><b>Exercícios na semana</b></Text>
                        <GraficoSubmissoes />
                    </div>
                </Card>
                <CardPlay />
            </div>
        </Grid>
    )
}