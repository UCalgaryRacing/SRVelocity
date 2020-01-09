import React from 'react';
import '../../styling/customDash.css';
import {GraphingDashboard} from "./graphingDashboard";

export default class CustomDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graphTitles: [
                { title: 'RPM', units: 'RPM' },
                { title: 'Air To Fuel', units: '' },
                { title: 'Manifold Air Pressure', units: 'kPa' },
                { title: 'Throttle Position', units: '%' },
                { title: 'Engine Temperature', units: '&deg;C' },
                { title: 'Oil Temperature', units: '&deg;C' },
                { title: 'Intake Air Temperature', units: '&deg;C' },
                { title: 'Oil Pressure', units: 'kPa' },
                { title: 'Barometer', units: 'kPa' },
                { title: 'Injector Pulse Width', units: 'seconds' },
                { title: 'Suspension', units: 'mm' },
                { title: 'Acceleration', units: 'g' },
                { title: 'Roll', units: '&deg;' },
                { title: 'Pitch', units: '&deg;' },
                { title: 'Yaw', units: '&deg;' },
                { title: 'Speed', units: 'km/h' },
                { title: 'Distance', units: 'm' },
                { title: 'Track Map', units: '' }],

            selectedGraphs: [{ title: 'RPM', units: 'RPM' }]

        }
    }

    // handleSelect = (event) => {
    //     event.
    // }

    render = () => {
        return (
            <div id='customDash'>
                <GraphingDashboard graphInfo={this.state.selectedGraphs}></GraphingDashboard>
            </div>
        );
    }
}
