import React from 'react';
import LineChart from '../components/lineChart';
import ScatterPlot from '../components/scatterPlot';
import { Typography, Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import '../styling/graphBox.css';
import Data from '../../data';

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
        if (this.props.title === 'Track Map') {
            this.state = {
                currentLabel: 3,
                data: Data.getInstance().get(this.props.title)
            }
        }
        else {
            this.state = {
                currentLabel: 3,
                data: {
                    labels: Data.getInstance().getLabels(),
                    datasets: Data.getInstance().get(this.props.title)
                }
            }
        }
    }

    componentWillMount() {
        this.interval = setInterval(() => this.tick(), 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    pullData = () => {
        let newDatasets = Data.getInstance().get(this.props.title);
        if (newDatasets === undefined) { return; }
        if (this.props.title === 'Track Map') { this.setState({ data: newDatasets }); }
        else { this.setState({ data: { datasets: newDatasets } }); }
    }

    getLabels = () => {
        return this.labels;
    }

    tick = () => {
        this.pullData();
    }

    handleRangeChange = (event, value) => {
        console.log(value)
        this.chart.current.changeInterval(value*60);
    }

    render = () => {
        if (this.props.title === 'Track Map') {
            return (
                <div id='graphBox' style={{ width: '100%' }}>
                    <p id='graphTitle'><b>{this.props.title}</b></p>
                    <ScatterPlot id={this.props.id} data={this.state.data} title={this.props.title} units={this.props.units} />
                </div>
            );
        }
        else {
            return (
                <div id='graphBox'>
                    <p id='graphTitle'><b>{this.props.title}</b></p>
                    <div style={{ marginBottom: '10px' }}>
                        <LineChart id={this.props.id} data={this.state.data} title={this.props.title} units={this.props.units} ref={this.chart}/>
                    </div>
                    <div style={{ width: '50%', margin: 'auto' }}>
                        <Typography id="discrete-slider" gutterBottom style={{ textAlign: 'center', marginBottom: '40px' }}>
                            Data Range
                        </Typography>
                        <RangeSlider
                            defaultValue={0.5}
                            onChangeCommitted={this.handleRangeChange}
                            marks={true}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay='auto'
                            step={0.5}
                            min={0.5}
                            max={10} 
                            valueLabelFormat={(x) => {
                                if (x === 0.5) {
                                    return x + ' seconds';
                                }
                                if(x !== 1) {
                                    return x + ' minutes';
                                }
                                return x + ' minute';
                            }}
                            />
                    </div>
                </div>
            );
        }
    }
}