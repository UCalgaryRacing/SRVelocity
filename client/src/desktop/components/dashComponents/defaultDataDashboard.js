import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Data from '../../../data';
import '../../styling/defaultDash.css';

export default class DefaultDataDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rpm: 0,
            atf: 0,
            map: 0,
            tp: 0,
            engineTemp: 0,
            oilTemp: 0,
            fuelTemp: 0,
            iat: 0,
            oilPres: 0,
            baro: 0,
            ipw: 0,
            voltage: 0,
            fl: 0,
            fr: 0,
            rl: 0,
            rr: 0,
            x: 0,
            y: 0,
            z: 0,
            roll: 0,
            pitch: 0,
            yaw: 0,
            speed: 0,
            distance: 0
        }
    }

    componentWillMount() {
        this.interval = setInterval(() => this.tick(), 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick = () => { //MAKE THIS WAAAY MORE EFFICIENT
        this.setState({
            rpm: Data.getInstance().getDataPoint('RPM'),
            atf: Data.getInstance().getDataPoint('Air To Fuel'),
            map: Data.getInstance().getDataPoint('Manifold Air Pressure'),
            tp: Data.getInstance().getDataPoint('Throttle Position'),
            engineTemp: Data.getInstance().getDataPoint('Engine Temperature'),
            oilTemp: Data.getInstance().getDataPoint('Oil Temperature'),
            fuelTemp: Data.getInstance().getDataPoint('Fuel Temperature'),
            iat: Data.getInstance().getDataPoint('Intake Air Temperature'),
            oilPres: Data.getInstance().getDataPoint('Oil Pressure'),
            baro: Data.getInstance().getDataPoint('Barometer'),
            ipw: Data.getInstance().getDataPoint('Injector Pulse Width'),
            voltage: Data.getInstance().getDataPoint('Battery Voltage'),
            fl: Data.getInstance().getDataPoint('Suspension')[2],
            fr: Data.getInstance().getDataPoint('Suspension')[3],
            rl: Data.getInstance().getDataPoint('Suspension')[0],
            rr: Data.getInstance().getDataPoint('Suspension')[1],
            x: Data.getInstance().getDataPoint('Acceleration')[0],
            y: Data.getInstance().getDataPoint('Acceleration')[1],
            z: Data.getInstance().getDataPoint('Acceleration')[2],
            roll: Data.getInstance().getDataPoint('Roll'),
            pitch: Data.getInstance().getDataPoint('Pitch'),
            yaw: Data.getInstance().getDataPoint('Yaw'),
            speed: Data.getInstance().getDataPoint('Speed'),
            distance: Data.getInstance().getDataPoint('Distance')
        })
    }

    render = () => {
        return (
            <div style={{ marginTop: '20px', marginRight: '15px', textAlign: 'center', color: '#FFF', fontWeight: '700' }}>
                <Row>
                    <Col>
                        <div style={{ backgroundColor: '#3CB44B' }}>
                            <p>RPM</p>
                            <p>{(this.state.rpm !== undefined)?this.state.rpm: '0'}</p>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ backgroundColor: (this.state.atf < 10.5 || this.state.atf >= 16)?'#C22D2D':(((this.state.atf > 10.5 && this.state.atf < 11.5)||(this.state.atf > 14.7 && this.state.atf < 16))?'#BDA800':'#3CB44B') }}>
                            <p>Air To Fuel</p>
                            <p>{(this.state.atf !== undefined)?this.state.atf: '0'}</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ backgroundColor: '#3CB44B' }}>
                            <p>Manifold Air Pressure (kPa)</p>
                            <p>{(this.state.map !== undefined)?this.state.map: 0}</p>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ backgroundColor: '#3CB44B' }}>
                            <p>Throttle Position (%)</p>
                            <p>{(this.state.tp !== undefined)?this.state.tp: 0}</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ backgroundColor: (this.state.engineTemp > 105 && this.state.engineTemp < 120)?'#BDA800':((this.state.engineTemp > 120)?'#C22D2D':'#3CB44B')}}>
                            <p>Engine Temp (˚C)</p>
                            <p>{(this.state.engineTemp !== undefined)?this.state.engineTemp: 0}</p>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ backgroundColor: (this.state.oilTemp > 110 && this.state.oilTemp < 125)?'#BDA800':((this.state.oilTemp > 125)?'#C22D2D':'#3CB44B') }}>
                            <p>Oil Temp (˚C)</p>
                            <p>{(this.state.oilTemp !== undefined)?this.state.oilTemp: 0}</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ backgroundColor: '#3CB44B' }}>
                            <p>Fuel Temp (˚C)</p>
                            <p>{(this.state.fuelTemp !== undefined)?this.state.fuelTemp: 0}</p>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ backgroundColor: '#3CB44B' }}>
                            <p>Intake Air Temp (˚C)</p>
                            <p>{(this.state.iat !== undefined)?this.state.iat: 0}</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ backgroundColor: (this.state.oilPres < 10)?'#C22D2D':'#3CB44B'}}>
                            <p>Oil Pressure (kPa)</p>
                            <p>{(this.state.oilPres !== undefined)?this.state.oilPres: 0}</p>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ backgroundColor: '#3CB44B' }}>
                            <p>Barometer (kPa)</p>
                            <p>{(this.state.baro !== undefined)?this.state.baro: 0}</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ backgroundColor: '#3CB44B' }}>
                            <p>Injector Pulse Width (seconds)</p>
                            <p>{(this.state.ipw !== undefined)?this.state.ipw: 0}</p>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ backgroundColor: '#3CB44B' }}>
                            <p>Battery Voltage (V)</p>
                            <p>{(this.state.voltage !== undefined)?this.state.voltage: '0'}</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ backgroundColor: '#3CB44B' }}>
                            <p>Front Left (mm)</p>
                            <p>{(this.state.fl !== undefined)?this.state.fl: 0}</p>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ backgroundColor: '#3CB44B' }}>
                            <p>Front Right (mm)</p>
                            <p>{(this.state.fr !== undefined)?this.state.fr: 0}</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ backgroundColor: '#3CB44B' }}>
                            <p>Rear Left (mm)</p>
                            <p>{(this.state.rl !== undefined)?this.state.rl: 0}</p>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ backgroundColor: '#3CB44B' }}>
                            <p>Rear Right (mm)</p>
                            <p>{(this.state.rr !== undefined)?this.state.rr: 0}</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ backgroundColor: (Math.abs(this.state.x) > 1)?((Math.abs(this.state.x) > 1.5)?'#C22D2D':'#BDA800'):'#3CB44B' }}>
                            <p>X Accel (g)</p>
                            <p>{(this.state.x !== undefined)?this.state.x: 0}</p>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ backgroundColor: (Math.abs(this.state.y) > 0.8)?((Math.abs(this.state.y) > 1)?'#C22D2D':'#BDA800'):'#3CB44B' }}>
                            <p>Y Accel (g)</p>
                            <p>{(this.state.y !== undefined)?this.state.y: 0}</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ backgroundColor: '#3CB44B' }}>
                            <p>Z Accel (g)</p>
                            <p>{(this.state.z !== undefined)?this.state.z: 0}</p>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ backgroundColor: '#3CB44B' }}>
                            <p>Roll (˚)</p>
                            <p>{(this.state.roll !== undefined)?this.state.roll: 0}</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ backgroundColor: '#3CB44B' }}>
                            <p>Pitch (˚)</p>
                            <p>{(this.state.pitch !== undefined)?this.state.pitch: 0}</p>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ backgroundColor: '#3CB44B' }}>
                            <p>Yaw (˚)</p>
                            <p>{(this.state.yaw !== undefined)?this.state.yaw: 0}</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ backgroundColor: '#3CB44B' }}>
                            <p>Speed (km/h)</p>
                            <p>{(this.state.speed !== undefined)?this.state.speed: 0}</p>
                        </div>
                    </Col>
                    <Col>
                        <div style={{ backgroundColor: '#3CB44B' }}>
                            <p>Distance (km)</p>
                            <p>{(this.state.distance !== undefined)?this.state.distance: 0}</p>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}