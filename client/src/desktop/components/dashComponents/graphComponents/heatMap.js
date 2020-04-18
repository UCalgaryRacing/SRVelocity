import React from 'react';
import colormap from 'colormap';
import Data from '../../../../data';
import ScatterPlot from './scatterPlot';
import { ColorHEX } from '@arction/lcjs';
import { Button, ButtonGroup } from 'react-bootstrap';

const colors = colormap({
    colormap: 'magma',
    nshades: 100,
    format: 'hex',
    alpha: 1
});

export default class HeatMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                tp: [], //0, 100
                accel: [], // sum x + y |0, 2|
                speed: [] //0, 100
            },
            indicationColor: '#000',
            selection: 'speed'
        }
        this.currentPoint = {};
        this.pointSelections = [];
        this.category = this.props.category;
        this.forceMapUpdate = false;
    }

    componentDidUpdate = (prevProps) => { 
        if(this.props.currentPoint !== prevProps.currentPoint) this.pullData(); 
    }

    getColor = (value, boundaries) => {
        let range = Math.abs(boundaries[1] - boundaries[0]);
        let index = (value[0] - boundaries[0]) / range;
        index = Math.round(index * 100);
        return ColorHEX(colors[99 - index]);
    }

    findParamColor = async (sensor) => {
        let newValue = 0;
        if (sensor === 'accel') {
            newValue = await Data.getInstance().getDataPoint('X Accel').then(async xValue => {
                var yValue = await Data.getInstance().getDataPoint('Y Accel');
                var newValue = Math.abs(xValue[0]) + Math.abs(yValue[0]);
                newValue = this.getColor([newValue], [0, 2]);
                return newValue;
            });
        }
        else if (sensor === 'tp') {
            newValue = await Data.getInstance().getDataPoint('Throttle Position');
            newValue = this.getColor(newValue, [0, 100]);
        }
        else if (sensor === 'speed') {
            newValue = await Data.getInstance().getDataPoint('Speed');
            newValue = this.getColor(newValue, [0, 100]);
        }
        return newValue;
    }

    pullData = async () => {
        if (this.props.currentPoint === undefined) return;
        if (this.forceMapUpdate) this.forceMapUpdate = false;
        let temp = this.props.currentPoint;
        for (var sensor in this.state.data) {
            var paramColour = await this.findParamColor(sensor);
            let point = {x: temp.x, y: temp.y};
            point.color = paramColour;
            this.state.data[sensor].push(point);
        }
        let colArray = this.state.data[this.state.selection];
        temp.color = colArray[colArray.length - 1].color;
        this.setState({ currentPoint: temp });
    }

    refreshMap = (sensor) => {
        this.forceMapUpdate = true;
        this.setState({ selection: sensor });
    }

    render = () => {
        return (
            <div style={{ width: '100%' }}>
                <ScatterPlot id='scatter' mapUpdate={this.forceMapUpdate} data={this.state.data[this.state.selection]} point={this.state.currentPoint} title={this.props.title} />
                <div style={{ textAlign: 'center' }}>
                    <ButtonGroup id='dashSelector' style={{ margin: '20px' }}>
                        <Button id='defaultButton' onClick={() => this.refreshMap('speed')} disabled={(this.state.selection === 'speed')}><b>Speed</b></Button>
                        <Button id='customButton' onClick={() => this.refreshMap('accel')} disabled={(this.state.selection === 'accel')}><b>Acceleration</b></Button>
                        <Button id='customButton' onClick={() => this.refreshMap('tp')} disabled={(this.state.selection === 'tp')}><b>Throttle Position</b></Button>
                    </ButtonGroup >
                </div>
            </div>
        );
    }
}
