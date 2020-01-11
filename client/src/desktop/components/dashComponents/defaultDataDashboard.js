import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Data from '../../../data';
import '../../styling/defaultDash.css';
import {constDataTitles} from '../../../constants';
import DataBox from "./dataBox";

export default class DefaultDataDash extends React.Component {
    constructor(props) {
        super(props);
        this.totalData = []
        for (var sensor in constDataTitles) {
            this.totalData.push(sensor)
        }
        this.boxes = []
        this.layout = []
    }

    componentWillMount() {
        this.createBoxes()
        this.createLayout()
    }

    createLayout = () => {
        for (let i = 0; this.boxes[i]; i += 2) {
            if (this.boxes[i+1]) {
                this.layout.push(
                    <Row>
                        <Col>
                            {this.boxes[i]}
                        </Col>
                        <Col>
                            {this.boxes[i+1]}
                        </Col>
                    </Row>
                )
            } else {
                this.layout.push(
                    <Row>
                        <Col>
                            {this.boxes[i]}
                        </Col>
                    </Row>
                )
            }
        }
    }
    createBoxes = () => {
        for (var sensor of this.totalData) {
            this.boxes.push(
                <DataBox name={sensor}></DataBox>
            )
        }

        // this.boxes = {
        //     rpm: <div style={{ backgroundColor: '#3CB44B' }}>
        //             <p>RPM</p>
        //             <p>{(this.state.rpm !== undefined)?this.state.rpm: '0'}</p>
        //         </div>,
        //     atf: <div style={{ backgroundColor: (this.state.atf < 10.5 || this.state.atf >= 16)?'#C22D2D':(((this.state.atf > 10.5 && this.state.atf < 11.5)||(this.state.atf > 14.7 && this.state.atf < 16))?'#BDA800':'#3CB44B') }}>
        //             <p>Air To Fuel</p>
        //             <p>{(this.state.atf !== undefined)?this.state.atf: '0'}</p>
        //         </div>,
        //     map: <div style={{ backgroundColor: '#3CB44B' }}>
        //             <p>Manifold Air Pressure (kPa)</p>
        //             <p>{(this.state.map !== undefined)?this.state.map: 0}</p>
        //         </div>,

        //     tp: <div style={{ backgroundColor: '#3CB44B' }}>
        //             <p>Throttle Position (%)</p>
        //             <p>{(this.state.tp !== undefined)?this.state.tp: 0}</p>
        //         </div>,
        //     engineTemp: 
        //             <div style={{ backgroundColor: (this.state.engineTemp > 105 && this.state.engineTemp < 120)?'#BDA800':((this.state.engineTemp > 120)?'#C22D2D':'#3CB44B')}}>
        //                     <p>Engine Temp (˚C)</p>
        //                     <p>{(this.state.engineTemp !== undefined)?this.state.engineTemp: 0}</p>
        //                 </div>,
        //     oilTemp:
        //             <div style={{ backgroundColor: (this.state.oilTemp > 110 && this.state.oilTemp < 125)?'#BDA800':((this.state.oilTemp > 125)?'#C22D2D':'#3CB44B') }}>
        //                 <p>Oil Temp (˚C)</p>
        //                 <p>{(this.state.oilTemp !== undefined)?this.state.oilTemp: 0}</p>
        //             </div>,
        //     fuelTemp:      
        //             <div style={{ backgroundColor: '#3CB44B' }}>
        //                 <p>Fuel Temp (˚C)</p>
        //                 <p>{(this.state.fuelTemp !== undefined)?this.state.fuelTemp: 0}</p>
        //             </div>,
                
        //     iat:
        //             <div style={{ backgroundColor: '#3CB44B' }}>
        //                 <p>Intake Air Temp (˚C)</p>
        //                 <p>{(this.state.iat !== undefined)?this.state.iat: 0}</p>
        //             </div>,
        //     oilPres:
            
        //             <div style={{ backgroundColor: (this.state.oilPres < 10)?'#C22D2D':'#3CB44B'}}>
        //                 <p>Oil Pressure (kPa)</p>
        //                 <p>{(this.state.oilPres !== undefined)?this.state.oilPres: 0}</p>
        //             </div>,
        //     baro:
           
        //             <div style={{ backgroundColor: '#3CB44B' }}>
        //                 <p>Barometer (kPa)</p>
        //                 <p>{(this.state.baro !== undefined)?this.state.baro: 0}</p>
        //             </div>,
        //     ipw:
                
        //             <div style={{ backgroundColor: '#3CB44B' }}>
        //                 <p>Injector Pulse Width (seconds)</p>
        //                 <p>{(this.state.ipw !== undefined)?this.state.ipw: 0}</p>
        //             </div>,
                
        //     voltage:
        //             <div style={{ backgroundColor: '#3CB44B' }}>
        //                 <p>Battery Voltage (V)</p>
        //                 <p>{(this.state.voltage !== undefined)?this.state.voltage: '0'}</p>
        //             </div>,
                
        //     fl:
        //             <div style={{ backgroundColor: '#3CB44B' }}>
        //                 <p>Front Left (mm)</p>
        //                 <p>{(this.state.fl !== undefined)?this.state.fl: 0}</p>
        //             </div>,
                
        //     fr:
        //             <div style={{ backgroundColor: '#3CB44B' }}>
        //                 <p>Front Right (mm)</p>
        //                 <p>{(this.state.fr !== undefined)?this.state.fr: 0}</p>
        //             </div>,
                
        //     rl:
        //             <div style={{ backgroundColor: '#3CB44B' }}>
        //                 <p>Rear Left (mm)</p>
        //                 <p>{(this.state.rl !== undefined)?this.state.rl: 0}</p>
        //             </div>,
                
        //     rr:    
        //             <div style={{ backgroundColor: '#3CB44B' }}>
        //                 <p>Rear Right (mm)</p>
        //                 <p>{(this.state.rr !== undefined)?this.state.rr: 0}</p>
        //             </div>,
            
        //     x:    
        //             <div style={{ backgroundColor: (Math.abs(this.state.x) > 1)?((Math.abs(this.state.x) > 1.5)?'#C22D2D':'#BDA800'):'#3CB44B' }}>
        //                 <p>X Accel (g)</p>
        //                 <p>{(this.state.x !== undefined)?this.state.x: 0}</p>
        //             </div>,
                
        //     y:    
        //             <div style={{ backgroundColor: (Math.abs(this.state.y) > 0.8)?((Math.abs(this.state.y) > 1)?'#C22D2D':'#BDA800'):'#3CB44B' }}>
        //                 <p>Y Accel (g)</p>
        //                 <p>{(this.state.y !== undefined)?this.state.y: 0}</p>
        //             </div>,
                
        //     z:
        //             <div style={{ backgroundColor: '#3CB44B' }}>
        //                 <p>Z Accel (g)</p>
        //                 <p>{(this.state.z !== undefined)?this.state.z: 0}</p>
        //             </div>,
                
        //     roll:    
        //             <div style={{ backgroundColor: '#3CB44B' }}>
        //                 <p>Roll (˚)</p>
        //                 <p>{(this.state.roll !== undefined)?this.state.roll: 0}</p>
        //             </div>,
                
        //     pitch:
        //             <div style={{ backgroundColor: '#3CB44B' }}>
        //                 <p>Pitch (˚)</p>
        //                 <p>{(this.state.pitch !== undefined)?this.state.pitch: 0}</p>
        //             </div>,
                
        //     yaw:    
        //             <div style={{ backgroundColor: '#3CB44B' }}>
        //                 <p>Yaw (˚)</p>
        //                 <p>{(this.state.yaw !== undefined)?this.state.yaw: 0}</p>
        //             </div>,
                
        //     speed:
        //             <div style={{ backgroundColor: '#3CB44B' }}>
        //                 <p>Speed (km/h)</p>
        //                 <p>{(this.state.speed !== undefined)?this.state.speed: 0}</p>
        //             </div>,
                
        //     distance:
        //             <div style={{ backgroundColor: '#3CB44B' }}>
        //                 <p>Distance (km)</p>
        //                 <p>{(this.state.distance !== undefined)?this.state.distance: 0}</p>
        //             </div>
            
        // }

       // this.createLayout()
    }


    render = () => {
        console.log(this.layout)
        return (
            <div style={{ marginTop: '20px', marginRight: '15px', textAlign: 'center', color: '#FFF', fontWeight: '700' }}>
                {this.layout}
            </div>
        );
    }
}