import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'; 
import { Divider, TextField, Button, Grid } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import axios from  '../../bd/client';
import { useHistory } from "react-router-dom";
import colors from '../Colors'
import SignInSVG from '../assets/easyblock-signin.svg'

const LoginTextField = withStyles({
    root: {
        '& label': {
            color: colors.blue,
            fontWeight: 800,
            fontFamily: 'Quicksand, sans-serif',
          },
      '& label.Mui-focused': {
        color: colors.blue,

      },
      '& .MuiInput-underline:after': {
        borderBottomColor: colors.blue,
      },
      '& .MuiOutlinedInput-root': {
        backgroundColor: '#EAEAEA',
        borderRadius: 10,
        fontFamily: 'Nunito, sans-serif',
        
        '& fieldset': {
          border: 'none',
        },
        '&.Mui-focused fieldset': {
         border: '2px solid',
        borderRadius: 10,
          borderColor: colors.blue,
        },
      },
    },
  })(TextField);

const LoginButton = withStyles({
    root: {
      boxShadow: '0 1px 4px 0' + colors.blue,
      fontSize: 16,
      padding: '6px 12px',
      backgroundColor: colors.blue,
      fontWeight: 800,
      fontFamily: 'Quicksand, sans-serif',
      backgroundColor: colors.blue,
      '&:hover': {
        boxShadow: '0 1px 10px 0' + colors.blue,
        backgroundColor: colors.blue,
      },
    },
  })(Button);



const useStyles = makeStyles((theme)=>({
    left: {
        backgroundColor: "#FFF",
        borderRadius: '0 20px 20px 0',
        [theme.breakpoints.down('xs')]: {
            borderRadius: 0,
        },
        padding: 25,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    right: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    loginContent: {
        fontFamily: 'Nunito, sans-serif',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    link: {
        fontFamily: "Nunito, sans-serif",
        paddingTop: 10,
        fontSize: 15,
        fontWeight: 600,
        display: 'block'
    }
}))
export default function Login(){
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
    
    const classes = useStyles()

    return (
        <Grid container
        style={{
            height: '100%',
            display: 'flex',
            position: 'absolute',
            backgroundColor: colors.yellow
        }}
        >
            <Grid item xs={12} sm={6} md={4}
            className={classes.left}>
                <div className={classes.loginContent}>
                    <img src={SignInSVG}
                        style={{textAlign: 'center', }}/>
                        

                    <Typography variant="h6" style={{textAlign: 'center', fontFamily: 'Quicksand, sans-serif', margin: '15px 0'}}>
                        Entrar em <b style={{color: colors.blue}}>EasyCode</b>
                    </Typography>

                    <Divider light />
                    <form className={classes.form}>
                        {error.login ? 
                        <Alert severity="error">Email e/ou senha inválidos</Alert>:false}
                
                        <LoginTextField
                            variant="outlined"
                            margin="normal"
                            size="small"
                            // required
                            fullWidth
                            id="email"
                            label="E-mail"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value = {email}
                            error = {error.email ? true: false}
                            helperText = {error.email ? error.email: false}
                            onChange = {(event) => changeEmail(event)}
                        />
                        <LoginTextField
                            variant="outlined"
                            margin="normal"
                            size="small"
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
                        <LoginButton variant="contained" color="primary" fullWidth onClick={(event) => submit(event)}>
                            Login
                        </LoginButton>
                        
                    
                    </form>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2" className={classes.link}>Esqueceu sua senha?</Link>
                        </Grid>           
                    </Grid>
                </div>
            </Grid>
            <Grid 
            item xs={12} sm={6} md={8}
            item className={classes.right}>
                
            </Grid>
            
        </Grid>
    )
}