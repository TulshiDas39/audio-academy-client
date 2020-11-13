import React from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../lib';

function LoginComponent(){
    return (
        <div>
            <h1>Login</h1>
            <Link to={Routes.Privacy} >Privacy</Link>
        </div>
    )
}

const Login = React.memo(LoginComponent);

export default Login;