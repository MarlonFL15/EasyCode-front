import React, { useEffect, useState } from 'react'
import axios from '../../bd/client'
import { useHistory, useLocation, BrowserRouter } from "react-router-dom";
import { withStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import {getToken} from '../auth'
import Iframe from 'react-iframe'

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
    subtitle: {
        fontFamily: 'Quicksand, sans-serif',
        fontSize: 28, 
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
        }).catch(e => {

        })

        const messageReceived = function(e){
            window.removeEventListener("message", messageReceived, false);
            alert("Parabéns, você completou tudo")
            axios.post('tabela-verdade', {
                idUsuario: getToken(), 
                idQuestao: id
            }).then(response => {
                console.log(response.data)
                if(response.data.conquista.length != 0){
                    var event = new CustomEvent('achievement',  {'detail': {
                        conquista: response.data.conquista
                    }})
                    window.dispatchEvent(event)
                }
                history.push('/tabelas-verdade')
            })
            

        }
        window.addEventListener("message", messageReceived, false)

    }, [0])
    return (
        <div>
            <div className={classes.title}>{titulo} - <span className={classes.subtitle}>{nivel}</span></div>
            <div className={classes.descricao}>{descricao}</div>
            <Iframe
                src={"/Tabela-Verdade/questions/" + url + ".html"}
                width="100%"
                height="650px"
                display="initial"
                border="0"
                frameBorder="0"
                position="relative"
                overflow="hidden"
            />
        </div>

    )
}