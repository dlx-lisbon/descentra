import React from 'react';
import {
    Col,
    Grid,
    Row,
} from 'rsuite';


export default function Kudos() {
    return (
        <Grid fluid={true} style={{ padding: '50px' }}>
            <Row className="show-grid">
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
            </Row>
            <br />
            <Row className="show-grid">
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
                <Col xs={4}><img src="https://via.placeholder.com/100" alt="example" /></Col>
            </Row>
        </Grid>
    );
}
