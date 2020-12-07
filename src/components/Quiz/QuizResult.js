import { Button, Card, Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import { useLocation } from 'react-router-dom'
import colors from '../Colors'
import GraficoSubmissoes from '../Dashboard/GraficoSubmissoes'

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

  

export default function QuizResult(props) {
    const location = useLocation()
    const { quiz } = location.state
    const qtdQuestoes = quiz.questoes
    const acertos = quiz.acertos
    const resultado = acertos/ qtdQuestoes * 100
    var stars=[false, false, false]
    localStorage.setItem('headerWhite', false)

    if(resultado!==0) stars[0] = true
    if(resultado>50) stars[1] = true
    if(resultado===100) stars[2] = true

    const classes = useStyles()
    const headerColor = resultado === 100 ? colors.green : resultado >= 50 ? colors.blue : colors.red
    
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
                <Grid container style={{ height: '100%' }}>


                    <img style={{
                        display: 'block',
                        width: 150, height: 270,
                        margin: '0 auto',
                        marginTop: -130, marginBottom: 0
                    }} src={require('./ResultOver50.svg')} />


                    <Grid container item sm={12}>
                        <Grid xs={12} item md={6} style={{ margin: 'auto', textAlign: 'center', paddingBottom: 50}}>
                            
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                {stars.map((item, i)=>
                                    <img
                                    style={{
                                        width: i===1?60:40,
                                        marginTop: 'auto'
                                    }}
                                    src={require(item?'./StarFull.svg':'./StarDisabled.svg')}/>)}
                            </div>
                            <div
                                style={{
                                    fontSize: 25,
                                    fontWeight: 600,
                                }}>Você acertou {acertos} das {qtdQuestoes} questões</div>
                            <div>Continue assim!</div>

                        </Grid>

                        <Grid item xs={12} md={6} style={{ height: '100%', padding: '50px 0', display: 'flex' }}>
                            <div style={{ width: '100%', maxWidth: 500, margin: '0 auto' }}>
                                <GraficoSubmissoes />

                            </div>
                        </Grid>
                    </Grid>

                    <Grid container item xs={12} className={classes.buttonRow} style={{ marginTop: 'auto' }}>
                        <Grid item xs={12} md={2}>
                            <Button variant="contained"
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
                                    style={{
                                        padding: '10px 40px',
                                        background: 'transparent',
                                        color: colors.blue,
                                        fontSize: 16,
                                        fontWeight: 600,
                                        letterSpacing: 1.3,
                                    }}>Voltar para o menu</Button>
                            </Grid>
                            <Grid item style={{ textAlign: 'end' }}>

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
                            </Grid>

                        </Grid>

                    </Grid>
                </Grid>

            </Card>



        </div>
    )
}