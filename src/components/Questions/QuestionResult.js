import { Button, Card, Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import colors from '../Colors'


const useStyles = makeStyles((theme) => ({
    buttonRow: {
        justifyContent: 'space-between',

        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
            textAlign: 'center'
        }
    },
    buttonRowRight: {
        justifyContent: 'flex-end',
        textAlign: 'end',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
            textAlign: 'center'
        }
    },
}))



export default function QuestionResult(props) {
    const location = useLocation()
    const history = useHistory()
    const classes = useStyles()
    const { certo, id, saida, resultado } = location.state
  
    const headerColor = certo ? colors.green : colors.red

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div className="top" style={{
                padding: 7,
                background: headerColor,
                width: '100%',
                position: 'absolute',
                top: 0, left: 0,
                height: '50%',
                zIndex: -1
            }} />

            <Card variant="outlined" style={{
                marginTop: 150,
                padding: '10px 30px',
                width: 'calc(100% - 200px)',
                minWidth: 200,
                maxWidth: 1200,
                border: 'none',
                minWidth: 300,
                marginBottom: 30,
                overflow: 'visible'
            }}>
                <Grid container spacing={2} style={{ height: '100%' }}>


                    <img style={{
                        display: 'block',
                        width: 150, height: 270,
                        margin: '0 auto',
                        marginTop: -130, marginBottom: 0
                    }} src={require(certo?'../Quiz/ResultOver50.svg':'../Quiz/ResultUnder50.svg')} />


                    <Grid container item sm={12}>
                        <Grid xs={12} item md={6} style={{ margin: 'auto', textAlign: 'center', paddingBottom: 50 }}>
                            <div
                                style={{
                                    fontSize: 25,
                                    fontWeight: 600,
                                }}>{certo?'Você acertou!':'Você errou'}</div>
                            <div>{certo?'Continue assim!':'Continue tentando!'}</div>

                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <h3>Resultado</h3>
                        <Card variant="outlined"
                            style={{
                                border: 'none',
                                padding: 10,
                                backgroundColor: colors.background
                            }}>
                            {resultado}
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <h3>Saída esperada</h3>
                        <Card variant="outlined" style={{
                            border: 'none',
                            padding: 10,
                            backgroundColor: colors.background
                        }}>
                            {saida}
                        </Card>
                    </Grid>


                    <Grid container item xs={12} className={classes.buttonRow} style={{ marginTop: 'auto' }}>
                        <Grid item xs={12} md={2}>
                            <Button variant="contained"
                                onClick={(e) => history.push({
                                    pathname: '/questao',
                                    state: {
                                        id
                                    }
                                })}
                                style={{
                                    border: '3px solid ' + colors.blue,
                                    padding: '10px 40px',
                                    background: 'transparent',
                                    color: colors.blue,
                                    fontSize: 16,
                                    fontWeight: 600,
                                    letterSpacing: 1.3,
                                }}>Refazer</Button>
                        </Grid>


                        <Grid container item xs={12} md={10} className={classes.buttonRowRight}>
                            <Grid item xs={12} md={6} >

                                <Button
                                    onClick={(e) => history.push('/dashboard')}
                                    style={{
                                        padding: '10px 40px',
                                        background: 'transparent',
                                        color: colors.blue,
                                        fontSize: 16,
                                        fontWeight: 600,
                                        letterSpacing: 1.3,
                                    }}>Voltar para o menu</Button>

                            </Grid>
                            {/* <Grid item style={{ textAlign: 'end' }}>

                                <Button variant="contained"
                                    style={{
                                        backgroundColor: colors.blue,
                                        padding: '10px 40px',
                                        color: 'white',
                                        margin: '0',
                                        fontSize: 16,
                                        fontWeight: 500,
                                        letterSpacing: 1.3
                                    }}>PRÓXIMO</Button>
                            </Grid> */}

                        </Grid>

                    </Grid>
                </Grid>

            </Card>



        </div>
    )
}