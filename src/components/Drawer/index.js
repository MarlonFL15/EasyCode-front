import React, {useState} from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Menu, Tooltip, MenuItem, IconButton } from '@material-ui/core';
import { useHistory, useLocation } from "react-router-dom";
import colors from '../Colors.js'
// Import de icons
import ExtensionIcon from '@material-ui/icons/Extension';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PieChartIcon from '@material-ui/icons/PieChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CodeIcon from '@material-ui/icons/Code';
import EBIcon from '../assets/easyblock-icon.svg'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const drawerWidth = [200, 68];
const topbarHeight=65;

const SideTooltip = withStyles((theme) => ({
    tooltip: {
      [theme.breakpoints.up('md')]: {
          display: 'none'
      }
    },
  }))(Tooltip);

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
        boxShadow: '0 0 15px rgba(38, 100, 208, 0.6)',
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
        display: 'flex'
    },
    icon: {
        backgroundColor: colors.red,
        height: 35,
        width: 35,
        borderRadius: 7,
        marginRight: 7
    },
    button:{
        height: 35,
        width: 35
    },
    menu: {
        marginTop: 10,
        transition: theme.transitions.create(["transform"], {
            duration: theme.transitions.duration.short
        })
    },
    iconDown: {
        transition: theme.transitions.create(["transform"], {
            duration: theme.transitions.duration.short
        })
    },
    iconRotate: {
        transition: theme.transitions.create(["transform"], {
            duration: theme.transitions.duration.short
        }),
        transform: "rotate(-180deg)",
    }
}))

const container = makeStyles((theme)=> ({
    box: {
        paddingTop: topbarHeight,
        position: 'absolute',
            height:  '100%',
            width:  '100%',
        [theme.breakpoints.down('xl')]: {
            paddingLeft: drawerWidth[0]+15,
          
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft: drawerWidth[1]+15,
        },
        transition: theme.transitions.create(['paddingLeft'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    }
    
}))

const StyledMenu = withStyles({
    paper: {
      backgroundColor: colors.blue,
      color: '#FFF',
      borderRadius: 2,
      fontFamily: 'Nunito, sans-serif'
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  
  const StyledMenuItem = withStyles((theme) => ({
    root: {
       fontFamily: 'Quicksand, sans-serif',
    },
  }))(MenuItem);

function TopBar(){
    const classes = topbar()
    const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
    return(
        <nav className={classes.topBarBox}>
            
            <StyledMenu
            className={classes.menu}
            id="menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}            
            >
                <StyledMenuItem onClick={handleClose}>Profile</StyledMenuItem>
                <StyledMenuItem onClick={handleClose}>My account</StyledMenuItem>
                <StyledMenuItem onClick={handleClose}>Logout</StyledMenuItem>
            </StyledMenu>
            <div className={classes.perfil}>
                <div className={classes.icon}>
                </div>
                <IconButton className={classes.button} aria-controls="menu" aria-haspopup="true" onClick={handleClick}>
                    <ArrowDropDownIcon className={anchorEl?classes.iconRotate:classes.iconDown}/>
                </IconButton>         
            </div>
        </nav>
    )
}

function SideBar(){
    const classes = sidebar()
    const [ ativo, setAtivo ] = useState(useLocation().pathname) 
    
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
                <SideTooltip title={props.name} placement="right">
                 {props.icon}
                </SideTooltip>
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
                <SideBarItem name="Blocos" link='/blocos' icon={<ExtensionIcon titleAcess="teste"/>}/>
                <SideBarItem name="Questões" link='/questoes' icon={<CodeIcon/>}/>    
            </div>
            <SideBarItem name="Sair"  link="/"  icon={<ExitToAppIcon/>} />
            
        </Grid>
    )
}

export default function Drawer(props){
    const classes = container()
    return (
        <div style={{height:'100%'}}>
            <SideBar/>
            <TopBar/>
            <div className={classes.box} style={{height:'100%'}}>
                {props.children}
            </div>
        </div>
    )
}