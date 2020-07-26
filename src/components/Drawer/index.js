import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import colors from '../Colors.js'

// Import de icons
import ExtensionIcon from '@material-ui/icons/Extension';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PieChartIcon from '@material-ui/icons/PieChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CodeIcon from '@material-ui/icons/Code';
import EBIcon from '../assets/easyblock-icon.svg'

const drawerWidth = [200, 68];
const topbarHeight=50;

const sidebar = makeStyles((theme) => ({
    sidebarBox: {
        position: 'fixed',
        backgroundColor: colors.blue,
        display: 'block',
        overflow: 'hidden',
        height: '100%',
        top: 0,
        zIndex: 3,
        borderRadius: '0 15px 15px 0',
        [theme.breakpoints.down('xl')]: {    
            width: drawerWidth[0],
            padding: '30px 14px'
        },
        [theme.breakpoints.down('sm')]: {
            width: drawerWidth[1],
            padding: '30px 16px'
        },
        transition: theme.transitions.create(['width', 'padding'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
    },
    text: {
        marginLeft: 20,
       
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
        fontFamily: 'Quicksand, sans-serif',
    },
    title: {
        marginLeft: 20,
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
        fontFamily: 'Nunito, sans-serif',
    },
    list: {
        display: 'flex',
        color: '#FFF',
        marginBottom: 20,
        padding: 6,
        borderRadius: 10,
        cursor: 'pointer',
        [theme.breakpoints.down('xl')]: {
            padding: '6px 20px',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '6px',
        },
        transition: theme.transitions.create(['padding'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
    },
    middle: {
        height: 'calc(100% - 80px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: 240,
    },
}))
const topbar = makeStyles((theme) => ({
    topBarBox: {
        position: 'fixed',
        // height: topbarHeight,
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
        padding: 15,
        background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 80%, rgba(255,255,255,0) 100%);',
        zIndex: 2,
        [theme.breakpoints.down('xl')]: {
            top: 0,
            paddingLeft: drawerWidth[0],
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft: drawerWidth[1],
        },
        transition: theme.transitions.create(['left'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        
    },
    perfil: {

    }
}))

const container = makeStyles((theme)=> ({
    box: {
        paddingTop: topbarHeight,
        [theme.breakpoints.down('xl')]: {
            paddingLeft: drawerWidth[0],
          
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft: drawerWidth[1],
        },
        transition: theme.transitions.create(['paddingLeft'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    }
    
}))

function TopBar(){
    const classes = topbar()
    return(
        <nav className={classes.topBarBox}>
            <div className={classes.perfil}>
                Perfil
            </div>
        </nav>
    )
}

function SideBar(){
    const classes = sidebar()
    const [ ativo, setAtivo ] = useState('/dashboard') 
    
    function SideBarItem(props){
        const history = useHistory()

        return (
            <div className={classes.list}
            onClick={(event) =>{
                setAtivo(props.link)
                history.push(props.link)    
            }} 
            style={{backgroundColor: ativo===props.link?'rgba(0, 0, 0, 0.2)':'rgba(0, 0, 0, 0)'}}
            >
                <div>
                    {props.icon}
                </div>
                <div className={classes.text}>
                    {props.name}
                </div>
            </div>
        )
    }

    return(
        <Grid container className={classes.sidebarBox}>
            <div className={classes.list}>
                <div style={{marginLeft: -5}}>
                    <img src={EBIcon} alt="Bloco azul com carinha fofa" />
                </div>
                <div className={classes.title}>
                    <b>EASYCODE</b>
                </div>
            </div>
            <div className={classes.middle}>
                <SideBarItem name="Inicio" link='/dashboard' icon={<DashboardIcon/>}/>
                <SideBarItem name="Roleta" link='/roleta' icon={<PieChartIcon/>}/>
                <SideBarItem name="Blocos" link='/blocos' icon={<ExtensionIcon/>}/>
                <SideBarItem name="Questões" link='/questoes' icon={<CodeIcon/>}/>    
            </div>
            <SideBarItem name="Sair"  link="/"  icon={<ExitToAppIcon/>} />
            
        </Grid>
    )
}

export default function Drawer(props){
    const classes = container()
    return (
        <div>
            <SideBar/>
            <TopBar/>
            <div className={classes.box}>
                {props.children}
            </div>
        </div>
    )
}