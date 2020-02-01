import React from 'react';
import GraphingDashboard from './graphingDashboard';
import '../../../styling/defaultDash.css';

export default class DefaultPlottingDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graphTitles: [
                { title: 'Engine Temperature', units: '˚C' },
                { title: 'Oil Pressure', units: 'kPa' },
                { title: 'Oil Temperature', units: '˚C' },
                { title: 'Air To Fuel', units: '' },
                { title: 'Fuel Temperature', units: '˚C' },
                { title: 'RPM', units: 'RPM' },
                { title: 'Suspension', units: 'mm' },
                { title: 'Acceleration', units: 'g' },
                { title: 'Axes', units: '˚' }
            ]
        }
    }

    render = () => {
        return (
            <div id='defaultDash'>
                <GraphingDashboard graphInfo={this.state.graphTitles}/>
            </div>
        );
    }
}
