import React from 'react';
import TopNavM from "../componentsM/navigationComponentsM/topNavM";
import { Jumbotron, Container, Row, Col } from "react-bootstrap"

export default class LicensePageM extends React.Component {
    render = () => {
        return (
            <div id='lisences'>
                <TopNavM />
                <Jumbotron className="mb-0">
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

                        <p id='headerFont'><b>React Device Detect</b></p>
                        <p id='textFont'>Copyright © 2017 duskload</p>
                        <a id='linkFont' href='https://github.com/duskload/react-device-detect/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>React Social Icons</b></p>
                        <p id='textFont'>Copyright © 2016 Vitaly Aminev</p>
                        <p id='textFont'>Copyright © 2015 Jake Trent</p>
                        <a id='linkFont' href='https://github.com/jaketrent/react-social-icons/blob/master/LICENSE.md' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>React Router</b></p>
                        <p id='textFont'>Copyright © 2016 - 2018 React Training</p>
                        <a id='linkFont' href='https://github.com/ReactTraining/react-router/blob/master/LICENSE' target='_blank' rel='noopener noreferrer'>MIT License</a><p></p><br />

                        <p id='headerFont'><b>ADD ALL LICENSES WHEN DEVELOPMENT ENDS, FOLLOW THE ABOVE FORMAT</b></p>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}