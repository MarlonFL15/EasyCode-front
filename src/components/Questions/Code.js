import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles({
  root: {
    height:'100%',
    display:'flex',
    flexDirection:'column',
    padding:15,
    paddingTop:5
  },
  code:{
    marginTop:15,
    width: '100%',
    height:'100%',
    resize: 'none'
  }
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const [lang, setLang] = useState('C')
  const change = (event) =>{
    setLang(event.target.value)
    props.changeLanguage(event)
  }
  return (
    <Card className={classes.root}>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={lang}
          onChange = {(event) => change(event)}
        >
          <MenuItem value={'Javascript'}>JavaScript</MenuItem>
          <MenuItem value={'Python'}>Python</MenuItem>
          <MenuItem value={'PHP'}>PHP</MenuItem>
          <MenuItem value={'Dart'}>Dart</MenuItem>
          <MenuItem value={'Lua'}>Lua</MenuItem>
          <MenuItem value={'C'}>C</MenuItem>
        </Select>
      </FormControl>
      <textarea className={classes.code} disabled id="code">

      </textarea>
    </Card>
  );
}