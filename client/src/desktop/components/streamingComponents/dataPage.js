import React from 'react';
import GraphBox from '../graphBox';
import '../../styling/streamingData.css';

export default class DataPage extends React.Component {
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
                { title: 'Distance', units: 'm' },
                { title: 'Track Map', units: '' }]
        }
    }

    render = () => {
        return (
            <div id='streamingData'>
                <GraphBox title={this.props.content} id={0} units={this.graphTitles} key={0}/>
            </div>
        );
    }
}