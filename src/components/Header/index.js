import React, { useEffect, useRef, useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Menu, Tooltip, MenuItem, IconButton } from '@material-ui/core';
import { useHistory, useLocation, BrowserRouter, Link } from "react-router-dom";
import colors from '../Colors.js'
// Import de icons
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import clsx from "clsx";

const topbarHeight = 50;

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

export default function TopBar(props) {
    const [ddOpen, setDDopen] = React.useState(false);
    // localStorage.getItem('headerWhite') ? true : 
    const white = false;

    const topbar = makeStyles((theme) => ({
        topBarBox: {
            position: 'absolute',
            top: 0,
            left: 0,
            height: topbarHeight,
            display: 'flex',
            padding: '0 40px',
            width: '100%',
            '& > * > *': {
                color: white ? '#0000000' : '#ffffff',
                textDecoration: 'none',
            },
            justifyContent: 'space-between',
            background: white ? '#FFFFFF' : 'transparent',
            zIndex: 2,
            transition: theme.transitions.create(['left'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        perfil: {
            display: 'flex',
            alignItems: 'center',
            '& > *': {
                color: white ? '#000000' : '#ffffff',
                textDecoration: 'none',
                padding: '0 10px'
            },
            [theme.breakpoints.down('sm')]: {
                display: 'none'
            }
        },
        icon: {
            backgroundColor: colors.red,
            height: 35,
            width: 35,
            borderRadius: '100%',
            marginRight: -5
        },
        button: {
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
            color: white ? '#0000000' : '#ffffff',
            transition: theme.transitions.create(["transform"], {
                duration: theme.transitions.duration.short
            })
        },
        iconRotate: {
            color: white ? '#0000000' : '#ffffff',
            transition: theme.transitions.create(["transform"], {
                duration: theme.transitions.duration.short
            }),
            transform: "rotate(-180deg)",
        },
        dropdownButton: {
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            color: '#ffffff',
            [theme.breakpoints.up('md')]: {
                display: 'none'
            }
        },
        dropdownContainerClosed: {
            height: 0,
            overflow: 'hidden',
            transition: theme.transitions.create(['height'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        dropdownContainerOpen: {
            height: 230,
            transition: theme.transitions.create('height', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        dropdownContainer: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            display: 'block',
            zIndex: 10,
            // padding: '0 40px',
            overflow: 'hidden',
            backgroundColor: colors.gray,
            transition: theme.transitions.create('height', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            [theme.breakpoints.up('md')]: {
                display: 'none',
                // setDDopen(false)
            },
            '& >*': {
                textDecoration: 'none',
                color: colors.black,
            },
            '& >*>*': {
                textDecoration: 'none',
                color: colors.black
            }
        },
        linksDropdown: {
            textAlign: 'center',
            width: '100%',
            paddingTop: 5,
            color: '#ffffff',
            height: 30,
            '&:hover': {
                color: colors.blue,
                fontWeight: 600
            }
        },
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: colors.black,
            zIndex: 9,
            opacity: 0.3,
            display: ddOpen ? 'flex' : 'none',
            [theme.breakpoints.up('md')]:{
                display:'none'
            }
        }
    }))

    const classes = topbar()
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
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

            <nav
                className={classes.topBarBox}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Link to="/" style={{ display: 'flex' }}>
                        <img src={require('../assets/bloquinhoIcon.svg')}
                            style={{
                                width: 20,
                                marginRight: 10
                            }}></img>

                        <div>Easycode</div>
                    </Link>
                    <div className={classes.perfil}>

                        <Link to="/dashboard">
                            Início
                    </Link>

                        <Link to="/quiz">
                            Quizes
                    </Link>
                        <Link to="/questoes">
                            Blocos
                    </Link>
                        <Link to="/tabelas-verdade">
                            Tabela-verdade
                    </Link>
                    </div>
                </div>
                <div className={classes.perfil}>
                    <div className={classes.icon}>
                    </div>
                    <IconButton className={classes.button} aria-controls="menu" aria-haspopup="true" onClick={handleClick}>
                        <ArrowDropDownIcon className={anchorEl ? classes.iconRotate : classes.iconDown} />
                    </IconButton>
                </div>
                <div className={classes.dropdownButton}
                    onClick={() => {
                        setDDopen(!ddOpen)
                    }}>
                    <MenuRoundedIcon />
                </div>

            </nav>
            <div className={clsx(classes.dropdownContainer, {
                [classes.dropdownContainerOpen]: ddOpen,
                [classes.dropdownContainerClosed]: !ddOpen,
            })}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: colors.blue,
                    padding: '10px 40px',
                    color: '#ffffff'
                }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
                        <img src={require('../assets/bloquinhoIcon.svg')}
                            style={{
                                width: 20,
                                marginRight: 10,

                            }}></img>

                        <div>Easycode</div>
                    </Link>
                    <div onClick={() => { setDDopen(false) }}
                        style={{ color: '#ffffff' }}><CloseRoundedIcon /></div>
                </div>
                <div>
                    <Link to="/dashboard" onClick={() => setDDopen(false)}>
                        <div className={classes.linksDropdown}>Início</div>
                    </Link>
                    <Link to="/quiz" onClick={() => setDDopen(false)}>
                        <div className={classes.linksDropdown}>Quizes</div>
                    </Link>
                    <Link to="/questoes" onClick={() => setDDopen(false)}>
                        <div className={classes.linksDropdown}>Blocos</div>
                    </Link>
                    <Link to="/tabelas-verdade" onClick={() => setDDopen(false)}>
                        <div className={classes.linksDropdown}>Tabela-verdade</div>
                    </Link>
                    <Link to="/dashboard" onClick={() => setDDopen(false)}>
                        <div className={classes.linksDropdown}>Perfil</div>
                    </Link>
                    <Link to="/login" onClick={() => setDDopen(false)}>
                        <div className={classes.linksDropdown}>Sair</div>
                    </Link>
                </div>

            </div>
            <div className={classes.overlay} onClick={() => setDDopen(false)}>

            </div>

        </>
    )
}
