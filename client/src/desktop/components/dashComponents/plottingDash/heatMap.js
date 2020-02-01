import React from 'react'
import {constDataTitles} from '../../../../constants'
import colormap from 'colormap' 
import Data from '../../../../data'
import ScatterPlot from '../../graphComponents/scatterPlot'
import {ColorHEX} from '@arction/lcjs';
import { Dropdown, DropdownButton} from 'react-bootstrap'


const colors =  colormap({
    colormap: 'magma',
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
            currentPoint: {},
            selection: 'speed'
        }
        this.pointSelections = []
        this.choice = this.props.choice
        this.forceMapUpdate = false
    }

    componentWillMount = () => {
        document.addEventListener('gotData', () => { this.pullData(); });
    }

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

        return newValue
    }

    pullData = () => {
        if(this.forceMapUpdate) {
            this.forceMapUpdate = false
        }
        this.state.currentPoint = Data.getInstance().getDataPoint('Track Map');
        for (var sensor in this.state.data) {
            this.state.data[sensor].push(this.findParamColor(sensor));
        }

        let colArray = this.state.data[this.state.selection]
        this.state.currentPoint.color = colArray[colArray.length - 1]

    }

    select = (event) => {
        if (event.key === "1") {
            this.refreshMap('speed')
        } else if (event.key === "2") {
            this.refreshMap('suspension')
        } else if (event.key === "3") {
            this.refreshMap('tp')
        }
    }

    refreshMap = (sensor) => {
        let temp = Data.getInstance().get('Track Map')
        for (let i =0; i < temp.length; i++) {
            temp[i].color = this.state.data[sensor][i]
        }

        this.forceMapUpdate = true
        
    }




    render = () => {
        console.log(this.choice)
        return (
            <div style={{ width: '100%' }}>
                <ScatterPlot id='scatter' mapUpdate={this.forceMapUpdate} data={this.state.data[this.state.selection]} point={this.state.currentPoint} title={this.props.title} units={this.props.units} />
                {this.choice ? 
                    <DropdownButton onChange={this.select} id="dropdown-basic-button" title="Parameter">
                    <Dropdown.Item eventKey="1">Speed</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Suspension</Dropdown.Item>
                    <Dropdown.Item eventKey="3">Throttle Position</Dropdown.Item>
                    </DropdownButton> :
                    null
                }
            </div>
        );
    }

}