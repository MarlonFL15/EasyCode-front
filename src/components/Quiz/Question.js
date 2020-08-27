import React from 'react';
import { withStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { Grid, Typography, Button, FormGroup, FormControlLabel, Checkbox, Box } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions'
import { Redirect, useHistory, Link } from "react-router-dom";
import colors from '../Colors'
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import LinearProgress from '@material-ui/core/LinearProgress';

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

const useStyles = makeStyles((theme) => createStyles({
    table: {
    },
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25
    },
    search: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 350,
        margin: '15px 0',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    },
    input: {
        marginLeft: 8,
        flex: 1,
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
    seeAll: {
        fontFamily: 'Nunito, sans-serif',
        fontSize: 20,
        color: colors.blue,
        fontWeight: 500,
    }
}));


const questoes = [
    {
        enunciado: 'Enunciado 1',
        alternativas: ['Resposta 1', 'Resposta 2', 'Resposta 3', 'Resposta 4'],
        indexCerta: 2
    },
    {
        enunciado: 'Enunciado 2',
        alternativas: ['Resposta 1', 'Resposta 2', 'Resposta 3', 'Resposta 4'],
        indexCerta: 2
    },
]

export default function Container() {
    const [selected, setSelected] = React.useState(null)
    const [show, setShow] = React.useState(false)
    const [questao, setQuestao] = React.useState(questoes[0])
    const [gabarito, setGabarito] = React.useState([])

    const classes = useStyles();
    const history = useHistory()

    const changeQuestion = () => {
        const prox = questoes.indexOf(questao) + 1
        setQuestao(questoes[prox])
        setShow(false)
        setSelected(null)
    }

    const showAnswer=()=>{
        setShow(true)
        setGabarito([...gabarito, selected])
    }

    return (
        <div className={classes.root}>

            <h2 className={classes.title}>QUIZ</h2>

            <Grid container>
                <Grid item sm={12}>
                    <LinearProgressWithLabel value={questoes.indexOf(questao)===questoes.length-1 && show?100:(parseFloat(questoes.indexOf(questao)*1/questoes.length)*100)} />

                </Grid>
                <Grid item sm={12}>
                    {questao.enunciado}
                </Grid>

                {questao.alternativas.map((item, index) => {
                    return (
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox color={'primary'} icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                                label="Custom icon" checked={selected === index} onChange={(e) => !show?setSelected(index):null}
                                style={{ color: show ? questao.indexCerta === index ? colors.green : index === selected ? 'red' : '#000' : '#000' }}
                            />
                        </FormGroup>
                        // <Grid item sm={12}>{item}</Grid>
                    )
                })}
                <Button variant="contained" color="primary" onClick={(e) =>showAnswer()}>Responder</Button>
                <Button variant="contained" color="primary" onClick={(e) => changeQuestion()} style={{ display: show ? questoes.indexOf(questao)<questoes.length-1?'inherit' : 'none': 'none' }}>Próximo</Button>
                <Button variant="contained" color="primary" onClick={(e) => console.log(gabarito)} style={{ display: show ? questoes.indexOf(questao)===questoes.length-1?'inherit' : 'none': 'none' }}>Ver gabarito</Button>
            </Grid>

        </div>
    );
}
