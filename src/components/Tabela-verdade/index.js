import React, { useEffect, useState } from 'react'
import axios from '../../bd/client'
import { useHistory, useLocation, BrowserRouter } from "react-router-dom";
import { withStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import { getToken } from '../auth'
import Iframe from 'react-iframe'
import { Card } from '@material-ui/core';
import colors from '../Colors';

const useStyles = makeStyles((theme) => createStyles({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
    subtitle: {
        fontFamily: 'Quicksand, sans-serif',
        fontSize: 20,
    },
    descricao: {
        marginBottom: 15
    }
}));

export default props => {
    const location = useLocation()
    const classes = useStyles()
    const history = useHistory()
    const [nivel, setNivel] = useState('')
    const [titulo, setTitulo] = useState('')
    const [url, setUrl] = useState('')
    const [descricao, setDescricao] = useState('')
    let id1 = location.state.id
    const [id, setId] = useState(id1)
    //alert(id1)

    useEffect(() => {
        axios.get('tabela-verdade/' + id).then(response => {
            console.log(response)
            setNivel(response.data[0].nivel)
            setTitulo(response.data[0].nome)
            setUrl(response.data[0].url)
            setDescricao(response.data[0].descricao)
            const nivel = response.data[0].nivel
            const messageReceived = (e) => {
                window.removeEventListener("message", messageReceived, false);
                alert("Parabéns, você completou tudo")

                axios.post('tabela-verdade', {
                    idUsuario: getToken(),
                    idQuestao: id,
                    pontuacao: nivel == 'Muito Fácil' ? 10 : nivel == 'Fácil' ? 25 : nivel == 'Normal' ? 50 : nivel == 'Difícil' ? 75 : 100
                }).then(response => {
                    console.log(response.data)
                    if (response.data.conquista.length != 0) {
                        var event = new CustomEvent('achievement', {
                            'detail': {
                                conquista: response.data.conquista
                            }
                        })
                        window.dispatchEvent(event)
                    }
                    history.push('/tabelas-verdade')
                })


            }
            window.addEventListener("message", messageReceived, false)
        }).catch(e => {

        })



    }, [0])
    return (
        <div className={classes.root} >
            <div className="top"
                style={
                    { padding: 7, background: colors.blue, width: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }
                }
            />

            <h2 className={classes.title} > {titulo} - < span className={classes.subtitle} > {nivel} </span></h2 >

            <Card variant="outlined"
                style={
                    { padding: '20px 30px', width: 'calc(100% - 100px)', border: 'none', minWidth: 300, marginBottom: 30 }
                } >
                <div className={classes.descricao} > {descricao} </div>
                <Iframe src={"/Tabela-Verdade/questions/" + url + ".html"}
                    width="100%"
                    height="650px"
                    display="initial"
                    border="0"
                    frameBorder="0"
                    position="relative"
                    overflow="hidden"
                />
            </Card> </div >


    )
}