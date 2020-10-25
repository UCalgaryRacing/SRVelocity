import React from 'react';
import ScatterPlot from '../../GraphComponents/scatterPlot.js'
import { Button } from 'react-bootstrap';

export default class CustomScatterGraphBox extends React.Component {
    constructor(props){
        super(props);
        this.chart = React.createRef()
        this.state = {
            currentRange: 0.5,
            indicationColour: '#000',
            updatingRange: false,
            updatingTitles: false,
            updatingGrid: false,
            xSensor: this.props.xSensor,
            ySensor: this.props.ySensor,
            window: 5
        }
        this.dxdtParentIndices = [];
        this.index = 0;
    }

    componentWillMount() {
        document.addEventListener('gotData', () => { this.pullData() });
    }

    componentWillUnmount() {
        document.removeEventListener('gotData', this.pullData() );
    }

    render = () => {
        return(
            <div id='graphBox' style={{ marginRight: '19px', marginLeft: '0px' }}>
                <p id='graphTitle'><b style={{ color: this.state.indicationColour, fontSize: '1.8rem' }}>{this.state.ySensor[0].category} vs. {this.state.xSensor[0].category}</b></p>
                <div style={{ width: '100%' }}>
                    <ScatterPlot custom={true}/>
                </div>
                <Button id='deleteGraph' onClick={() => this.props.delete(this.props.id)} style={{ position: 'absolute', left: '50px', bottom: '20px' }}><b>Delete Graph</b></Button>
            </div>
        );
    }
}