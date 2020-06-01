import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import GraphingDashboard from './plottingDash/graphingDashboard';
import DataDashboard from './dataDash/dataDashboard';
import CustomPlottingDash from './plottingDash/customPlottingDashboard';
import CustomDataDash from './dataDash/customDataDashboard';
import QuickMaps from './quickMaps';
import Data from '../../../data';
import SensorData from '../../../constants';
import '../../styling/dashboard.css';

export default class StreamingDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dashOption: 'default',
            typeOption: 'plotting',
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

    doTestRun = () => {
        Data.getInstance().doTestRun();
    }

    updateSelectionComplete = () => {
        this.setState({ selectionComplete: !this.state.selectionComplete });
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
            <ButtonGroup id='dashSelector' style={{ position: 'fixed' }}>
                <Button id='defaultButton' onClick={this.changeType} disabled={(this.state.typeOption === 'plotting') ? true : false}><b>Plotting</b></Button>
                <Button id='customButton' onClick={this.changeType} disabled={(this.state.typeOption === 'currentData') ? true : false}><b>Current Data</b></Button>
            </ButtonGroup >
        );
        let testRun = (<Button id='accelMapButton' onClick={this.doTestRun} style={{ position: 'absolute', right: '20px' }}><b>Do a Test Run</b></Button>);
        return (
            <div id='dashboard'>
                <div style={{ position: 'fixed', top: '56px', right: '0', left: '0', zIndex: '999', height: '60px', paddingLeft: '80px', paddingTop: '12px', background: '#F5F5F5', borderColor: '#C22D2D', borderWidth: '0', borderBottomWidth: '2px', borderStyle: 'solid'}}>
                    {dashSelector}&nbsp;&nbsp;
                    {typeSelector}&nbsp;&nbsp;
                    {this.state.selectionComplete ? testRun : ''}
                </div>
                <div style={{ paddingTop: '98px' }}>
                    {(this.state.dashOption === 'default') ?
                        ((this.state.typeOption === 'plotting') ? <GraphingDashboard plots={defaultDash} /> : <DataDashboard categories={SensorData.getInstance().getCategories()} />) :
                        ((this.state.typeOption === 'plotting') ? <CustomPlottingDash updateSelectionComplete={this.updateSelectionComplete} /> : <CustomDataDash updateSelectionComplete={this.updateSelectionComplete} />)}
                </div>
                <QuickMaps />
            </div>
        );
    }
}
