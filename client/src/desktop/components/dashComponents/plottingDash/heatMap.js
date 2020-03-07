import React from 'react'
import { constDataTitles } from '../../../../constants'
import colormap from 'colormap'
import Data from '../../../../data'
import ScatterPlot from '../../graphComponents/scatterPlot'
import { ColorHEX } from '@arction/lcjs';
import { Button, ButtonGroup } from 'react-bootstrap'

const colors = colormap({
    colormap: 'magma',
    nshades: 100,
    format: 'hex',
    alpha: 1
})

export default class HeatMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                tp: [], //0, 100
                // fl: [],
                // fr: [],
                // rl: [],
                // rr: [],
                suspension: [], // sum x + y |0, 2|
                speed: [] //0, 100
            },
            cuurentLabel: 3,
            currentRange: 0.5,
            indicationColor: '#000',
            selection: 'speed'
        }
        this.currentPoint = {}
        this.pointSelections = []
        this.choice = this.props.choice
        this.forceMapUpdate = false
        this.newData = []
    }

    componentWillMount = () => { document.addEventListener('gotData', () => { this.pullData(); }); }
    componentWillUnmount = () => { document.removeEventListener('gotData', this.pullData()); }

    getColor = (value, boundaries) => {
        let range = boundaries[1] - boundaries[0];
        let index = (value - boundaries[0]) / range;
        index *= 100;
        index = Math.round(index);
        return ColorHEX(colors[99 - index]);
    }

    findParamColor(sensor) {
        let newValue = 0
        if (sensor === 'suspension') {
            let xValue = Data.getInstance().getDataPoint('x');
            let yValue = Data.getInstance().getDataPoint('y');

            newValue = Math.abs(xValue) + Math.abs(yValue);
            newValue = this.getColor(newValue, [-2, 2]);
        }
        else if (sensor === 'tp') {
            newValue = Data.getInstance().getDataPoint('tp');
            newValue = this.getColor(newValue, [0, 100]);
        }
        else if (sensor === 'speed') {
            newValue = Data.getInstance().getDataPoint('speed');
            newValue = this.getColor(newValue, [0, 100]);
        }
        return newValue
    }

    pullData = () => {
        if (this.forceMapUpdate) {
            this.forceMapUpdate = false
        }
        let temp = Data.getInstance().getDataPoint('Track Map');
        for (var sensor in this.state.data) {
            this.state.data[sensor].push(this.findParamColor(sensor));
        }
        let colArray = this.state.data[this.state.selection]
        temp.color = colArray[colArray.length - 1]
        this.setState({ currentPoint: temp })
    }

    refreshMap = (sensor) => {
        this.setState({ selection: sensor })
        let temp = Data.getInstance().get('Track Map').slice(-1 * this.state.data[sensor].length) // get the last x amount of points
        // where x is the length of the stored color arrays
        for (let i = 0; i < temp.length; i++) {
            temp[i].color = this.state.data[sensor][i]
        }
        this.newData = temp
        this.forceMapUpdate = true
    }

    render = () => {
        return (
            <div style={{ width: '100%' }}>
                <ScatterPlot id='scatter' mapUpdate={this.forceMapUpdate} data={this.newData} point={this.state.currentPoint} title={this.props.title} units={this.props.units} />
                {this.choice ?
                    <ButtonGroup id='dashSelector' style={{ margin: '20px' }}>
                        <Button id='defaultButton' onClick={() => this.refreshMap('speed')} disabled={(this.state.selection === 'speed')}><b>Speed</b></Button>
                        <Button id='customButton' onClick={() => this.refreshMap('suspension')} disabled={(this.state.selection === 'suspension')}><b>Suspension</b></Button>
                        <Button id='customButton' onClick={() => this.refreshMap('tp')} disabled={(this.state.selection === 'tp')}><b>Throttle Position</b></Button>
                    </ButtonGroup >
                    : null
                }
            </div>
        );
    }
}
