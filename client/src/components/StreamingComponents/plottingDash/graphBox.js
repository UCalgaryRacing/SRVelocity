import React from 'react';
import LineChart from '../../GraphComponents/lineChart';
import HeatMap from '../../GraphComponents/heatMap';
import { Button } from 'react-bootstrap';
import { Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Data from '../../../data';
import './graphBox.css';
import savitzkyGolay from 'ml-savitzky-golay';

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
            sensors: this.props.sensors,
            window: 5, // Default window size for smoothing
        }
        this.dxdtParentIndices = [];
        this.index = 0;
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
                this.updateDerivative();
                this.setState({ data: newDatasets, indicationColour: newColour, updatingRange: false, updatingTitles: false });
            }
            this.index++;
        });
    }

    smoothenData = (data, h, dx) => {
        let options = {
            derivative: dx ? 1 : 0,
            windowSize: this.state.window,
            polynomial: 2,
            pad: 'pre',
            padValue: 'replicate'
        };
        return savitzkyGolay(data, h, options);
    }

    createDerivative = (parentIndex, sensor) => {
        this.dxdtParentIndices.push(parentIndex);
        Data.getInstance().getAllData(sensor).then(data => {
            data = this.smoothenData(data, 1, false);
            let dx = this.smoothenData(data, 0.1, true);
            this.chart.current.addDerivativeSeries(dx, sensor + "'");
            this.state.sensors.push({
                derivative: true,
                name: sensor + "'",
                parent: sensor,
                output_unit: this.props.sensors[0].output_unit.trim() !== "" ? this.props.sensors[0].output_unit + "/sec" : this.props.sensors[0].output_unit
            });
            this.setState({ updatingTitles: true });
        });
    }

    removeDerivative = (parentIndex, sensor) => {
        const index = this.dxdtParentIndices.indexOf(parentIndex);
        this.dxdtParentIndices.splice(index, 1);
        let name = this.props.sensors[parentIndex].name + "'";
        this.chart.current.removeSeries(name, parentIndex);
        this.state.sensors = this.state.sensors.filter(element => element.name !== sensor + "'");
        this.setState({ updatingTitles: true });
    }

    controlDerivative = (sensor) => {
        const parentIndex = this.props.sensors.findIndex(item => item.name === sensor);
        if (this.dxdtParentIndices.includes(parentIndex)) this.removeDerivative(parentIndex, sensor);
        else this.createDerivative(parentIndex, sensor);
    }

    updateDerivative = async () => {
        for (var i in this.dxdtParentIndices) {
            const sensor = this.props.sensors[this.dxdtParentIndices[i]].name;
            await Data.getInstance().getAllData(sensor).then(data => {
                data = this.smoothenData(data, 1, false);
                let dx = this.smoothenData(data, 0.1, true);
                const name = this.props.sensors[this.dxdtParentIndices[i]].name + "'";
                if (this.chart.current !== null)
                    this.chart.current.addDerivativeSeries(dx, name);
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
                this.chart.current.changeInterval(value[0] * 60 * 10, value[1] * 60 * 10)
            );
        }
    }

    handleWindowChange = async (event, value) => {
        if (value !== this.state.window && value < this.index / 4) {
            for (var i in this.dxdtParentIndices) {
                const sensor = this.props.sensors[this.dxdtParentIndices[i]].name;
                await Data.getInstance().getAllData(sensor).then(data => {
                    data = this.smoothenData(data, 1, false);
                    let dx = this.smoothenData(data, 0.1, true);
                    const name = this.props.sensors[this.dxdtParentIndices[i]].name + "'";
                    this.chart.current.addDerivativeSeries(dx, name);
                });
            }
            this.setState({ window: value[0] });
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
                <div id='graphBox'>
                    <p id='graphTitle'><b>{'Track Map'}</b></p>
                    <HeatMap currentPoint={this.state.data} delete={this.props.delete} index={this.props.id} />
                    {
                        !this.props.hideClose ?
                            <Button id='deleteGraph' onClick={() => this.props.delete(this.props.id)} style={{ position: 'absolute' }}>
                                <img id="logoImg" style={{ marginTop: '2px' }} src={require('../../../assets/delete-x.svg')} />
                            </Button>
                            :
                            null
                    }
                </div>
            );
        }
        else {
            return (
                <div id='graphBox' style={{ borderColor: this.state.indicationColour }}>
                    <p id='graphTitle' style={{ height: '30px' }}><div style={{ paddingTop: '3.5px', paddingBottom: '3.5px' }}><b style={{ color: this.state.indicationColour }}>{this.props.sensors[0].category}</b></div></p>
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
                    <div id='graphBottom' style={{ width: '50%', margin: 'auto' }}>
                        <Button id='toggleAxis' onClick={this.toggleRightAxis} style={{ position: 'absolute' }}>
                            <img id="logoImg" style={{ width: '26px', marginTop: '-11px', marginLeft: '-12px', position: 'absolute'}} src={require('../../../assets/rightAxis.svg')} />
                        </Button>
                        <Button id='toggleGrid' onClick={this.toggleGrid} style={{ position: 'absolute' }}>
                            <img id="logoImg" style={{ width: '23px', marginTop: '-11.5px', marginLeft: '-12.5px', position: 'absolute'}} src={require('../../../assets/grid.svg')} />
                        </Button>
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
                        <p style={{ textAlign: 'center', marginBottom: '20px', zIndex: '1000' }}><b>Data Range (minutes)</b></p>
                        <div style={{ display: this.dxdtParentIndices.length > 0 ? '' : 'none' }}>
                            <RangeSlider
                                defaultValue={[5]}
                                onChange={this.handleWindowChange}
                                marks={false}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay='on'
                                step={2}
                                min={5}
                                max={255}
                                valueLabelFormat={(x) => {
                                    return x.toFixed(1);
                                }}
                            />
                            <p style={{ textAlign: 'center', marginBottom: '25px' }}><b>Smoothing Factor</b></p>
                        </div>
                        <Button id='deleteGraph' onClick={() => this.props.delete(this.props.id)} style={{ position: 'absolute' }}>
                            <img id="logoImg" style={{ marginTop: '2px' }} src={require('../../../assets/delete-x.svg')} />
                        </Button>
                    </div>
                </div>
            );
        }
    }
}