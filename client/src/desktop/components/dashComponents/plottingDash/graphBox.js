import React from 'react';
import LineChart from '../../graphComponents/lineChart';
import HeatMap from './heatMap';
import { Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Data from '../../../../data';
import '../../../styling/graphBox.css';

const RangeSlider = withStyles({
    root: {
        color: '#C22E2D'
    },
    thumb: {
        boxShadow: '0 0px 0px rgba(0,0,0,0),0 0px 0px rgba(0,0,0,0),0 0 0 0px rgba(0,0,0,0)',
        '&:focus,&:hover,&$active': {
            boxShadow: '0 0px 0px rgba(0,0,0,0),0 0px 0px rgba(0,0,0,0),0 0 0 0px rgba(0,0,0,0)',
            '@media (hover: none)': {
                boxShadow: '0 0px 0px rgba(0,0,0,0),0 0px 0px rgba(0,0,0,0),0 0 0 1px rgba(0,0,0,0)'
            }
        }
    }
})(Slider);

export default class GraphBox extends React.Component {
    constructor(props) {
        super(props);
        this.chart = React.createRef()
        this.state = {
            currentRange: 0.5,
            indicationColour: '#000',
            updatingRange: false
        }
    }

    componentWillMount() {
        document.addEventListener('gotData', () => { this.pullData() });
    }

    componentWillUnmount() {
        document.removeEventListener('gotData', this.pullData());
    }

    pullData = () => {
        let newDatasets = Data.getInstance().get(this.props.sensors[0].category);
        newDatasets.then(newDatasets => {
            if (newDatasets === undefined) return;
            if (this.props.title === 'Track Map') { this.setState({ data: newDatasets }); }
            else {
                var newColour;
                if (newDatasets.length === undefined) newColour = this.updateColours(newDatasets); 
                else {
                    if (newDatasets[0] === undefined) return; 
                    newColour = this.updateColours(newDatasets[0]);
                }
                this.setState({ data: newDatasets, indicationColour: newColour, updatingRange: false});
            }
        });
    }

    updateColours = (value) => {
        //#C22D2d = Red
        //#BDA800 = Yellow
        //Refactor, use this.props.sensors, bound for yellow and red are defined
        if (this.props.title === 'Air To Fuel') {
            if (value <= 10.5 || value >= 16) { return '#C22D2D'; }
            else if ((value > 10.5 && value < 11.5) || (value > 14.7 && value < 16)) { return '#BDA800'; }
        }
        else if (this.props.title === 'Engine Temperature') {
            if (value >= 120) return '#C22D2D';
            else if (value > 105 && value < 120) { return '#BDA800'; }
        }
        else if (this.props.title === 'Oil Temperature') {
            if (value > 125) return '#C22D2D';
            else if (value > 110 && value <= 125) { return '#BDA800'; }
        }
        else if (this.props.title === 'Oil Pressure') {
            if (value <= 10) return '#C22D2D';
        }
        return '#000';
    }

    handleRangeChange = (event, value) => {
        if (value !== this.state.currentRange) {
            this.setState({ 
                currentRange: value, updatingRange: true
            }, 
            this.chart.current.changeInterval(value[0] * 60 * 10, value[1] * 60 * 10));
        }
    }

    render = () => {
        if (this.props.title === 'Track Map') {
            return (
                <div id='graphBox' style={{ width: '100%' }}>
                    <p id='graphTitle'><b>{this.props.title}</b></p>
                    <HeatMap choice={this.props.choice} />
                </div>
            );
        }
        else {
            return (
                <div id='graphBox' style={{ borderColor: this.state.indicationColour, marginRight: '19px', marginLeft: '0px' }}>
                    <p id='graphTitle'><b style={{ color: this.state.indicationColour }}>{this.props.sensors[0].category}</b></p>
                    <div style={{ marginBottom: '10px' }}>
                        <LineChart
                            id={this.props.id}
                            data={this.state.data}
                            sensors={this.props.sensors}
                            updatingRange={this.state.updatingRange}
                            ref={this.chart}
                        />
                    </div>
                    <div style={{ width: '50%', margin: 'auto' }}>
                        <p style={{ textAlign: 'center', marginBottom: '30px' }}><b>Data Range (minutes)</b></p>
                        <RangeSlider
                            defaultValue={[0, 0.5]}
                            onChangeCommitted={this.handleRangeChange}
                            marks={true}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay='on'
                            step={0.5}
                            min={0}
                            max={10}
                            valueLabelFormat={(x) => {
                                return x.toFixed(1);
                            }}
                        />
                    </div>
                </div>
            );
        }
    }
}