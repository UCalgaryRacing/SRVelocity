import React from 'react';
import '../../styling/defaultDash.css';
import GraphBox from '../graphBox';
import { Row, Col } from 'react-bootstrap';

export default class DefaultDash extends React.Component {
    render = () => {
        return (
            <div id='defaultDash'>
                <Row>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='RPM' units='RPM'/>
                    </Col>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Air To Fuel' units=''/>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Manifold Air Pressure' units='kPa'/>
                    </Col>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Throttle Position' units='%'/>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Engine Temperature' units='&deg;C'/>
                    </Col>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Oil Temperature' units='&deg;C'/>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Fuel Temperature' units='&deg;C'/>
                    </Col>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Intake Air Temperature' units='&deg;C'/>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Oil Pressure' units='kPa'/>
                    </Col>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Barometer' units='kPa'/>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Injector Pulse Width' units='seconds'/>
                    </Col>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Suspension' units='mm'/>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Acceleration' units='g'/>
                    </Col>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Roll' units='&deg;'/>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Pitch' units='&deg;'/>
                    </Col>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Yaw' units='&deg;'/>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Speed' units='km/h'/>
                    </Col>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Distance' units='m'/>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Track Map' units=''/>
                    </Col>
                </Row>
            </div>
        );
    }
}