import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Constants } from '../../../lib';

function TitleViewComponent(){
    return (
       <Row className="mx-0 align-items-center justify-content-center">
           <Col className="ml-sm-5">
                <h2 className="text-primary">{Constants.SiteName}</h2>
                <p className="d-sm-block d-none">A place for sightless persons to make learning easier.</p>
           </Col>
       </Row>
    )
}

export const TitleView = React.memo(TitleViewComponent);