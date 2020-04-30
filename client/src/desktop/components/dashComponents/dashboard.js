import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import GraphingDashboard from './plottingDash/graphingDashboard';
import DataDashboard from './dataDash/dataDashboard';
import CustomPlottingDash from './plottingDash/customPlottingDashboard';
import CustomDataDash from './dataDash/customDataDashboard';
import GraphBox from './plottingDash/graphBox';
import RadialChart from './graphComponents/radialChart';
import Data from '../../../data';
import SensorData from '../../../constants';
import '../../styling/dashboard.css';

export default class StreamingDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dashOption: 'default',
            typeOption: 'plotting',
            showTrackMap: false,
            showAccelMap: false,
            selectionComplete: true
        }
    }

    changeDash = () => {
        this.setState({ 
            dashOption: (this.state.dashOption === 'default') ? 'custom' : 'default',
            selectionComplete: (this.state.dashOption === 'default') ? false : true
        });
    }

    changeType = () => {
        this.setState({ typeOption: (this.state.typeOption === 'plotting') ? 'currentData' : 'plotting' });
    }

    toggleTrackMap = () => {
        if (!this.state.showTrackMap) { this.setState({ showAccelMap: false }); }
        this.setState({ showTrackMap: (this.state.showTrackMap) ? false : true });
    }

    toggleAccelMap = () => {
        if (!this.state.showAccelMap) { this.setState({ showTrackMap: false }); }
        this.setState({ showAccelMap: (this.state.showAccelMap) ? false : true });
    }

    doTestRun = () => {
        Data.getInstance().doTestRun()
    }

    updateSelectionComplete = () => {
        this.setState({selectionComplete: !this.state.selectionComplete})
    }

    render = () => {
        let defaultDash = ['Track Map', 'Engine Temp', 'Oil Pressure', 'Oil Temp', 'Air To Fuel', 'Fuel Temp', 'Acceleration', 'Axes']
        let dashSelector = (
            <ButtonGroup id='dashSelector'>
                <Button id='defaultButton' onClick={this.changeDash} disabled={(this.state.dashOption === 'default') ? true : false}><b>Default</b></Button>
                <Button id='customButton' onClick={this.changeDash} disabled={(this.state.dashOption === 'custom') ? true : false}><b>Custom</b></Button>
            </ButtonGroup >
        );
        let typeSelector = (
            <ButtonGroup id='dashSelector'>
                <Button id='defaultButton' onClick={this.changeType} disabled={(this.state.typeOption === 'plotting') ? true : false}><b>Plotting</b></Button>
                <Button id='customButton' onClick={this.changeType} disabled={(this.state.typeOption === 'currentData') ? true : false}><b>Current Data</b></Button>
            </ButtonGroup >
        );
        let testRun = (<Button id='accelMapButton' onClick={this.doTestRun} style={{ position: 'absolute', right: '20px' }}><b>Do a Test Run</b></Button>);
        let trackMap = (<div id='trackMap'><GraphBox sensors={[{ category: 'Track Map' }]} id={10000} key={10000} /></div>);
        let accelMap = (<div id='accelMap'><RadialChart showLabels={false} /></div>);
        return (
            <div id='dashboard'>
                {dashSelector}&nbsp;&nbsp;
                {typeSelector}&nbsp;&nbsp;
                {this.state.selectionComplete ? <Button id='trackMapButton' onClick={this.toggleTrackMap}><b>{(this.state.showTrackMap) ? 'Hide Track Map' : 'Show Track Map'}</b></Button> : null}
                {this.state.selectionComplete ? <Button id='accelMapButton' onClick={this.toggleAccelMap} style={{ marginLeft: '8px' }}><b>{(this.state.showAccelMap) ? 'Hide Accel Map' : 'Show Accel Map'}</b></Button> : null}
                {this.state.selectionComplete ? testRun : ''}
                {(this.state.dashOption === 'default') ?
                    ((this.state.typeOption === 'plotting') ? <GraphingDashboard plots={defaultDash} /> : <DataDashboard categories={SensorData.getInstance().getCategories()} />) :
                    ((this.state.typeOption === 'plotting') ? <CustomPlottingDash updateSelectionComplete={this.updateSelectionComplete}/> : <CustomDataDash updateSelectionComplete={this.updateSelectionComplete}/>)}
                {this.state.showTrackMap ? trackMap : ''}
                {this.state.showAccelMap ? accelMap : ''}
            </div>
        );
    }
}
