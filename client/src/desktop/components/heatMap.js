import React from 'react'
import {constDataTitles} from '../../constants.js'
import colormap from 'colormap' 
import Data from '../../data'
import ScatterPlot from './scatterPlot'
import {ColorHEX} from '@arction/lcjs';


const colors =  colormap({
    colormap: 'jet',
    nshades: 100,
    format: 'hex',
    alpha: 1
})

export default class HeatMap extends React.Component {
    constructor(props){
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
            points: [],
            currentPoint: {},
            selection: 'speed'
        }
    }

    componentDidUpdate = () => { this.pullData(); }


    getColor = (value, boundaries) => {
        let range = boundaries[1] - boundaries[0];
        let index = (value - boundaries[0]) / range;
        index *= 100;
        index = Math.round(index);

        return ColorHEX(colors[index]);
    }

 

    pullData = () => {
        this.state.points.push(Data.getInstance().getDataPoint('Track Map'));
        for (var sensor in this.state.data) {
            let newValue = 0;
            if (sensor === 'suspension') {
                let index = constDataTitles.x[3];
                let xValue = Data.getInstance().getDataPoint(constDataTitles.x[0])[index];
                
                index = constDataTitles.y[3];
                let yValue = Data.getInstance().getDataPoint(constDataTitles.y[0])[index];

                newValue = Math.abs(xValue) + Math.abs(yValue);
                newValue = this.getColor(newValue, [0, 2]);
            }

            else if(sensor === 'tp'){
                newValue = Data.getInstance().getDataPoint(constDataTitles.tp[0]);
                newValue = this.getColor(newValue, [0, 100]);
            }

            else if(sensor === 'speed'){
                newValue = Data.getInstance().getDataPoint(constDataTitles.speed[0]);
                newValue = this.getColor(newValue, [0, 100]);
            }

            this.state.data[sensor].push(newValue);
        }

        let temp = this.state.points[this.state.points.length - 1]
        let colArray = this.state.data[this.state.selection]
        temp.color = colArray[colArray.length - 1]

        this.state.currentPoint = temp
    }




    render = () => {
        return (
            <div style={{ width: '100%' }}>
                <ScatterPlot id='scatter' color={this.state.data[this.state.selection]} data={this.state.currentPoint} title={this.props.title} units={this.props.units} />
            </div>
        );
    }

}