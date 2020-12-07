import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import TopBar from '../Header/index.js';
import Header from '../Header/index.js'

const PrivateRoute = (props) =>{
    const isLogged = true
    // !!localStorage.getItem('app-token')
    return (isLogged ? <>
            {props.noHeader?null:<TopBar/>}
            <Route {...props} />
       </>
        :
        <Redirect to="/login"/>)
}

export default PrivateRoute;