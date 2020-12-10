import { Card, Grid, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import colors from '../Colors'
import GraficoHabilidades from '../Dashboard/GraficoHabilidades'
import GraficoSubmissoes from '../Dashboard/GraficoSubmissoes'
import { Radar, Chart, Line } from 'react-chartjs-2';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        width: '100%',
        height: 'auto',
    },
    footer: {
        '& li, li a': {
            textDecoration: 'none',
            color: '#ffffff'
        },
        '& h3': {
            color: colors.blue
        }
    }
}))

export default props => {
    const classes = useStyles()

    Chart.defaults.global.defaultFontFamily = "Poppins";
    Chart.defaults.global.defaultFontColor = "#000000";
    return (
        <div className={classes.root}>

            <nav style={{
                display: 'flex',
                margin: '20px 30px', color: '#ffffff',
                justifyContent: 'space-between'
            }}>
                <div>


                    <img height={20} src={require('../assets/bloquinhoIcon.svg')} />
                    <span style={{ alignText: 'center', marginLeft: 10, fontSize: 18 }}>Easycode</span>
                </div>
                <div>
                    <Link to="/login" style={{ color: '#ffffff', textDecoration: 'none' }}>
                        Entrar
            </Link>
                    <Link to="/cadastro" style={{ color: colors.blue, backgroundColor: '#ffffff', textDecoration: 'none', border: '2px solid white', padding: '5px 10px', borderRadius: 9, marginLeft: '10px' }}>
                        Cadastrar
            </Link>
                </div>

            </nav>

            <Grid container style={{ padding: 30, zIndex: 1 }}>
                <Grid item sm={6} style={{
                    height: 300,
                    fontSize: 25,
                    color: '#ffffff',
                    fontWeight: 600,

                }}>

                    EasyCode é uma plataforma para te ajudar com a lógica de programação através da programação em blocos com o Blocky!
                </Grid>
                <Grid item sm={6} style={{ textAlign: 'center' }}>
                    <img height={240} src={require('../assets/sign-up.svg')} />
                </Grid>
                <Grid item xs={12}>
                    <Card style={{
                        padding: 10,
                        height: '100%',
                        minHeight: 340,
                        textAlign: 'center',
                        alignItems: 'center'
                    }}>
                        <Grid container style={{ height: '100%', margin: 5, height: '100%', padding: 30 }}>
                            <Grid item xs={12} md={4} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 10 }}>
                                <img height={150} src={require('../Dashboard/quiz.svg')} />
                                <h3>Quizes</h3>
                                <div>Responda questões teóricas sobre conceitos de lógica de programação</div>

                            </Grid>
                            <Grid item xs={12} md={4} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 10 }}>
                                <img height={150} src={require('../Dashboard/blocos.svg')} />
                                <h3>Programação em blocos</h3>
                                <div>Experimente a programação visual através do Blockly e resolva questões</div>

                            </Grid>
                            <Grid item xs={12} md={4} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 10 }}>
                                <img height={150} src={require('../Dashboard/tabela_verdade.svg')} />
                                <h3>Tabelas-verdade</h3>
                                <div>Resolva tabelas-verdade para treinar a sua lógica</div>

                            </Grid>
                        </Grid>
                    </Card>

                </Grid>
                <Grid item sm={12} style={{
                    // height: 450,
                    textAlign: 'center',
                    paddingTop: 30,
                    width: '100%',
                    maxWidth: 2000
                }}>
                    <div
                        style={{
                            fontSize: 25,
                            fontWeight: 600,
                        }}>Acompanhe seu desempenho!</div>
                    <Grid container spacing={3} style={{ display: 'flex', padding: 30 }}>
                        <Grid item xs={12} sm={6}>
                            <div>
                                <Radar
                                    style={{
                                    }}
                                    data={{
                                        fill: false,
                                        labels: ['Sequência', 'Seleção', 'Repetição'],

                                        datasets: [
                                            {
                                                label: 'Habilidades Práticas',
                                                data: [700, 100, 500],
                                                backgroundColor: 'rgba(38, 100, 208, 0.6)',
                                                borderColor: colors.blue

                                            },
                                            {
                                                label: 'Habilidades Teóricas',
                                                data: [600, 800, 300],
                                                backgroundColor: 'rgba(226, 5, 76, 0.6)',
                                                borderColor: colors.red
                                            }
                                        ],

                                    }}
                                    options={{
                                        legend: {
                                            position: 'right',
                                            display: false,
                                            labels: {
                                                fontFamily: "Poppins",
                                                fontColor: '#1b1c1a',
                                                fontWeight: 'bold'
                                            }
                                        },
                                        scale: {
                                            width: 1000,
                                            ticks: {
                                                suggestedMax: 100
                                            }
                                        },
                                        layout: {

                                            padding: {
                                                left: 0,
                                                right: 0,
                                                top: 0,
                                                bottom: 10
                                            }
                                        }
                                    }}


                                >
                                </Radar>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Line

                                data={{
                                    labels: ['1/12', '2/12', '3/12', '4/12', '5/12', '6/12', '7/12'],
                                    datasets: [
                                        {
                                            label: 'Submissões',
                                            fill: false,
                                            lineTension: 0.1,
                                            backgroundColor: 'rgba(38, 100, 208, 0.6)',
                                            borderColor: colors.blue,
                                            data: [2, 3, 5, 3, 9, 3, 2]
                                        },
                                        {
                                            label: 'Quiz',
                                            fill: false,
                                            lineTension: 0.1,
                                            backgroundColor: 'rgba(226, 5, 76, 0.6)',
                                            borderColor: colors.red,
                                            data: [2, 3, 4, 5, 2, 3, 1]
                                        }
                                    ]

                                }}

                                options={{
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                fontColor: '#666666',
                                                suggestedMin: 0,
                                                suggestedMax: 5 + 10
                                            }
                                        }]
                                    },
                                    legend: {
                                        position: 'right',
                                        display: false,
                                    },
                                }}
                            >
                            </Line>

                        </Grid>

                    </Grid>

                </Grid>

            </Grid>
            <footer
                style={{
                    backgroundColor: colors.black,
                    color: '#ffffff',
                    minHeight: 200,
                    padding: 30,
                    width: '100%',
                }}
                className={classes.footer}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignText: 'center' }}>
                        <img height={50} src={require('../assets/bloquinhoIcon.svg')} />
                        <h2 style={{ alignText: 'center', margin: '0 auto' }}>Easycode</h2>
                    </Grid>
                    <Grid container item sm={6} spacing={2}>
                        <Grid item xs={12} sm={12}>

                            <h3>Equipe</h3>
                            <ul style={{
                                '& li': {
                                    color: 'red'
                                }
                            }}>
                                <li>
                                    <a href='https://github.com/MarlonFL15' target='blank'>
                                        Marlon Faria</a>
                                </li>
                                <li>
                                    <a href='https://github.com/mnik3007' target='blank'>
                                        Monike Freitas</a>
                                </li>

                            </ul>
                        </Grid>
                        <Grid item sm={12}>
                            <h3>Localização</h3>
                            <ul>
                                <li>
                                    <a href='https://goo.gl/maps/hEkmvv2gVBFypU7g6' target='blank'>
                                        Sete de Setembro, 1975, IFAM, Manaus, AM - Brasil</a>
                                </li>
                            </ul>

                        </Grid>
                    </Grid>




                </Grid>
            </footer>
            <div style={{ position: 'absolute', display: 'block', top: 0, left: 0, width: '100%', height: 400, zIndex: -1, backgroundColor: colors.blue }} />
            <div style={{ position: 'absolute', display: 'block', top: 400, left: 0, width: '100%', zIndex: -1 }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#2664D0" fill-opacity="1" d="M0,320L48,304C96,288,192,256,288,213.3C384,171,480,117,576,122.7C672,128,768,192,864,218.7C960,245,1056,235,1152,234.7C1248,235,1344,245,1392,250.7L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
            </div>
        </div>
    )
}