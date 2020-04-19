import React from 'react';
import colormap from 'colormap';
import Data from '../../../../data';
import SensorData from '../../../../constants';
import ScatterPlot from './scatterPlot';
import { ColorHEX } from '@arction/lcjs';
import { Button, ButtonGroup } from 'react-bootstrap';

const colors = colormap({
    colormap: 'jet',
    nshades: 500,
    format: 'hex',
    alpha: 1
});

export default class HeatMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //Refactor
            data: {
                'Throttle Position': [], //0, 100
                'Acceleration': [], // sum x + y |0, 2|
                'Speed': [] //0, 100
            },
            indicationColor: '#000',
            selection: 'Speed',
        }
        this.currentPoint = {};
        this.pointSelections = [];
        this.category = this.props.category;
        this.selectionUnit = 'km/h';
        this.forceMapUpdate = false;
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.currentPoint !== prevProps.currentPoint) this.pullData();
    }

    updateSelectionUnit = (sensor) => {
        SensorData.getInstance(sensorData => {
            var s = sensorData.filter(item => item.name === 'sensor');
            this.selectionUnit = s.output_unit;
        });
    }

    getColor = (value, boundaries) => {
        let range = Math.abs(boundaries[1] - boundaries[0]);
        let index = (value[0] - boundaries[0]) / range;
        index = Math.round(index * 500);
        if(index >= 500) index = 499;
        return ColorHEX(colors[index]);
    }

    findParamColor = async (sensor) => {
        //Refactor
        let newValue = 0;
        if (sensor === 'Acceleration') {
            newValue = await Data.getInstance().getDataPoint('X').then(async xValue => {
                var yValue = await Data.getInstance().getDataPoint('Y');
                var newValue = Math.abs(xValue[0]) + Math.abs(yValue[0]);
                newValue = this.getColor([newValue], [0, 2]);
                return newValue;
            });
        }
        else if (sensor === 'Throttle Position') {
            newValue = await Data.getInstance().getDataPoint('Throttle Position');
            newValue = this.getColor(newValue, [0, 100]);
        }
        else if (sensor === 'Speed') {
            newValue = await Data.getInstance().getDataPoint('Speed');
            newValue = this.getColor(newValue, [0, 40]);
        }
        return newValue;
    }

    pullData = async () => {
        //Refactor, only store current selection in memory
        if (this.props.currentPoint === undefined) return;
        if (this.forceMapUpdate) this.forceMapUpdate = false;
        let temp = this.props.currentPoint;
        for (var sensor in this.state.data) {
            var paramColour = await this.findParamColor(sensor);
            let point = { x: temp.x, y: temp.y };
            point.color = paramColour;
            this.state.data[sensor].push(point);
        }
        let colArray = this.state.data[this.state.selection];
        temp.color = colArray[colArray.length - 1].color;
        this.setState({ currentPoint: temp });
    }

    refreshMap = (sensor) => {
        this.forceMapUpdate = true;
        this.updateSelectionUnit();
        this.setState({ selection: sensor });
    }

    render = () => {
        return (
            <div style={{ width: '100%' }}>
                <ScatterPlot id='scatter'
                    mapUpdate={this.forceMapUpdate}
                    data={this.state.data[this.state.selection]}
                    point={this.state.currentPoint}
                    dataTitle={this.state.selection}
                    unit={this.selectionUnit} />
                <div style={{ textAlign: 'center' }}>
                    <ButtonGroup id='dashSelector' style={{ margin: '20px' }}>
                        <Button id='defaultButton' onClick={() => this.refreshMap('Speed')} disabled={(this.state.selection === 'Speed')}><b>Speed</b></Button>
                        <Button id='customButton' onClick={() => this.refreshMap('Acceleration')} disabled={(this.state.selection === 'Acceleration')}><b>Acceleration</b></Button>
                        <Button id='customButton' onClick={() => this.refreshMap('Throttle Position')} disabled={(this.state.selection === 'Throttle Position')}><b>Throttle Position</b></Button>
                    </ButtonGroup >
                </div>
            </div>
        );
    }
}
