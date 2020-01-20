import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import DefaultPlottingDash from './defaultPlottingDashboard';
import DefaultDataDash from './defaultDataDashboard';
import CustomPlottingDash from './customPlottingDashboard';
import CustomDataDash from './customDataDashboard';
import '../../styling/dashboard.css';

export default class StreamingDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dashOption: 'default',
            typeOption: 'plotting'
        }
    }

    changeDash = () => {
        this.setState({ dashOption: (this.state.dashOption === 'default') ? 'custom' : 'default' });
    }

    changeType = () => {
        this.setState({ typeOption: (this.state.typeOption === 'plotting') ? 'currentData' : 'plotting' });
    }

    render = () => {
        let dashSelector = (
            <ButtonGroup id='dashSelector' style={{marginTop: '60px'}}>
                <Button id='defaultButton' onClick={this.changeDash} disabled={(this.state.dashOption === 'default') ? true : false}><b>Default</b></Button>
                <Button id='customButton' onClick={this.changeDash} disabled={(this.state.dashOption === 'custom') ? true : false}><b>Custom</b></Button>
            </ButtonGroup >
        );
        let typeSelector = (
            <ButtonGroup id='dashSelector' style={{marginTop: '60px'}}>
                <Button id='defaultButton' onClick={this.changeType} disabled={(this.state.typeOption === 'plotting') ? true : false}><b>Plotting</b></Button>
                <Button id='customButton' onClick={this.changeType} disabled={(this.state.typeOption === 'currentData') ? true : false}><b>Current Data</b></Button>
            </ButtonGroup >
        );
        if(this.state.dashOption === 'default' && this.state.typeOption === 'plotting') {
            return (
                <div id='dashboard'>
                    {dashSelector}&nbsp;&nbsp;
                    {typeSelector}
                    <DefaultPlottingDash />
                </div>
            );
        }
        else if(this.state.dashOption === 'custom' && this.state.typeOption === 'plotting'){
            return (
                <div id='dashboard'>
                    {dashSelector}&nbsp;&nbsp;
                    {typeSelector}
                    <CustomPlottingDash />
                </div>
            );
        }
        else if(this.state.dashOption === 'default' && this.state.typeOption === 'currentData'){
            return (
                <div id='dashboard'>
                    {dashSelector}&nbsp;&nbsp;
                    {typeSelector}
                    <DefaultDataDash />
                </div>
            );
        }
        else if(this.state.dashOption === 'custom' && this.state.typeOption === 'currentData'){
            return (
                <div id='dashboard'>
                    {dashSelector}&nbsp;&nbsp;
                    {typeSelector}
                    <CustomDataDash />
                </div>
            );
        }
    }
}
