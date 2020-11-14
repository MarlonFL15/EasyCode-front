import React, { useState }  from 'react'
import colors from '../Colors'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Divider, TextField, Button, Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios  from '../../bd/client';
import Axios from 'axios'
import { Redirect, useHistory } from "react-router-dom";
import SignUpSVG from '../assets/signup-easyblock.svg'
import SignUp from '../assets/sign-up.svg'
import {login} from '../auth'

const AddTextField = withStyles({
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

const AddButton = withStyles({
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
    right: {
        backgroundColor: "#FFF",
        borderRadius: '20px 0 0 20px',
        padding: 25,
        [theme.breakpoints.down('xs')]: {
            borderRadius: 0,
        }
    },
    left: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
        padding: 30,
        margin: 'auto 0',
        textAlign: 'center',
        '& img': {
            height: 400
        },
        color: "#FFF",
    },
    title: {
        fontFamily: 'Quicksand, sans-serif',
        fontSize: 30,
        fontWeight: 800,
    },
    subtitle: {
        fontFamily: 'Nunito, sans-serif',
        fontSize: 20,
        opacity: .75,
        fontWeight: 500,
    },
    addContent: {
        fontFamily: 'Nunito, sans-serif',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
}))
export default function Login(){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
            
    const [name, setName] = useState('')
    const [foto, setFoto] = useState(null)
    const [error, setError] = useState({})
    const history = useHistory()
    const changeEmail = (event) =>{
        setEmail(event.target.value)
    }
    const changeSenha = (event) =>{
        setSenha(event.target.value)
    }

    const changeFoto = (event) =>{  
        setFoto(event.target.files)
        
    }

    const changeConfirmarSenha = (event) =>{
        setConfirmarSenha(event.target.value)
    }
    const changeName = (event) =>{
        setName(event.target.value)
    }
    
    const valida = (data) =>{
        const errorLocal = {email:'', nome:'', senha:'', confirmarSenha:''}
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
        if(data.senhaConfirm != data.senha) 
            errorLocal.confirmarSenha = 'As senhas precisam ser iguais'
        if(data.nome.length < 5) 
            errorLocal.nome = 'O nome deve conter mais de 5 letras'
        if(data.senha.length < 5) 
            errorLocal.senha = 'A senha deve conter mais de 5 letras'
      
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(data.email))
            errorLocal.email = 'Insira um e-mail válido'
        
        if(errorLocal.senha || errorLocal.email || errorLocal.nome || errorLocal.confirmarSenha){
            setError(errorLocal)
            return false;
        }  
        //verifica se já existe algum usuário cadastrado
        return true
        
    }
    const submit = (event) => {
        
        const data = {
            email:email,
            senha:senha,
            nome:name ,
            senhaConfirm:confirmarSenha,
            foto:null,
            pathFoto:null,
            google:false
        }
        
        if(valida(data)){
            axios.post('/getUserEmail', data).then(
                function(response){
                    if(response.data.result){
                        setError({email:'Email já está cadastrado no sistema'})
                        return false;
                    }
                    else{
                        if(!!foto){    
                            let reader = new FileReader();
                            reader.readAsDataURL(foto[0]);
                            reader.onloadend = () => {
                                data.foto = reader.result
                                axios.post('addUser', data).then(function(response){
                                    //console.log('caiu aqui no log')
                                    login(response.data.insertId)
                                    //console.log(response)
                                    history.push("/dashboard")
                                })
                            }
                            reader.onerror = () =>{
                                alert('error')
                            }
                        }
                        else{
                            //alert('entrou aqui no else')
                            axios.post('addUser', data).then(function(response){
                                //console.log('caiu aqui no log')
                                //console.log(response)
                                login(response.data.insertId)
                                history.push("/dashboard")
                            })
                        }
                    }
                        
                }
            )
            
        }
    }
    const classes = useStyles()

    return (
        <Grid container
        style={{
            height: '100%',
            display: 'flex',
            position: 'absolute',
            margin: 0,
            padding: 0,
            // overflow: 'hidden',
            backgroundColor: colors.gray
        }}
        justify="flex-end"
        >
            <Grid item 
            className={classes.left}
            item xs={12} sm={6} md={8} >
                <Grid item xs={12}>
                    <img src={SignUp} style={{ width: '100%'}}/>
                </Grid>  
                <Grid item xs={12}>
                    <h4 className={classes.title}>Pratique programação de uma forma divertida!</h4>
                    <div className={classes.subtitle}>Encontre questões variadas para você resolver</div>

                </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={4}
            className={classes.right}>
                <div className={classes.addContent}>
                    <img src={SignUpSVG} style={{textAlign: 'center'}}/>
                    <Typography variant="h6" style={{textAlign: 'center', fontFamily: 'Quicksand, sans-serif', margin: '15px 0'}}>
                                Cadastrar em <b style={{color: colors.blue}}>EasyCode</b>
                            </Typography>

                    <Divider light />
                    <form className={classes.form}>
                        {/**Label que aponta para o input de foto */}
                        {/* <label for="foto">Testando</label> */}
                        
                        <AddTextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="nome"
                            label="Nome"
                            name="nome"
                            size="small"
                            autoComplete="name"
                            autoFocus
                            value = {name}
                            error = {error.nome ? true: false}
                            helperText = {error.nome ? error.nome: false}
                            onChange = {(event) => changeName(event)}
                        />
                        <AddTextField
                            variant="outlined"
                            margin="normal"
                            // required
                            fullWidth
                            size="small"
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value = {email}
                            error = {error.email ? true: false}
                            helperText = {error.email ? error.email: false}
                            onChange = {(event) => changeEmail(event)}
                        />
                        <AddTextField
                            variant="outlined"
                            margin="normal"
                            // required
                            fullWidth
                            size="small"
                            id="senha"
                            label="Senha"
                            name="senha"
                            type="password"
                            autoComplete="current-password"
                            error = {error.senha ? true: false}
                            helperText = {error.senha ? error.senha: false}
                            value = {senha}
                            onChange = {(event) => changeSenha(event)}
                        />
                        <AddTextField
                            variant="outlined"
                            margin="normal"
                            // required
                            fullWidth
                            size="small"
                            id="senha"
                            label="Confirmar senha"
                            name="senhaConfirm"
                            type="password"
                            autoComplete="current-password"
                            error = {error.confirmarSenha ? true: false}
                            helperText = {error.confirmarSenha ? error.confirmarSenha: false}
                            value = {confirmarSenha}
                            onChange = {(event) => changeConfirmarSenha(event)}
                        />
                        {/*
                        <AddTextField
                            variant="outlined"
                            margin="normal"
                            // required
                            fullWidth
                            size="small"
                            id="foto"
                            name="foto"
                            type="file"
                            onChange = {(event) => changeFoto(event)}
                        />*/}
                        <Box mt={2}>
                            <AddButton variant="contained" color="primary" fullWidth margin="dense" onClick={(event) =>submit(event)}> 
                                Cadastrar
                            </AddButton>
                        </Box>
                        
                    </form>
            </div>
            </Grid>
        </Grid>
    )
}