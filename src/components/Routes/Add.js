import React , {useState} from "react";
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'; 
import { Avatar, TextField, Button, Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios  from '../../bd/client';
import { Redirect, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        paddingTop: theme.spacing(6),
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
 const Add = function(props){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState({})
    const history = useHistory()
    const changeEmail = (event) =>{
        setEmail(event.target.value)
    }
    const changeSenha = (event) =>{
        setSenha(event.target.value)
    }
    
    const changeName = (event) =>{
        setName(event.target.value)
    }
    
    const valida = (data) =>{
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

        if(data.nome.length < 5) 
            errorLocal.nome = 'O nome deve conter mais de 5 letras'
        if(data.senha.length < 5) 
            errorLocal.senha = 'A senha deve conter mais de 5 letras'
      
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(data.email))
            errorLocal.email = 'Insira um e-mail válido'
        
        if(errorLocal.senha || errorLocal.email || errorLocal.nome){
            setError(errorLocal)
            return false;
        }  
        //verifica se já existe algum usuário cadastrado
        return axios.post('/getUserEmail', data).then(
            function(response){
                if(response.data.result){
                    setError({email:'Email já está cadastrado no sistema'})
                    return false;
                }
                else
                    return true;
            }
        )
        
    }
    const submit = (event) => {
        
        const data = {
            email:email,
            senha:senha,
            nome:name 
        }
        if(valida(data)){
            axios.post('addUser', data).then(function(response){
                localStorage.setItem('app-token',true)
                history.push("/user")
            }).catch(function(error){
                
            })
        }
    }
    
    const classes = useStyles();
     return(
        <ThemeProvider theme={theme}>
            <Container className={classes.paper} component="main" maxWidth="xs"> 
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h6">Cadastro</Typography>
            <form className={classes.form}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="nome"
                    label="Nome"
                    name="nome"
                    autoComplete="name"
                    autoFocus
                    value = {name}
                    error = {error.nome ? true: false}
                    helperText = {error.nome ? error.nome: false}
                    onChange = {(event) => changeName(event)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
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
                    label="senha"
                    name="senha"
                    type="password"
                    autoComplete="current-password"
                    error = {error.senha ? true: false}
                    helperText = {error.senha ? error.senha: false}
                    value = {senha}
                    onChange = {(event) => changeSenha(event)}
                />
                <Box mt={2}>
                    <Button variant="contained" color="primary" fullWidth margin="dense" onClick={(event) =>submit(event)}> 
                        Cadastrar
                    </Button>
                </Box>
                
            </form>
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

export default Add;