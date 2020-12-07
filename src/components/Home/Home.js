import { Card, Grid, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import colors from '../Colors'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        width: '100%',
        height: 'auto',
        backgroundColor: colors.blue
    }
}))

export default props => {
    const classes = useStyles()


    return (
        <div className={classes.root}>
            <nav>
                <Link to="/login">
                    Login
            </Link>
                <br />
                <Link to="/cadastro">
                    Cadastrar
            </Link>
            </nav>

            <Grid container style={{ padding: 30 }}>
                <Grid item sm={6} style={{
                    height: 300,
                    fontSize: 25,
                    color: '#ffffff',
                    fontWeight: 600,

                }}>

                    EasyCode é uma plataforma para te ajudar com a lógica de programação através da programação em blocos com o Blocky!

                </Grid>
                <Grid item sm={6}>
                    Imagem
                </Grid>
                <Grid item xs={12}>
                    <Card style={{
                        padding: 10,
                        width: '100%',
                        minHeight: 340,
                    }}>
                        <Grid container>
                            <Grid item xs={12} md={4}>
                                Quizzes
                    </Grid>
                            <Grid item xs={12} md={4}>
                                Programação em blocos
                    </Grid>
                            <Grid item xs={12} md={4}>
                                Tabelas-verdade
                    </Grid>
                        </Grid>
                    </Card>

                </Grid>
                <Grid item sm={12} style={{
                    height: 400,
                    textAlign: 'center',
                    paddingTop: 30
                }}>
                    <div
                        style={{
                            fontSize: 25,
                            color: '#ffffff',
                            fontWeight: 600,
                        }}>Acompanhe seu desempenho!</div>

                </Grid>

            </Grid>
            <footer
                style={{
                    backgroundColor: colors.black,
                    color: '#ffffff',
                    height: 200,
                    width: '100%',
                }}>
                Footer
                </footer>
        </div>
    )
}