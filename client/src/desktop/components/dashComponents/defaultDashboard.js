import React from 'react';
import '../../styling/defaultDash.css';
import {GraphingDashboard} from './graphingDashboard';

export default class DefaultDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graphTitles: [
                { title: 'RPM', units: 'RPM' },
                { title: 'Air To Fuel', units: '' },
                { title: 'Manifold Air Pressure', units: 'kPa' },
                { title: 'Throttle Position', units: '%' },
                { title: 'Engine Temperature', units: '˚C' },
                { title: 'Oil Temperature', units: '˚C' },
                { title: 'Intake Air Temperature', units: '˚C' },
                { title: 'Oil Pressure', units: 'kPa' },
                { title: 'Barometer', units: 'kPa' },
                { title: 'Injector Pulse Width', units: 'seconds' },
                { title: 'Suspension', units: 'mm' },
                { title: 'Acceleration', units: 'g' },
                { title: 'Roll', units: '˚' },
                { title: 'Pitch', units: '˚' },
                { title: 'Yaw', units: '˚' },
                { title: 'Speed', units: 'km/h' },
                { title: 'Distance', units: 'km' },
                { title: 'Track Map', units: '' }]
        }
    }

    render = () => {
        return (
            <div id='defaultDash'>
                <GraphingDashboard graphInfo={this.state.graphTitles}></GraphingDashboard>
            </div>
        );
    }
}