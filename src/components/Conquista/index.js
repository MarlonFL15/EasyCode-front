import React, {useState, useEffect} from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import axios from '../../bd/client'
import { isNumber } from 'blockly';
import { getToken } from '../auth';

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
    const [titulo, setTitulo] = useState('')
    const [ids, setIds] = useState([])
    const classes = useStyles()

    useEffect(() => {
        
        window.addEventListener('achievement', function(e){
            
            console.log(isNumber(e.detail.conquista))

            if(isNumber(e.detail.conquista))
                e.detail.conquista = [e.detail.conquista]

            console.log(e.detail.conquista)
            setIds(e.detail.conquista)
            open_func(e.detail.conquista)

        }, false)
    }, [])

    const open_func = (ids) => {
        const current = ids[0]
        //alert(current)
        axios.get("conquista/"+current).then(response => {
            
            setTitulo(response.data[0].titulo)
            setOpen(true)
            setTimeout(function(e){
                setOpen(false)
                if(ids.length != 1)
                    open_func(ids.splice(1))
            axios.post('insertConquista', {
                idUsuario: getToken(),
                idConquista: current
            })
            }, 3000)
        })
    }
    
    const handleClose = (e) => {
        setOpen(false)
    }
    
    function pause(milliseconds) {
        var dt = new Date();
        while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
    }
    return(
        open?
        <div className={classes.root}>
            <img src="/media/Conquistas/1.svg"></img>
            {titulo}
        </div>:false
      
    )
}