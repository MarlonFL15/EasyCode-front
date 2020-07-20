import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
    width: '85%'
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  title: {
    fontSize:20
  },
  code:{
    marginTop:5,
    width:'100%',
    minHeight:50,
    resize: "none",
    padding:10
  },
  input:{
      marginTop:10
  }
}));

export default function ErrorRadios(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');

  const changeValue = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    props.change(event, props.id)
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value !== '') {
        console.log('vai pro próximo que é sucesso')
    } else {
      setHelperText('Responda uma das alternativas.');
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl component="fieldset" error={error} className={classes.formControl}>
        <div className={classes.title}>{props.titulo}</div>
        <div>{props.t}</div>
        {props.code?<textarea className={classes.code} disabled>{props.code}</textarea>:false}
        <TextField value={value} onChange={changeValue} size="small" className={classes.input} id="outlined-basic" label="Insira a resposta" />
        <FormHelperText>{helperText}</FormHelperText>
        
      </FormControl>
    </form>
  );
}