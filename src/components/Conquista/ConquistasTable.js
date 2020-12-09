import React, { useEffect } from 'react';
import { withStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { Grid, Typography, Card } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions'
import { Redirect, useHistory, Link } from "react-router-dom";
import colors from '../Colors'
import LoopIcon from '@material-ui/icons/Loop';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import Axios from 'axios';
import { getToken } from '../auth'
import axios from '../../bd/client'
const useStyles = makeStyles((theme) => createStyles({
    table: {
    },
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    search: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 350,
        margin: '15px 0',
        backgroundColor: colors.background,
        border: 'none',
        float: 'right',
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
        fontFamily: 'Poppins, sans-serif',
        fontSize: 24,
        marginTop: 100,
        color: '#FFFFFf',
        width: 'calc(100% - 100px)',
        marginBottom: 30,
        minWidth: 200,
    },
    seeAll: {
        fontFamily: 'Nunito, sans-serif',
        fontSize: 20,
        color: colors.blue,
        fontWeight: 500,
    }
}));


const assuntos = [
    { nome: 'Matemática', link: '/roleta', cor: colors.blue, icon: '+-*/' },
    { nome: 'Seleção', link: '/dashboard', cor: colors.green, icon: 'if()' },
    { nome: 'Sequência', link: '/questoes', cor: colors.red, icon: (<div><TrendingFlatIcon style={{ fontSize: 60 }} /><TrendingFlatIcon style={{ fontSize: 60 }} /></div>) },
    { nome: 'Repetição', link: '/questoes', cor: colors.yellow, icon: (<LoopIcon style={{ fontSize: 60 }} />) },
    { nome: 'Textos', link: '/questoes', cor: colors.blue, icon: 'abc' },

]

export default function ConquistasTable() {
    const [value, setValue] = React.useState('')
    const [conquistas, setConquistas] = React.useState([])
    const classes = useStyles();
    const history = useHistory()

    const changeValue = (event) => {
        console.log('tá mudando')
        setValue(event.target.value)
    }

    useEffect(() => {
        axios.get('getConquistas/' + getToken()).then(response => {
            setConquistas(response.data)
        }).catch(e => {

        })
    })
    return (
        <div className={classes.root}>
            <div className="top" style={{ padding: 7, background: colors.blue, width: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }} />

            <h2 className={classes.title}>Suas conquistas</h2>

            <Card variant="outlined" style={{ padding: '20px 30px', width: 'calc(100% - 100px)', border: 'none', minWidth: 300, marginBottom: 30 }}>
                <Paper component="form" variant="outlined" className={classes.search}>
                    <InputBase
                        className={classes.input}
                        placeholder="Pesquisar"
                        value={value}
                        onChange={changeValue}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <Grid container spacing={2}>
                    {conquistas.map((item) => {
                        if (item.titulo.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
                            return (
                                <Grid item xs={12} sm={4} md={3}>
                                    <div style={{
                                        borderRadius: 5,
                                        backgroundColor: colors.background,
                                        padding: 10,
                                        textAlign: 'center',
                                        height: '100%'
                                    }} >
                                        <div
                                            style={{
                                                width: 70,
                                                height: 70,
                                                margin: '0 auto',
                                                backgroundColor: item.idUsuario ? 'none' : colors.black,
                                                borderRadius: '100%',
                                                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)'
                                            }}>
                                            <img width={70} height={70} src={'media/Conquistas/' + item.id + ".svg"}
                                                style={{
                                                    opacity: item.idUsuario ? 1 : 0.4,
                                                }} />
                                        </div>
                                        <div style={{
                                            fontSize: 18,
                                            fontWeight: 600,
                                        }}>
                                            {item.titulo}
                                        </div>
                                        <div style={{
                                            fontSize: 14,
                                        }}>
                                            {item.descricao}
                                        </div>
                                        <div style={{
                                            fontSize: 14,
                                        }}>
                                            +{item.pontuacao}pts
                                </div>
                                    </div>
                                </Grid>
                            )
                    }

                    )}


                </Grid>


            </Card>

        </div>
    );
}
