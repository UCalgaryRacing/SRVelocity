import React from 'react';
import Data from '../../../data';
import {constDataTitles, constGraphTitles} from '../../../constants';


export default class DefaultPlottingDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: constDataTitles[this.props.name][0],
            unit: constDataTitles[this.props.name][1],
            value: 0
        }

    }
    componentWillMount() {
        this.interval = setInterval(() => this.tick(), 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick = () => { //MAKE THIS WAAAY MORE EFFICIENT
        let newValue = 0
        if (this.state.name === 'Suspension' || this.state.name === 'Acceleration') {
            let index = constDataTitles[this.props.name][2]
            newValue = Data.getInstance().getDataPoint(this.state.name)[index]
        } else {
            newValue = Data.getInstance().getDataPoint(this.state.name)
        }
        this.setState({value: newValue})
    }

    render = () => {
        return (
            <div style={{ backgroundColor: '#3CB44B' }}>
                    <p>{this.state.name} {this.state.unit}</p>
                    <p>{(this.state.value !== undefined)?this.state.value: '0'}</p>
            </div>
        );
    }
}
