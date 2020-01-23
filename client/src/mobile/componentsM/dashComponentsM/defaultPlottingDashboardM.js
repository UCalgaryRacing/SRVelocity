import React from 'react';
import PlottingDashboardM from './plottingDashboardM';

export default class DefaultPlottingDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graphTitles: [
                { title: 'Engine Temperature', units: '˚C' },
                { title: 'Oil Pressure', units: 'kPa' },
                { title: 'Oil Temperature', units: '˚C' },
                // { title: 'Air To Fuel', units: '' },
                { title: 'Fuel Temperature', units: '˚C' },
                { title: 'Battery Voltage', units: 'V' },
                // { title: 'Intake Air Temperature', units: '˚C' },
                // { title: 'RPM', units: 'RPM' },
                // { title: 'Suspension', units: 'mm' },
                // { title: 'Acceleration', units: 'g' },
                // { title: 'Axes', units: '˚' },
                // { title: 'Track Map', units: '' }
            ]
        }
    }

    render = () => {
        return(
            <div id='defaultDash'>
                <PlottingDashboardM graphInfo={this.state.graphTitles}/>
            </div>
        );
    }
}