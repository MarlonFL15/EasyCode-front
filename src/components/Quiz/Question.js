import React, { useEffect } from 'react';
import { withStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, FormGroup, FormControlLabel, Checkbox, Box, FormControl, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
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


function LinearProgressWithLabel(props) {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme) => createStyles({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25
    },

    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    nivel: {
        color: 'white',
        fontWeight: 'bold',
    },
    nivelfacil: {
        padding: 2,
        backgroundColor: '#4CAF50'
    },
    nivelmedio: {
        padding: 2,
        backgroundColor: '#ff9800'
    },
    niveldificil: {
        padding: 2,
        backgroundColor: '#F44335'
    },
    cardContainer: {
        color: '#FFF',
        height: 290,
        textAlign: 'center',
        fontFamily: 'Quicksand, sans-serif'
    },
    card: {
        width: '95%',
        minWidth: 220,
        height: '90%',
        fontFamily: 'Nunito, sans-serif',
        fontSize: 25,
        margin: '10px auto',
        borderRadius: 10,
        padding: 15,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
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
        fontSize: 40,
    },
    box: {
        fontFamily: 'Nunito, sans-serif',
        backgroundColor: '#cce6ed',
        display: 'block',
        border: '2px solid ' + colors.blue,
        borderRadius: 5,
        margin: 5,
        padding: 15,

    }
}));


/*const questoes = [
    {
        enunciado: 'Enunciado 1',
        alternativas: [{alternativa:'Resposta 1'}, {alternativa:'Resposta 2'}, {alternativa:'Resposta 3'}, {alternativa:'Resposta 4'}],
        indexCerta: 2
    },
    {
        enunciado: 'Enunciado 2',
        alternativas: ['Resposta 1', 'Resposta 2', 'Resposta 3'],
        indexCerta: 2
    },
    {
        enunciado: 'Enunciado 3',
        alternativas: ['Resposta 1', 'Resposta 2', 'Resposta 3'],
        indexCerta: 2
    },
    {
        enunciado: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        alternativas: ['Resposta 1', 'Resposta 2', 'Resposta 3', 'Resposta 4'],
        indexCerta: 2
    },
]
*/
export default function Container(props) {
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(null)
    const [show, setShow] = React.useState(false)
    const [questao, setQuestao] = React.useState(0)
    const [gabarito, setGabarito] = React.useState([])
    const [percent, setPercent] = React.useState(0)
    
    const [questoes, setQuestoes] = React.useState([])
    let location = useLocation();
    const [assunto, setAssunto] = React.useState(location.state.assunto)
    const classes = useStyles();

    useEffect(() => {
        //const assunto = location.state.assunto;
        console.log('chamou')
        axios.get('quiz', {params:{
            assunto: assunto,
            idUsuario: getToken()
        }}).then(response => {
            const perguntas = []
            response.data.forEach(el => {
                
                el.alternativas.forEach((alt, index)=>{
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
        
    },[]);
    const GreenCheckbox = withStyles({
        root: {
            color: colors.blue,

            '&$checked': {
                color: show ? selected === questoes[questao].indexCerta ? colors.green : colors.red : colors.green,
            },
        },
        checked: {},
    })((props) => <Checkbox color="default" {...props} />);

    const changeQuestion = () => {
        setQuestao(questao + 1)
        setShow(false)
        setSelected(null)
        if(questao == questoes.length - 1){
            alert('oppa')
        }
    }

    const finish = () =>{
        setOpen(true)
        axios.post('/sendQuiz', {respostas:gabarito, idUsuario:getToken(), assunto:assunto}).then(response => {
            
            if(response.data.conquista.length != 0){
                var event = new CustomEvent('achievement',  {'detail': {
                    conquista: response.data.conquista
                }})
                window.dispatchEvent(event)
            }
        }).catch(err => {
            
        })
        /**Criar o registro do formulário */
        /**Criar o registro das perguntas no formulário */
        /**Criar o registro das respostas */
    }
    const showAnswer = () => {
        setShow(true)
        let newgabarito = [...gabarito, 
            {
                correto:selected === questoes[questao].indexCerta, 
                respostaUsuario:questoes[questao].alternativas[selected], 
                id: questoes[questao].id,
                
            }
        ]
        //console.log(newgabarito)
        setGabarito(newgabarito)
        
        setPercent(percent + parseFloat(1 / questoes.length * 100))
    }

    if(questoes.length == 0)
        return (
            <div>Carregando</div>
        )

    return (
        <div className={classes.root}>

            <h2 className={classes.title}>Quiz sobre {assunto}</h2>

            <Grid container>
                <Grid item sm={12}>
                    <LinearProgressWithLabel
                        value={percent} />
                </Grid>
                <Grid item sm={12} className={classes.box}>
                    {questoes[questao].enunciado}
                    <br/>
                    {questoes[questao].codigo}
                </Grid>

                {questoes[questao].alternativas.map((item, index) => {
                    const lengthAlt = questoes[questao].alternativas.length
                    return (
                        <Grid item sm={12} md={lengthAlt%2==1 && index=== lengthAlt-1?12:6}>

                            <div className={classes.box}


                                style={{
                                    backgroundColor: show ? questoes[questao].indexCerta === index ? '#d2edcc' : index === selected ? '#ffadad' : '' : '',
                                    padding: 5,
                                    fontFamily: 'Nunito, sans-serif',
                                }}
                            >
                                <GreenCheckbox name="checkedH" checked={selected === index} onChange={(e) => !show ? setSelected(index) : null} />
                                <span>{item}</span>
                            </div>
                        </Grid>
                        // <Grid item sm={12}>{item}</Grid>
                    )
                })}

                <Grid item sm={12} justify="space-between" style={{ display: 'flex' }}>
                    <Button variant="contained" disabled={show} color="primary" onClick={(e) => showAnswer()}>Responder</Button>
                    <Button variant="contained" color="primary" onClick={(e) => changeQuestion()} style={{ display: show ? questao < questoes.length - 1 ? 'inherit' : 'none' : 'none' }}>Próximo</Button>
                    <Button variant="contained" color="primary" style={{ display: show ? questao === questoes.length - 1 ? 'inherit' : 'none' : 'none' }} onClick={() => finish()}>Ver gabarito</Button>
                </Grid>
            </Grid>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Gabarito</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <List>
                            {gabarito.map((item, index) => {
                                return <ListItem
                                    style={{
                                        height: 20,
                                        textOverflow: 'ellipsis',
                                            
                                            whiteSpace: 'nowrap',
                                       
                                    }}>
                                    <ListItemIcon>
                                        {gabarito[index].correto ?
                                            'Certa' :
                                            'Errou'}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={questoes[index].enunciado}
                                        style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            
                                        }}
                                    />
                                </ListItem>
                            })}
                        </List>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Disagree
          </Button>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Agree
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
