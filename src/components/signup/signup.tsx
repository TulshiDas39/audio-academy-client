import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Constants, UiRoutes } from '../../lib';
import { FormView, TitleView } from './subComponents';

function SignupComponent(){
    return (
        <Row className="h-100 no-gutters align-items-center flex-column flex-sm-row mr-1">
            <Col className="flex-grow-0 flex-grow-sm-1" xs sm={8}>
                <TitleView />
            </Col>
            <Col className="flex-grow-1" xs sm={4}>
                <FormView />
            </Col>
        </Row>
    )
}

const Signup = React.memo(SignupComponent);

export default Signup;