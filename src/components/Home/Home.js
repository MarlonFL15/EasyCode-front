import React from 'react'
import { Link } from 'react-router-dom'
export default props => {
    return(
        <div>
            <Link to="/login">
                Login
            </Link>
            <br/>
            <Link to="/cadastro">
                Cadastrar
            </Link>
        </div>
    )
}