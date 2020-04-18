import React from 'react';
import Data from '../../../../data';

export default class DataBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            indicationColor: '#3CB44B',
        }
    }

    componentWillMount = () => {
        document.addEventListener('gotData', () => { this.pullData(); });
    }

    componentWillUnmount = () => {
        document.removeEventListener('gotData', this.pullData());
    }

    pullData = () => {
        Data.getInstance().getDataPoint(this.props.sensor.name).then(value => {
            this.setState({ value: value });
        });
    }

    updateColours = () => {
        let value = this.state.value;
        let sensor = this.props.sensor;
        //Try to refactor, use data in this.props.sensor
        if (sensor.name === 'Air To Fuel') {
            if (value <= 10.5 || value >= 16) { return '#C22D2D'; }
            else if ((value > 10.5 && value < 11.5) || (value > 14.7 && value < 16)) { return '#BDA800'; }
        }
        else if (sensor.name === 'Engine Temperature') {
            if (value >= 120) { return '#C22D2D'; }
            else if (value > 105 && value < 120) { return '#BDA800'; }
        }
        else if (sensor.name === 'Oil Temperature') {
            if (value > 125) { return '#C22D2D'; }
            else if (value > 110 && value <= 125) { return '#BDA800'; }
        }
        else if (sensor.name === 'Oil Pressure') {
            if (value <= 10) { return '#C22D2D'; }
        }
        else if (sensor.name === 'X Accel') {
            if (Math.abs(value) > 1.5) { return '#C22D2D'; }
            else if (Math.abs(value) > 1) { return '#BDA800'; }
        }
        else if (sensor.name === 'Y Accel') {
            if (Math.abs(value) > 1) { return '#C22D2D'; }
            else if (Math.abs(value) > 0.8) { return '#BDA800'; }
        }
        return '#3CB44B';
    }

    render = () => {
        const sensor = this.props.sensor;
        return (
            <div style={{ backgroundColor: this.state.indicationColor }}>
                <p>{sensor.name} {(sensor.output_unit !== '' && sensor.output_unit !== ' ')?'(' + sensor.output_unit + ')':''}</p>
                <p>{(this.state.value !== undefined) ? this.state.value : '0'}</p>
            </div>
        );
    }
}
