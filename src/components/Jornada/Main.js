import React from 'react';
import { withStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import { Card, CardMedia, Grid, Typography } from '@material-ui/core';

import colors from './../Colors'
import LoopIcon from '@material-ui/icons/Loop';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => createStyles({
    table: {
    },
    root: {
        overflow:'hidden',
        width: '100%',
        minHeight: 600,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
        width: 1000,
        marginBottom: 30,
        minWidth: 200,

    },
    seeAll: {
        fontFamily: 'Nunito, sans-serif',
        fontSize: 20,
        color: colors.blue,
        fontWeight: 500,
    },
    carrousel: {
        display: 'flex',
        position: 'relative',
        height:'100%',
        [theme.breakpoints.down('md')]:{
            display:'block'
        }
    }
}));

export default function Main() {
    const [value, setValue] = React.useState('')
    const [active, setActive] = React.useState(1)
    const classes = useStyles();
    const history = useHistory()

    const changeValue = (event) => {
        console.log('tá mudando')
        setValue(event.target.value)
    }
    // const Card = (props) => {
    //   const classes = useStyles();
    //   const { nome, icon, link, cor } = props.card;
    //   return (
    //     <Grid item className={classes.cardContainer} md={4} sm={6}  xs={12}
    //     >
    //         <div className={classes.card} onClick={(event) => {history.push(link); history.go(0)}}
    //         style={{backgroundColor: cor, boxShadow: '0 2px 7px ' + cor,}}>
    //           <div className={classes.cardIcon}>
    //             {icon}
    //           </div>
    //           <h5>{nome}</h5>
    //         </div>
    //     </Grid>
    //   )
    // }
    const themes = ['Sequência', 'Seleção', 'Repetição']

    return (
        <div className={classes.root}>
            <div className="top" style={{ padding: 7, background: colors.purple, width: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1, height: 500 }} />

            <h2 className={classes.title}>Escolha uma questão para praticar</h2>
            <div className={classes.carrousel} >
                <div style={{ overflow: 'hidden', width: '100%', position: 'absolute', top: 'calc(50% - 25px)', zIndex: -1, height: 50 }}>
                    <div
                        style={{
                            background: colors.gray,
                            height: '100%',
                            marginLeft: active === 0 ? '50%' : active === 1 ? 0 : '-50%',
                            width: '100%',
                        }}>

                    </div>
                </div>
                <div style={{ overflow: 'hidden', height: 'calc(100% - 100px)', width: 50 , background: colors.gray, position: 'absolute', top: 60, zIndex: -1, right:'calc(50% - 25px)',}}>
                </div>
                {themes.map((item, i) => {
                    const cardStyles = makeStyles((theme) => ({
                        root: {
                            border: 'none',
                            padding: 10,
                            position: 'relative',
                            width: 1000,
                            left: 1000 + 30 * i - 1030 * active,
                            transform: active === i ? 'scale(1)' : 'scale(0.96)',
                            height: 400,
                            cursor: active === i ? '' : 'pointer',
                            [theme.breakpoints.down('md')]:{
                                width: 500,
                                top: 30,
                                left:0,
                                marginBottom: 30
                            }
                        }
                    }))
                    const cClasses = cardStyles()
                    return (
                        <Card
                            className={cClasses.root}
                            onClick={() => {
                                if (active === i) {
                                    history.push('/jornada/assunto')
                                } else
                                    if (active > i) {
                                        setActive(active - 1)
                                    } else {
                                        setActive(active + 1)
                                    }
                            }}
                            variant="outlined"
                        >

                            {item}
                        </Card>
                    )
                })}
            </div>




        </div>
    );
}
