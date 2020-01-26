import React from 'react';
import LineChartM from '../../graphComponentsM/lineChartM';
import ScatterPlotM from '../../graphComponentsM/scatterPlotM';
import { Typography, Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Data from '../../../../data';
import '../../../styling/graphBoxM.css';

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

export default class GraphBoxM extends React.Component {
    constructor(props) {
        super(props);
        this.chart = React.createRef()
        if(this.props.title === 'Track Map') {
            this.state = {
                currentLabel: 3,
                data: Data.getInstance().get(this.props.title), 
                currentRange: 0.5
            }
        }
        else {
            this.state = {
                currentLabel: 3,
                data: Data.getInstance().get(this.props.title),
                currentRange: 0.5
            }
        }
    }

    componentWillMount = () => {
        this.interval = setInterval(() => this.tick(), 100);
    }

    componentWillUnmount = () => {
        clearInterval(this.interval);
    }

    pullData = () => {
        let newDatasets = Data.getInstance().get(this.props.title)
        if (newDatasets == undefined) { return; }
        if (this.props.title === 'Track Map') { this.setState({ data: newDatasets }); }
        else { this.setState({ data: newDatasets }); }
    }

    get = (index) => {
        for (var parameter of this.datasets) {
            if (index === parameter.title) {
                return parameter.value;
            }
        }
    }

    getLabels = () => {
        return this.labels;
    }

    tick = () => {
        this.pullData();
    }

    handleRangeChange = (event, value) => {
        if(value !== this.state.currentRange) {
            this.chart.current.changeInterval(value * 60);
            this.setState({currentRange: value});
        }
    }

    render = () => {
        if (this.props.title === 'Track Map') {
            return (
                <div id='graphBoxM'>
                    <p id='graphTitleM'><b>{this.props.title}</b></p>
                    <ScatterPlotM title={this.props.title} units={this.props.units} data={this.state.data} />
                </div>
            );
        }
        else {
            return (
                <div id='graphBoxM'>
                    <p id='graphTitleM'><b>{this.props.title}</b></p>
                    <LineChartM title={this.props.title} units={this.props.units} data={this.state.data} ref={this.chart}/>
                    <p><b>Data Range</b></p>
                    <RangeSlider style={{width: '78%', marginTop: '3px'}}
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
                                if(x !== 1) { return x + ' minutes'; }
                                return x + ' minute';
                            }}
                            />
                </div>
            );
        }
    }
}