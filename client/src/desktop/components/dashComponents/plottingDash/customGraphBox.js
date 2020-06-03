import React from 'react';
import LineChart from '../graphComponents/lineChart';
import HeatMap from '../graphComponents/heatMap';
import { Button } from 'react-bootstrap';
import { Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Data from '../../../../data';
import Dash from '../dashboard';
import '../../../styling/graphBox.css';
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

export default class CustomGraphBox extends React.Component {
    constructor(props){
        super(props);
        this.chart = React.createRef()
        this.state = {
            currentRange: 0.5,
            indicationColour: '#000',
            updatingRange: false,
            updatingTitles: false,
            updatingGrid: false,
            sensors: this.props.sensors,
            window: 5
        }
        this.dxdtParentIndices = [];
        this.index = 0;
    }

    render = () => {
        return(
            <div id='graphBox' style={{ borderColor: this.state.indicationColour, marginRight: '19px', marginLeft: '0px' }}>
                    <p id='graphTitle'><b style={{ color: this.state.indicationColour, fontSize: '1.8rem' }}>{this.props.sensors[0][0].category} vs. {this.props.sensors[1][0].category}</b></p>
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
                        <Button id='toggleAxis' onClick={this.toggleRightAxis} style={{ position: 'absolute', right: '95px', bottom: '60px' }}>
                            <img id="logoImg" src={require('../../../../assets/rightAxis.svg')} />
                        </Button>
                        <Button id='toggleAxis' onClick={this.toggleGrid} style={{ position: 'absolute', right: '45px', bottom: '60px' }}>
                            <img id="logoImg" src={require('../../../../assets/grid.svg')} />
                        </Button>
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
                        <div style={{ display: this.dxdtParentIndices.length > 0 ? '' : 'none' }}>
                            <p style={{ textAlign: 'center', marginBottom: '25px' }}><b>Smoothing Factor</b></p>
                            <RangeSlider
                                defaultValue={[5]}
                                onChange={this.handleWindowChange}
                                marks={true}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay='on'
                                step={2}
                                min={5}
                                max={255}
                                valueLabelFormat={(x) => {
                                    return x.toFixed(1);
                                }}
                            />
                        </div>
                        <Button id='deleteGraph' onClick={() => this.props.delete(this.props.id)} style={{ position: 'absolute', left: '70px', bottom: '60px' }}><b>Delete Graph</b></Button>
                    </div>
                </div>
        );
    }
}