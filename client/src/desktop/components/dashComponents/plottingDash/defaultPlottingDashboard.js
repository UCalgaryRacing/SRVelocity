import React from 'react';
import GraphingDashboard from './graphingDashboard';
import '../../../styling/defaultDash.css';

export default class DefaultPlottingDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graphTitles: [
                { title: 'Engine Temperature', name: 'engineTemp', units: '˚C' },
                { title: 'Oil Pressure', name: 'oilPres', units: 'kPa' },
                { title: 'Oil Temperature', name: 'oilTemp', units: '˚C' },
                { title: 'Air To Fuel', name: 'atf', units: '' },
                { title: 'Fuel Temperature', name: 'fuelTemp', units: '˚C' },
                { title: 'RPM', name: 'rpm', units: 'RPM' },
                { title: 'Suspension', name: 'Suspension', units: 'mm' },
                { title: 'Acceleration', name: 'Acceleration', units: 'g' },
                { title: 'Axes', name: 'Axes', units: '˚' }
            ]
        }
    }

    render = () => {
        return (
            <div id='defaultDash'>
                <GraphingDashboard graphInfo={this.state.graphTitles} />
            </div>
        );
    }
}
