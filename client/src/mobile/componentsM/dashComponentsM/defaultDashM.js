import React from 'react';
import '../../styling/dashM.css';
import GraphBoxM from '../graphComponentsM/graphBox';
import { Row, Col } from 'react-bootstrap';

export default class DefaultDashM extends React.Component {
    render = () => {
        return (
            <div id='defaultDash'>
                <Row>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBoxM title='RPM' units='RPM' />
                    </Col>
                </Row>
            </div>
        );
    }
}