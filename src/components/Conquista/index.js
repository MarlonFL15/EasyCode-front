import React, {useState, useEffect} from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 200,
        position:'absolute', 
        left:'50%', 
        top:'5%', 
        'zIndex':9999,
        display: 'flex',
        alignItems:'center',
        backgroundColor:'#ccc',
        borderRadius: 25
    },
    
    icon: {
        width:50,
        height: 50,
        backgroundColor: 'red',
        borderRadius: 25,
        marginRight:5

    }
}));
  
export default props => {
    const [open, setOpen] = useState(false)
    const classes = useStyles()

    useEffect(() => {
        
        window.addEventListener('keydown', function(e){
            setOpen(true)
            setTimeout(function(){ setOpen(false)}, 3000);
        }, false)
    }, [])
    
    const handleClose = (e) => {
        setOpen(false)
    }
    
    return(
        open?
        <div className={classes.root}>
            <div className={classes.icon}></div>
            Conquista tal tal
        </div>:false
      
    )
}