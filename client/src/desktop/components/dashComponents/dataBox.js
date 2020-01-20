import React from 'react';
import Data from '../../../data';
import {constDataTitles} from '../../../constants';

export default class DataBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: constDataTitles[this.props.name][0],
            unit: constDataTitles[this.props.name][1],
            backgroundColor: '#3CB44B',
            value: 0,
            displayName: constDataTitles[this.props.name][0]
        }
    }

    componentWillMount() {
        this.interval = setInterval(() => this.tick(), 100);
        if(this.state.name === 'Suspension' || this.state.name === 'Acceleration' || this.state.name === 'Axes') {
            this.setState({
                displayName: constDataTitles[this.props.name][2]
            })
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick = () => { //MAKE THIS WAAAY MORE EFFICIENT
        let newValue = 0
        if (this.state.name === 'Suspension' || this.state.name === 'Acceleration') {
            let index = constDataTitles[this.props.name][3]
            newValue = Data.getInstance().getDataPoint(this.state.name)[index]
        } 
        else {
            newValue = Data.getInstance().getDataPoint(this.state.name)
        }
        this.setState({value: newValue})
    }

    getColour = () => {
        let value = this.state.value;
        if(this.state.name === 'Air To Fuel') {
            if(value <= 10.5 || value >= 16) { return '#C22D2D'; }
            else if((value > 10.5 && value < 11.5) || (value > 14.7 && value < 16)) { return '#BDA800'; }
        }
        else if(this.state.name === 'Engine Temperature') {
            if(value >= 120) { return '#C22D2D'; }
            else if(value > 105 && value < 120) { return '#BDA800'; }
        }
        else if(this.state.name === 'Oil Temperature') {
            if(value > 125) { return '#C22D2D'; }
            else if(value > 110 && value <= 125) { return '#BDA800'; }
        }
        else if(this.state.name === 'Oil Pressure') {
            if(value <= 10) { return '#C22D2D'; }
        }
        else if(this.state.displayName === 'X Accel') {
            if(Math.abs(value) > 1.5) { return '#C22D2D'; }
            else if(Math.abs(value)> 1) { return '#BDA800'; }
        }
        else if(this.state.displayName === 'Y Accel') {
            if(Math.abs(value) > 1) { return '#C22D2D'; }
            else if(Math.abs(value)> 0.8) { return '#BDA800'; }
        }
        return '#3CB44B';
    }

    render = () => {
        return (
            <div style={{ backgroundColor: this.getColour() }}>
                    <p>{this.state.displayName} {this.state.unit}</p>
                    <p>{(this.state.value !== undefined)?this.state.value: '0'}</p>
            </div>
        );
    }
}
