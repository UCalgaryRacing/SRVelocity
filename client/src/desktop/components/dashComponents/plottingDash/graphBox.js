import React from 'react';

import LineChart from '../components/lineChart';
import HeatMap from '../components/heatMap';

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
            },
        },
    }
})(Slider);

export default class GraphBox extends React.Component {
    constructor(props) {
        super(props);
        this.chart = React.createRef()
        this.state = {
            data: Data.getInstance().get(this.props.title),
            currentRange: 0.5,
            indicationColour: '#000'
        }
        this.pullData = this.pullData.bind(this);
    }

    componentWillMount() { document.addEventListener('gotData', () => { this.pullData() }); }
    componentWillUnmount() { document.removeEventListener('gotData', this.pullData()); }

    pullData = () => {
        let newDatasets = Data.getInstance().get(this.props.title);
        if (newDatasets === undefined) { return; }
        if (this.props.title === 'Track Map') { this.setState({ data: newDatasets }); }
        else {
            var newColour;
            if (newDatasets.length === undefined) { newColour = this.updateColours(newDatasets); }
            else {
                if (newDatasets[0] == undefined) { return; }
                newColour = this.updateColours(newDatasets[0]);
            }
            this.setState({ data: newDatasets, indicationColour: newColour });
        }
    }

    updateColours = (value) => {
        //Try to refactor
        if (this.props.title === 'Air To Fuel') {
            if (value <= 10.5 || value >= 16) { return '#C22D2D'; }
            else if ((value > 10.5 && value < 11.5) || (value > 14.7 && value < 16)) { return '#BDA800'; }
        }
        else if (this.props.title === 'Engine Temperature') {
            if (value >= 120) { return '#C22D2D'; }
            else if (value > 105 && value < 120) { return '#BDA800'; }
        }
        else if (this.props.title === 'Oil Temperature') {
            if (value > 125) { return '#C22D2D'; }
            else if (value > 110 && value <= 125) { return '#BDA800'; }
        }
        else if (this.props.title === 'Oil Pressure') {
            if (value <= 10) { return '#C22D2D'; }
        }
        return '#000';
    }

    handleRangeChange = (event, value) => {
        if (value !== this.state.currentRange) {
            this.chart.current.changeInterval(value * 60 * 10);
            this.setState({ currentRange: value });
        }
    }

    render = () => {
        if (this.props.title === 'Track Map') {
            return (
                <div id='graphBox' style={{ width: '100%' }}>
                    <p id='graphTitle'><b>{this.props.title}</b></p>
                    <HeatMap />
                </div>
            );
        }
        else {
            return (
                <div id='graphBox' style={{ borderColor: this.state.indicationColour }}>
                    <p id='graphTitle'><b style={{ color: this.state.indicationColour }}>{this.props.title}</b></p>
                    <div style={{ marginBottom: '10px' }}>
                        <LineChart id={this.props.id} data={this.state.data} title={this.props.title} units={this.props.units} ref={this.chart} />
                    </div>
                    <div style={{ width: '50%', margin: 'auto' }}>
                        <p style={{ textAlign: 'center', marginBottom: '30px' }}><b>Data Range</b></p>
                        <RangeSlider
                            defaultValue={0.5}
                            onChangeCommitted={this.handleRangeChange}
                            marks={true}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay='on'
                            step={0.5}
                            min={0.5}
                            max={10}
                            valueLabelFormat={(x) => {
                                if (x === 0.5) { return '30 seconds'; }
                                if (x !== 1) { return x + ' minutes'; }
                                return x + ' minute';
                            }}
                        />
                    </div>
                </div>
            );
        }
    }
}