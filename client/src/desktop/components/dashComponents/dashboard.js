import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import DefaultPlottingDash from './plottingDash/defaultPlottingDashboard';
import DefaultDataDash from './dataDash/defaultDataDashboard';
import CustomPlottingDash from './plottingDash/customPlottingDashboard';
import CustomDataDash from './dataDash/customDataDashboard';
import GraphBox from './plottingDash/graphBox';
import RadialChart from '../graphComponents/radialChart';
import '../../styling/dashboard.css';

export default class StreamingDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dashOption: 'default',
            typeOption: 'plotting',
            showTrackMap: false,
            showAccelMap: false
        }
    }

    changeDash = () => { this.setState({ dashOption: (this.state.dashOption === 'default') ? 'custom' : 'default' }); }
    changeType = () => { this.setState({ typeOption: (this.state.typeOption === 'plotting') ? 'currentData' : 'plotting' }); }
    toggleTrackMap = () => { 
        if(!this.state.showTrackMap) { this.setState({showAccelMap: false}); }
        this.setState({ showTrackMap: (this.state.showTrackMap) ? false : true }); 
    }
    toggleAccelMap = () => { 
        if(!this.state.showAccelMap) { this.setState({showTrackMap: false}); }
        this.setState({ showAccelMap: (this.state.showAccelMap) ? false : true }); 
    }

    render = () => {
        let dashSelector = (
            <ButtonGroup id='dashSelector' style={{ marginTop: '60px' }}>
                <Button id='defaultButton' onClick={this.changeDash} disabled={(this.state.dashOption === 'default') ? true : false}><b>Default</b></Button>
                <Button id='customButton' onClick={this.changeDash} disabled={(this.state.dashOption === 'custom') ? true : false}><b>Custom</b></Button>
            </ButtonGroup >
        );
        let typeSelector = (
            <ButtonGroup id='dashSelector' style={{ marginTop: '60px' }}>
                <Button id='defaultButton' onClick={this.changeType} disabled={(this.state.typeOption === 'plotting') ? true : false}><b>Plotting</b></Button>
                <Button id='customButton' onClick={this.changeType} disabled={(this.state.typeOption === 'currentData') ? true : false}><b>Current Data</b></Button>
            </ButtonGroup >
        );
        let trackMap = (
            <div id='trackMap'><GraphBox title={"Track Map"} id={10000} key={10000} /></div>
        )
        let accelMap = (
            <div id='accelMap'><RadialChart showLabels={false}/></div>
        )
        if (this.state.dashOption === 'default' && this.state.typeOption === 'plotting') {
            return (
                <div id='dashboard'>
                    {dashSelector}&nbsp;&nbsp;
                    {typeSelector}&nbsp;&nbsp;
                    <Button id='trackMapButton' onClick={this.toggleTrackMap} style={{ marginTop: '60px' }}><b>{(this.state.showTrackMap) ? 'Hide Track Map' : 'Show Track Map'}</b></Button>
                    <Button id='accelMapButton' onClick={this.toggleAccelMap} style={{ marginTop: '60px', marginLeft: '8px' }}><b>{(this.state.showAccelMap) ? 'Hide Accel Map' : 'Show Accel Map'}</b></Button>
                    <DefaultPlottingDash />
                    {this.state.showTrackMap?trackMap:''}
                    {this.state.showAccelMap?accelMap:''}
                </div>
            );
        }
        else if (this.state.dashOption === 'custom' && this.state.typeOption === 'plotting') {
            return (
                <div id='dashboard'>
                    {dashSelector}&nbsp;&nbsp;
                    {typeSelector}&nbsp;&nbsp;
                    <Button id='trackMapButton' onClick={this.toggleTrackMap} style={{ marginTop: '60px' }}><b>{(this.state.showTrackMap) ? 'Hide Track Map' : 'Show Track Map'}</b></Button>
                    <Button id='accelMapButton' onClick={this.toggleAccelMap} style={{ marginTop: '60px', marginLeft: '8px' }}><b>{(this.state.showAccelMap) ? 'Hide Accel Map' : 'Show Accel Map'}</b></Button>
                    <CustomPlottingDash />
                    {this.state.showTrackMap?trackMap:''}
                    {this.state.showAccelMap?accelMap:''}
                </div>
            );
        }
        else if (this.state.dashOption === 'default' && this.state.typeOption === 'currentData') {
            return (
                <div id='dashboard'>
                    {dashSelector}&nbsp;&nbsp;
                    {typeSelector}&nbsp;&nbsp;
                    <Button id='trackMapButton' onClick={this.toggleTrackMap} style={{ marginTop: '60px' }}><b>{(this.state.showTrackMap) ? 'Hide Track Map' : 'Show Track Map'}</b></Button>
                    <Button id='accelMapButton' onClick={this.toggleAccelMap} style={{ marginTop: '60px', marginLeft: '8px' }}><b>{(this.state.showAccelMap) ? 'Hide Accel Map' : 'Show Accel Map'}</b></Button>
                    <DefaultDataDash />
                    {this.state.showTrackMap?trackMap:''}
                    {this.state.showAccelMap?accelMap:''}
                </div>
            );
        }
        else if (this.state.dashOption === 'custom' && this.state.typeOption === 'currentData') {
            return (
                <div id='dashboard'>
                    {dashSelector}&nbsp;&nbsp;
                    {typeSelector}&nbsp;&nbsp;
                    <Button id='trackMapButton' onClick={this.toggleTrackMap} style={{ marginTop: '60px' }}><b>{(this.state.showTrackMap) ? 'Hide Track Map' : 'Show Track Map'}</b></Button>
                    <Button id='accelMapButton' onClick={this.toggleAccelMap} style={{ marginTop: '60px', marginLeft: '8px' }}><b>{(this.state.showAccelMap) ? 'Hide Accel Map' : 'Show Accel Map'}</b></Button>
                    <CustomDataDash />
                    {this.state.showTrackMap?trackMap:''}
                    {this.state.showAccelMap?accelMap:''}
                </div>
            );
        }
    }
}
