import React from 'react';
import TopNav from '../components/navigationComponents/topNav';
import BottomNav from '../components/navigationComponents/bottomNav';
import { Jumbotron, Row, Col, Container } from 'react-bootstrap';
import '../styling/licenses.css';

export default class LicensesPage extends React.Component {
    render = () => {
        return (
            <div id='licenses'>
                <TopNav/>
                <Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                                <p id='largeFont'><b>Licenses</b></p>
                            </Col>
                        </Row>

                        <p id='headerFont'><b>Bootstrap</b></p>
                        <p id='textFont'>Copyright © 2011 - 2019 Twitter, Inc.</p>
                        <p id='textFont'>Copyright © 2011 - 2019 The Bootstrap Authors</p>
                        <a id='linkFont' href='https://github.com/twbs/bootstrap/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>React</b></p>
                        <p id='textFont'>Copyright © Facebook, Inc. and its affiliates.</p>
                        <a id='linkFont' href='https://github.com/facebook/react/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>React Bootstrap</b></p>
                        <p id='textFont'>Copyright © 2014 - Present Stephen J. Collings, Matthew Honnibal, Pieter Vanderwerff</p>
                        <a id='linkFont' href='https://github.com/react-bootstrap/react-bootstrap/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />
                    </Container>
                </Jumbotron>
                <BottomNav/>
            </div>
        );
    }
}