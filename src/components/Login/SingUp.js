import React, { Component, useState } from "react";
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'; 
import { Avatar, TextField, Button, Grid } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import axios from  '../../bd/client';
import { Redirect, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        paddingTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
     
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor:'#054A91'
    },
    form:{
        width: '100%'
    }
  }));

const theme = createMuiTheme({
    palette: {
        primary: { 500: '#054A91' } ,
      },
});


const Login = function(){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [error, setError] = useState({})
    const history = useHistory()
    const changeEmail = (event) =>{
        setEmail(event.target.value)
    }
    const changeSenha = (event) =>{
        setSenha(event.target.value)
    }

    const valida = (data) => {
        const errorLocal = {email:'', nome:'', senha:''}
        setError(error)
        if(data.email == '') 
            errorLocal.email = 'Insira seu e-mail'
        if(data.nome == '') 
            errorLocal.nome = 'Insira seu nome'
        if(data.senha == '') 
            errorLocal.senha = 'Insira sua senha'
        
        if(errorLocal.senha || errorLocal.email || errorLocal.nome){
            setError(errorLocal)
            return false;
        }
        return true;
    }

    const submit = (event) => {
        const data = {
            email:email,
            senha:senha,
        }
        if(valida(data)){
            axios.post('/login', data).then(function(response){
                if(response.data.result){
                    localStorage.setItem('app-token',true)
                    history.push("/dashboard")
                }
                    
                else
                    setError({login:true})
            })
        }
    }
    
    const classes  = useStyles();
    return(
        <ThemeProvider theme={theme}>
            <Container className={classes.paper} component="main" maxWidth="xs"> 
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h6">Login</Typography>

            
            <form className={classes.form}>
                {error.login ? 
                <Alert severity="error">Email e/ou senha inválidos</Alert>:false}
           
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value = {email}
                    error = {error.email ? true: false}
                    helperText = {error.email ? error.email: false}
                    onChange = {(event) => changeEmail(event)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="senha"
                    label="Senha"
                    name="senha"
                    autoComplete="senha"
                    password
                    value = {senha}
                    error = {error.senha ? true: false}
                    helperText = {error.senha ? error.senha: false}
                    onChange = {(event) => changeSenha(event)}
                    
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Mantenha-me conectado"
                />
                <Button variant="contained" color="primary" fullWidth onClick={(event) => submit(event)}>
                    Login
                </Button>
                
            
            </form>
            <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">Esqueceu sua senha?</Link>
                </Grid>           
            </Grid>
        </Container>
    </ThemeProvider>
        
    )
 }

/**cores 
 * #054A91 (azul escuro)
 * #3E7CB1 (azul mais claro)
 * #81A4CD (azul ainda mais claro)
 * #DBE4EE (azul quase branco)
 * #F17300 (laranja)
*/

export default Login;