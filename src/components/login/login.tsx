import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Constants, Routes } from '../../lib';

function LoginComponent(){
    return (
        <Row>
            <Col className="border" xs sm={8}>
                <h1>{Constants.SiteName}</h1>
                <Link to={Routes.Privacy} >Privacy</Link>
            </Col>
            <Col className="border" xs sm={4}>
                Right
            </Col>
        </Row>
    )
}

const Login = React.memo(LoginComponent);

export default Login;