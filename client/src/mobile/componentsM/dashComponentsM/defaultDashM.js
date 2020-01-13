import React from 'react';
import Data from '../../../data';
import '../../styling/dashM.css';

export default class DefaultDashM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fr: 0,
            fl: 0,
            rr: 0,
            rl: 0,
            rpm: 0,
            tp: 0,
            ipw: 0,
            baro: 0,
            map: 0,
            atf: 0,
            iat: 0,
            et: 0,
            op: 0,
            ot: 0,
            ft: 0,
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

    tick = () => {
        this.setState({
            fr: Data.getInstance().getDataPoint('Suspension')[3],
            fl: Data.getInstance().getDataPoint('Suspension')[2],
            rr: Data.getInstance().getDataPoint('Suspension')[1],
            rl: Data.getInstance().getDataPoint('Suspension')[0],
            rpm: Data.getInstance().getDataPoint('RPM'),
            tp: Data.getInstance().getDataPoint('Throttle Position'),
            ipw: Data.getInstance().getDataPoint('Injector Pulse Width'),
            baro: Data.getInstance().getDataPoint('Barometer'),
            map: Data.getInstance().getDataPoint('Manifold Air Pressure'),
            atf: Data.getInstance().getDataPoint('Air To Fuel'),
            iat: Data.getInstance().getDataPoint('Intake Air Temperature'),
            et: Data.getInstance().getDataPoint('Engine Temperature'),
            op: Data.getInstance().getDataPoint('Oil Pressure'),
            ot: Data.getInstance().getDataPoint('Oil Temperature'),
            ft: Data.getInstance().getDataPoint('Fuel Temperature'),
            x: Data.getInstance().getDataPoint('Acceleration')[0],
            y: Data.getInstance().getDataPoint('Acceleration')[1],
            z: Data.getInstance().getDataPoint('Acceleration')[2],
            roll: Data.getInstance().getDataPoint('Roll'),
            pitch: Data.getInstance().getDataPoint('Pitch'),
            yaw: Data.getInstance().getDataPoint('Yaw'),
            speed: Data.getInstance().getDataPoint('Speed'),
            distance: Data.getInstance().getDataPoint('Distance')
        });
    }

    render = () => {
        return (
            <div id='defaultDash'>
                <div style={{ background: '#3CB44B', textAlign: 'center', fontWeight: '700', color: '#FFF' }}>
                    <p>RPM</p>
                    <p>{(this.state.rpm !== undefined)?this.state.rpm:'0'}</p>
                </div>
                <div style={{ background: (this.state.atf < 10.5 || this.state.atf >= 16)?'#C22D2D':(((this.state.atf > 10.5 && this.state.atf < 11.5)||(this.state.atf > 14.7 && this.state.atf < 16))?'#BDA800':'#3CB44B'), textAlign: 'center', fontWeight: '700', color: '#FFF' }}>
                    <p>Air to Fuel</p>
                    <p>{(this.state.atf !== undefined)?this.state.atf:'0'}</p>
                </div>
                <div style={{ background: '#3CB44B', textAlign: 'center', fontWeight: '700', color: '#FFF' }}>
                    <p>Manifold Air Pressure (kPa)</p>
                    <p>{(this.state.map !== undefined)?this.state.map:'0'}</p>
                </div>
                <div style={{ background: '#3CB44B', textAlign: 'center', fontWeight: '700', color: '#FFF' }}>
                    <p>Throttle Position (%)</p>
                    <p>{(this.state.tp !== undefined)?this.state.tp:'0'}</p>
                </div>
                <div style={{ background: (this.state.et > 105 && this.state.et < 120)?'#BDA800':((this.state.et > 120)?'#C22D2D':'#3CB44B'), textAlign: 'center', fontWeight: '700', color: '#FFF' }}>
                    <p>Engine Temperature (˚C)</p>
                    <p>{(this.state.et !== undefined)?this.state.et:'0'}</p>
                </div>
                <div style={{ background: '#3CB44B', textAlign: 'center', fontWeight: '700', color: '#FFF' }}>
                    <p>Fuel Temperature (˚C)</p>
                    <p>{(this.state.ft !== undefined)?this.state.ft:'0'}</p>
                </div>
                <div style={{ background: '#3CB44B', textAlign: 'center', fontWeight: '700', color: '#FFF' }}>
                    <p>Intake Air Temperature (˚C)</p>
                    <p>{(this.state.iat !== undefined)?this.state.iat:'0'}</p>
                </div>
                <div style={{ background: (this.state.ot > 110 && this.state.ot < 125)?'#BDA800':((this.state.ot > 125)?'#C22D2D':'#3CB44B'), textAlign: 'center', fontWeight: '700', color: '#FFF' }}>
                    <p>Oil Temperature (˚C)</p>
                    <p>{(this.state.ot !== undefined)?this.state.ot:'0'}</p>
                </div>
                <div style={{ background: (this.state.op < 10)?'#C22D2D':'#3CB44B', textAlign: 'center', fontWeight: '700', color: '#FFF' }}>
                    <p>Oil Pressure (kPa)</p>
                    <p>{(this.state.op !== undefined)?this.state.op:'0'}</p>
                </div>
                <div style={{ background: '#3CB44B', textAlign: 'center', fontWeight: '700', color: '#FFF' }}>
                    <p>Injector Pulse Width (seconds)</p>
                    <p>{(this.state.ipw !== undefined)?this.state.ipw:'0'}</p>
                </div>
                <div style={{ background: '#3CB44B', textAlign: 'center', fontWeight: '700', color: '#FFF' }}>
                    <p>Barometer (kPa)</p>
                    <p>{(this.state.baro !== undefined)?this.state.baro:'0'}</p>
                </div>
                <div style={{ background: '#3CB44B', textAlign: 'center', fontWeight: '700', color: '#FFF' }}>
                    <p>Front Right (mm)</p>
                    <p>{(this.state.fr !== undefined)?this.state.fr:'0'}</p>
                </div>
                <div style={{ background: '#3CB44B', textAlign: 'center', fontWeight: '700', color: '#FFF' }}>
                    <p>Front Left (mm)</p>
                    <p>{(this.state.fl !== undefined)?this.state.fl:'0'}</p>
                </div>
                <div style={{ background: '#3CB44B', textAlign: 'center', fontWeight: '700', color: '#FFF' }}>
                    <p>Rear Right (mm)</p>
                    <p>{(this.state.rr !== undefined)?this.state.rr:'0'}</p>
                </div>
                <div style={{ background: '#3CB44B', textAlign: 'center', fontWeight: '700', color: '#FFF' }}>
                    <p>Rear Left (mm)</p>
                    <p>{(this.state.rl !== undefined)?this.state.rl:'0'}</p>
                </div>
                <div style={{ background: (Math.abs(this.state.x) > 1)?((Math.abs(this.state.x) > 1.5)?'#C22D2D':'#BDA800'):'#3CB44B', textAlign: 'center', fontWeight: '700', color: '#FFF' }}>
                    <p>Acceleration X (g)</p>
                    <p>{(this.state.x !== undefined)?this.state.x:'0'}</p>
                </div>
                <div style={{ background: (Math.abs(this.state.y) > 0.8)?((Math.abs(this.state.y) > 1)?'#C22D2D':'#BDA800'):'#3CB44B', textAlign: 'center', fontWeight: '700', color: '#FFF' }}>
                    <p>Acceleration Y (g)</p>
                    <p>{(this.state.y !== undefined)?this.state.y:'0'}</p>
                </div>
                <div style={{ background: '#3CB44B', textAlign: 'center', fontWeight: '700', color: '#FFF' }}>
                    <p>Acceleration Z (g)</p>
                    <p>{(this.state.z !== undefined)?this.state.z:'0'}</p>
                </div>
                <div style={{ background: '#3CB44B', textAlign: 'center', fontWeight: '700', color: '#FFF' }}>
                    <p>Roll (˚)</p>
                    <p>{(this.state.roll !== undefined)?this.state.roll:'0'}</p>
                </div>
                <div style={{ background: '#3CB44B', textAlign: 'center', fontWeight: '700', color: '#FFF' }}>
                    <p>Pitch (˚)</p>
                    <p>{(this.state.pitch !== undefined)?this.state.pitch:'0'}</p>
                </div>
                <div style={{ background: '#3CB44B', textAlign: 'center', fontWeight: '700', color: '#FFF' }}>
                    <p>Yaw (˚)</p>
                    <p>{(this.state.yaw !== undefined)?this.state.yaw:'0'}</p>
                </div>
                <div style={{ background: '#3CB44B', textAlign: 'center', fontWeight: '700', color: '#FFF' }}>
                    <p>Speed (km/h)</p>
                    <p>{(this.state.speed !== undefined)?this.state.speed:'0'}</p>
                </div>
                <div style={{ background: '#3CB44B', textAlign: 'center', fontWeight: '700', color: '#FFF' }}>
                    <p>Distance (km)</p>
                    <p>{(this.state.distance !== undefined)?this.state.distance:'0'}</p>
                </div>
            </div>
        );
    }
}