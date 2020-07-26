import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import Drawer from '../Drawer/index.js'

const PrivateRoute = (props) =>{
    const isLogged = true
    // !!localStorage.getItem('app-token')
    return (isLogged ? <Drawer><Route {...props}/></Drawer>:<Redirect to="/login"/>)
}

export default PrivateRoute;