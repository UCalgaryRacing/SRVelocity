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
            this.setState({ value: value })
        })
    }

    updateColours = () => {
        let value = this.state.value;
        if (this.state.displayName === 'Air To Fuel') {
            if (value <= 10.5 || value >= 16) { return '#C22D2D'; }
            else if ((value > 10.5 && value < 11.5) || (value > 14.7 && value < 16)) { return '#BDA800'; }
        }
        else if (this.state.displayName === 'Engine Temperature') {
            if (value >= 120) { return '#C22D2D'; }
            else if (value > 105 && value < 120) { return '#BDA800'; }
        }
        else if (this.state.displayName === 'Oil Temperature') {
            if (value > 125) { return '#C22D2D'; }
            else if (value > 110 && value <= 125) { return '#BDA800'; }
        }
        else if (this.state.displayName === 'Oil Pressure') {
            if (value <= 10) { return '#C22D2D'; }
        }
        else if (this.state.displayName === 'X Accel') {
            if (Math.abs(value) > 1.5) { return '#C22D2D'; }
            else if (Math.abs(value) > 1) { return '#BDA800'; }
        }
        else if (this.state.displayName === 'Y Accel') {
            if (Math.abs(value) > 1) { return '#C22D2D'; }
            else if (Math.abs(value) > 0.8) { return '#BDA800'; }
        }
        return '#3CB44B';
    }

    render = () => {
        return (
            <div style={{ backgroundColor: this.state.indicationColor }}>
                <p>{this.props.sensor.name} ({this.props.sensor.output_unit})</p>
                <p>{(this.state.value !== undefined) ? this.state.value : '0'}</p>
            </div>
        );
    }
}
