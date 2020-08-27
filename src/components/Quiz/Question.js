import React from 'react';
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


const questoes = [
    {
        enunciado: 'Enunciado 1',
        alternativas: ['Resposta 1', 'Resposta 2', 'Resposta 3', 'Resposta 4'],
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

export default function Container() {
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(null)
    const [show, setShow] = React.useState(false)
    const [questao, setQuestao] = React.useState(0)
    const [gabarito, setGabarito] = React.useState([])
    const [percent, setPercent] = React.useState(0)

    const classes = useStyles();

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
    }

    const showAnswer = () => {
        setShow(true)
        if (questao === 0) {
            setGabarito([questao === selected])
        }
        setGabarito([...gabarito, questao === selected])
        setPercent(percent + parseFloat(1 / questoes.length * 100))
    }

    return (
        <div className={classes.root}>

            <h2 className={classes.title}>QUIZ</h2>

            <Grid container>
                <Grid item sm={12}>
                    <LinearProgressWithLabel
                        value={percent} />
                </Grid>
                <Grid item sm={12} className={classes.box}>
                    {questoes[questao].enunciado}
                </Grid>

                {questoes[questao].alternativas.map((item, index) => {
                    return (
                        <Grid item sm={12}>

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
                    <Button variant="contained" color="primary" style={{ display: show ? questao === questoes.length - 1 ? 'inherit' : 'none' : 'none' }} onClick={() => setOpen(true)}>Ver gabarito</Button>
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
                            {questoes.map((item, index) => {
                                return <ListItem
                                    style={{
                                        height: 20,
                                        textOverflow: 'ellipsis',
                                            
                                            whiteSpace: 'nowrap',
                                       
                                    }}>
                                    <ListItemIcon>
                                        {gabarito[index] ?
                                            'Certa' :
                                            'Errou'}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.enunciado}
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
