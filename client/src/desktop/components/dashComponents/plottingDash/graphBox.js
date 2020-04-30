import React from 'react';
import LineChart from '../graphComponents/lineChart';
import HeatMap from '../graphComponents/heatMap';
import { Button } from 'react-bootstrap';
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
            updatingRange: false,
            updatingTitles: false,
            updatingGrid: false,
            sensors: this.props.sensors
        }
        this.derivativeIndices = [];
    }

    componentWillMount() {
        document.addEventListener('gotData', () => { this.pullData() });
    }

    componentWillUnmount() {
        document.removeEventListener('gotData', this.pullData());
    }

    pullData = () => {
        var newDatasets;
        if (this.props.sensors[0].category !== 'Track Map') newDatasets = Data.getInstance().get(this.props.sensors[0].category);
        else newDatasets = Data.getInstance().getDataPoint('Track Map');
        newDatasets.then(newDatasets => {
            if (newDatasets === undefined) return;
            if (this.props.title === 'Track Map') this.setState({ data: newDatasets });
            else {
                var newColour;
                if (newDatasets.length === undefined) newColour = this.updateColours(newDatasets);
                else {
                    if (newDatasets[0] === undefined) return;
                    newColour = this.updateColours(newDatasets[0]);
                }
                for (var i in this.derivativeIndices) {
                    if (this.state.data === undefined) break;
                    let dx = newDatasets[i] - this.state.data[i];
                    let dt = 1; //10 Hz
                    newDatasets.push(dx / dt);
                }
                this.setState({ data: newDatasets, indicationColour: newColour, updatingRange: false, updatingTitles: false });
            }
        });
    }

    controlDerivative = (sensor) => {
        const parentIndex = this.props.sensors.findIndex(item => item.name === sensor);
        if (this.derivativeIndices.includes(parentIndex)) {
            //This derivative is in trouble
            const index = this.derivativeIndices.indexOf(parentIndex);
            this.derivativeIndices.splice(index, 1);
            //Remove from graph
            var seriesIndex = -1;
            this.state.sensors.find((item, i) => {
                if (item.parent === sensor) seriesIndex = i;
            });
            this.chart.current.removeSeries(seriesIndex, parentIndex);
            //Remove the sensor
            this.state.sensors = this.state.sensors.filter(element => element.name !== sensor + "'");
            //Update titles
            this.setState({ updatingTitles: true });
        } else {
            this.derivativeIndices.push(parentIndex);
            Data.getInstance().getAllData(sensor).then(data => {
                var derivative = [];
                for (let i = 0; i < data.length; i++) {
                    if (i === 0) continue;
                    let dx = data[i] - data[i - 1];
                    let dt = 1; //10 Hz
                    derivative.push(dx / dt);
                }
                this.chart.current.addLineSeries(derivative, sensor);
                this.state.sensors.push({
                    derivative: true,
                    name: sensor + "'",
                    parent: sensor,
                    output_unit: this.props.sensors[0].output_unit + "/sec"
                });
                this.setState({ updatingTitles: true });
            });
        }
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

    toggleGrid = () => {
        this.chart.current.toggleGrid();
    }

    toggleRightAxis = () => {
        this.chart.current.toggleRightAxis();
    }

    render = () => {
        if (this.state.sensors[0].category === 'Track Map') {
            return (
                <div id='graphBox' style={{ marginRight: '19px', marginLeft: '0px' }}>
                    <p id='graphTitle'><b style={{fontSize: '1.8rem'}}>{'Track Map'}</b></p>
                    <HeatMap currentPoint={this.state.data}/>
                </div>
            );
        }
        else {
            return (
                <div id='graphBox' style={{ borderColor: this.state.indicationColour, marginRight: '19px', marginLeft: '0px' }}>
                    <p id='graphTitle'><b style={{ color: this.state.indicationColour, fontSize: '1.8rem' }}>{this.props.sensors[0].category}</b></p>
                    <div style={{ marginBottom: '10px' }}>
                        <LineChart
                            id={this.props.id}
                            data={this.state.data}
                            sensors={this.state.sensors}
                            updatingRange={this.state.updatingRange}
                            updatingTitles={this.state.updatingTitles}
                            updatingGrid={this.state.updatingGrid}
                            controlDerivative={this.controlDerivative}
                            ref={this.chart}
                        />
                    </div>
                    <div style={{ width: '50%', margin: 'auto' }}>
                        <Button id='toggleAxis' onClick={this.toggleRightAxis} style={{ position: 'absolute', right: '95px', bottom: '60px' }}><img id="logoImg" src={require('../../../../assets/rightAxis.svg')}/></Button>
                        <Button id='toggleAxis' onClick={this.toggleGrid} style={{ position: 'absolute', right: '45px', bottom: '60px' }}><img id="logoImg" src={require('../../../../assets/grid.svg')}/></Button>
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