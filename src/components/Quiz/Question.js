import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Checkbox, Box, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import colors from '../Colors'
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useHistory, useLocation, BrowserRouter } from "react-router-dom";
import axios from '../../bd/client'
import { getToken } from '../auth';

const TIME_FOR_NEXT_QUESTION = 2


export default function Container(props) {
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(null)
    const [show, setShow] = React.useState(false)
    const [questao, setQuestao] = React.useState(0)
    const [gabarito, setGabarito] = React.useState([])
    const [percent, setPercent] = React.useState(0)
    const [proximo, setProximo] = React.useState(false)
    const [questoes, setQuestoes] = React.useState([])
    const [acertos, setAcertos] = useState(0)
    let location = useLocation();
    let history = useHistory()
    const assunto = location.state.assunto
    console.log(location.state)
    
    const headerColor = assunto === 'Seleção' ? colors.yellow : assunto === 'Sequência' ? colors.red : assunto === 'Repetição' ? colors.green : colors.blue
    const [didMount, setDidMount] = React.useState(false);



    const useStyles = makeStyles((theme) => createStyles({
        root: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        topRow: {
            position: 'absolute',
            top: 0,
            left: 0,
            padding: 7,
            background: headerColor,
            opacity: 0.5,
            width: '100%',
            zIndex: -1000,
            height: 180
        },
        topBar: {
            padding: 7,
            background: headerColor,
            width: percent + '%',
            height: 180
        },
        cardContainer: {
            color: '#FFF',
            height: 290,
            textAlign: 'center',
            fontFamily: 'Quicksand, sans-serif'
        },
        cardIcon: {
            backgroundColor: 'rgba(255, 255, 255, 0.35)',
            width: 150,
            height: 150,
            margin: 'auto',
            borderRadius: 100,
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            fontSize: 50,
            fontWeight: 700,
            fontFamily: 'Roboto, sans-serif',
        },
        title: {
            fontFamily: 'Quicksand, sans-serif',
            fontSize: 25,
            textAlign: 'center',
            color: headerColor,
            paddingBottom: 15
        },
        box: {
            fontFamily: 'Nunito, sans-serif',

            display: 'block',

            borderRadius: 5,
            margin: 5,
            padding: 15,

        },
        card: {
            backgroundColor: '#ffffff',
            fontFamily: 'Nunito, sans-serif',
            display: 'block',
            borderRadius: 5,
            margin: 5,
            padding: 25,
            textAlign: 'center'

        },
        nextContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            // background: 'red',
            display: 'flex',
            width: '100%',
            minHeight: 600,
            height: '100%',
            padding: '20px 30px'
        },
        nextBox: {
            marginTop: 'auto',
            marginLeft: 'auto',
        },
        nextButton: {
            backgroundColor: selected !== null ? colors.blue : 'gray',
            padding: '10px 40px',
            color: 'white',
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: 1.3
        },
        respostaContainer: {
            display: 'flex',
            position: 'relative',
            backgroundColor: colors.background,
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
            height: '100%',
            width: '100%',
            zIndex: 10,

        }
    }));

    const classes = useStyles()

    useEffect(() => {

        //const assunto = location.state.assunto;
        console.log('chamou')
        axios.get('quiz', {
            params: {
                assunto: assunto,
                idUsuario: getToken()
            }
        }).then(response => {
            const perguntas = []
            response.data.forEach(el => {

                el.alternativas.forEach((alt, index) => {
                    el.alternativas[index] = alt.alternativa
                })
                perguntas.push({
                    enunciado: el.enunciado,
                    alternativas: el.alternativas,
                    codigo: el.codigo,
                    indexCerta: el.alternativas.indexOf(el.resposta),
                    id: el.id
                })
                setQuestoes(perguntas)
            })
            /**Criar o formulario no banco */
            //console.log({assunto:assunto, idUsuario:getToken()})
            //axios.post('createForm', {assunto:assunto, idUsuario:getToken()})
        }).catch(error => {
            console.log(error)
        })

        console.log(selected)

        console.log()

    }, []);


    const StyledCheckbox = withStyles({
        root: {
            color: headerColor,

            '&$checked': {
                color: headerColor,
            },
        },
        checked: {},
    })((props) => <Checkbox color="default" {...props} />);

    const changeQuestion = () => {

        if (questao == questoes.length - 1) {
            //alert(getAcertos())
            
            const quiz = {
                questoes: questoes.length,
                acertos: acertos,
                assunto: assunto
            }
            console.log(quiz)
            if (location.state.jornada) {
                finish('oi')
                history.push({
                    pathname: '/jornada/' + assunto ,
                    state: {
                        quiz:{
                            questoes: questoes.length,
                            acertos: selected === questoes[questao].indexCerta?acertos+1:acertos,
                            assunto: assunto
                        }
                    },
                });
            } else {
                finish('oi')
                history.push({
                    pathname: '/quiz/resultado', 
                    state: {
                        quiz:{
                            questoes: questoes.length,
                            acertos: selected === questoes[questao].indexCerta?acertos+1:acertos,
                            assunto: assunto
                        }
                    },
                });
            }
        } else {
            setQuestao(questao + 1)
            setShow(false)
            setSelected(null)
        }


    }

    const finish = (e) => {
        const qacertos = selected === questoes[questao].indexCerta?acertos+1:acertos
        const percentual = qacertos/questoes.length * 100
        axios.post('/sendQuiz', { respostas: gabarito, idUsuario: getToken(), assunto: assunto, percentual: percentual }).then(response => {

            if (response.data.conquista.length != 0) {
                var event = new CustomEvent('achievement', {
                    'detail': {
                        conquista: response.data.conquista
                    }
                })
                window.dispatchEvent(event)
            }
        }).catch(err => {

        })
        /**Criar o registro do formulário */
        /**Criar o registro das perguntas no formulário */
        /**Criar o registro das respostas */
    }

    const SetProximoTrue = () => {
        setProximo(true)

        return new Promise(r => {
            setTimeout(r, TIME_FOR_NEXT_QUESTION * 1000)
        })
    }

    const Resultado = async () => {
        await SetProximoTrue().then(
            () => {
                showAnswer()
                changeQuestion()
                setProximo(false)
            }
        )


    }

    const showAnswer = () => {
        let newgabarito = [...gabarito,
            {
                correto: selected === questoes[questao].indexCerta,
                respostaUsuario: questoes[questao].alternativas[selected],
                id: questoes[questao].id,

            }
        ]

        
        let resp = 0
        newgabarito.forEach(e => {
            if(e.correto)
                resp += 1
        })
      
        setPercent(percent + parseFloat(1 / questoes.length * 100))
        setGabarito(newgabarito)
        setAcertos(resp)
    }

    const IsQuestionRight = () => {
        return selected === questoes[questao].indexCerta
    }

    const getGabarito = () => {
        return new Promise(r => {
            r(gabarito)
        })
    }

    const getAcertos = () => {
        let resp = 0
        console.log(gabarito)
        gabarito.map((item) => {
            if (item.correto)
                resp += 1
        })
        return resp
    }
    const TelaResposta = () => {

        return (
            <div
                className={classes.respostaContainer}>

                <img style={{
                    height: 90,
                    margin: '0 auto',
                }}
                    src={require(IsQuestionRight() ? './VoceAcertou.svg' : './VoceErrou.svg')} />
                <div
                    style={{
                        fontSize: 25,
                        fontWeight: 600,
                        color: IsQuestionRight() ? colors.green : colors.red
                    }}>
                    {IsQuestionRight() ?
                        'Você acertou' : 'Voce errou'}</div>
                <div>{IsQuestionRight() ?
                    'Continue assim!' : 'Não desista e continue tentando!'}
                </div>
            </div>
        )
    }

    if (questoes.length == 0)
        return (
            <div>Carregando</div>
        )

    if (proximo) {
        return (<TelaResposta />)
    }

    return (
        <div className={classes.root}>

            <div className={classes.topRow} />
            <div className={classes.topBar} />

            <Grid container style={{ padding: 25, marginTop: -100 }}>
                <Grid item sm={12}>

                </Grid>
                <Grid item sm={12} className={classes.card}>
                    <h3 className={classes.title}>{assunto}</h3>
                    {questoes[questao].enunciado}
                    <br />
                    {questoes[questao].codigo}
                </Grid>

                {questoes[questao].alternativas.map((item, index) => {
                    const lengthAlt = questoes[questao].alternativas.length
                    return (
                        <Grid item sm={12} md={lengthAlt % 2 == 1 && index === lengthAlt - 1 ? 12 : 6}>

                            <div className={classes.box}>
                                <StyledCheckbox name="checkedH" checked={selected === index} onChange={(e) => !show ? setSelected(index) : null} />
                                <span>{item}</span>
                            </div>
                        </Grid>
                    )
                })}
                <div
                    className={classes.nextContainer}>
                    <div className={classes.nextBox}>
                        <Button variant="contained"
                            disabled={selected === null}
                            className={classes.nextButton}
                            onClick={(e) => {
                                localStorage.setItem('headerWhite', true)
                                Resultado()
                            }}>PRÓXIMO</Button>
                    </div>
                </div>
            </Grid>


        </div>
    );
}
