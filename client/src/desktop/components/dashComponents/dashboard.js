import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import DefaultPlottingDash from './plottingDash/defaultPlottingDashboard';
import DefaultDataDash from './dataDash/defaultDataDashboard';
import CustomPlottingDash from './plottingDash/customPlottingDashboard';
import CustomDataDash from './dataDash/customDataDashboard';
import GraphBox from './plottingDash/graphBox';
import '../../styling/dashboard.css';

export default class StreamingDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dashOption: 'default',
            typeOption: 'plotting',
            showTrackMap: false
        }
    }

    changeDash = () => { this.setState({ dashOption: (this.state.dashOption === 'default') ? 'custom' : 'default' }); }
    changeType = () => { this.setState({ typeOption: (this.state.typeOption === 'plotting') ? 'currentData' : 'plotting' }); }
    toggleTrackMap = () => { this.setState({ showTrackMap: (this.state.showTrackMap) ? false : true }); }

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
            <div id='trackMap' style={{ display: (this.state.showTrackMap) ? '' : 'none' }}>
                <GraphBox title={"Track Map"} id={10000} key={10000} />
            </div>
        )
        if (this.state.dashOption === 'default' && this.state.typeOption === 'plotting') {
            return (
                <div id='dashboard'>
                    {dashSelector}&nbsp;&nbsp;
                    {typeSelector}&nbsp;&nbsp;
                    <Button id='trackMapButton' onClick={this.toggleTrackMap} style={{ marginTop: '60px' }}><b>{(this.state.showTrackMap) ? 'Hide Track Map' : 'Show Track Map'}</b></Button>
                    <DefaultPlottingDash />
                    {trackMap}
                </div>
            );
        }
        else if (this.state.dashOption === 'custom' && this.state.typeOption === 'plotting') {
            return (
                <div id='dashboard'>
                    {dashSelector}&nbsp;&nbsp;
                    {typeSelector}&nbsp;&nbsp;
                    <Button id='trackMapButton' onClick={this.toggleTrackMap} style={{ marginTop: '60px' }}><b>{(this.state.showTrackMap) ? 'Hide Track Map' : 'Show Track Map'}</b></Button>
                    <CustomPlottingDash />
                </div>
            );
        }
        else if (this.state.dashOption === 'default' && this.state.typeOption === 'currentData') {
            return (
                <div id='dashboard'>
                    {dashSelector}&nbsp;&nbsp;
                    {typeSelector}&nbsp;&nbsp;
                    <Button id='trackMapButton' onClick={this.toggleTrackMap} style={{ marginTop: '60px' }}><b>{(this.state.showTrackMap) ? 'Hide Track Map' : 'Show Track Map'}</b></Button>
                    <DefaultDataDash />
                </div>
            );
        }
        else if (this.state.dashOption === 'custom' && this.state.typeOption === 'currentData') {
            return (
                <div id='dashboard'>
                    {dashSelector}&nbsp;&nbsp;
                    {typeSelector}&nbsp;&nbsp;
                    <Button id='trackMapButton' onClick={this.toggleTrackMap} style={{ marginTop: '60px' }}><b>{(this.state.showTrackMap) ? 'Hide Track Map' : 'Show Track Map'}</b></Button>
                    <CustomDataDash />
                </div>
            );
        }
    }
}
