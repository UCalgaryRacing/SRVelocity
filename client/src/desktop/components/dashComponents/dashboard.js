import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import DefaultDash from './defaultDashboard';
import CustomDash from './customDashboard';
import '../../styling/dashboard.css';

export default class StreamingDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: 'default'
        }
        this.changeDash = this.changeDash.bind(this);
    }

    changeDash = () => {
        this.setState({
            option: (this.state.option === 'default') ? 'custom' : 'default'
        });
    }

    render = () => {
        let selector = (
            <ButtonGroup id='dashSelector' style={{marginTop: '60px'}}>
                <Button id='defaultButton' onClick={this.changeDash} disabled={(this.state.option === 'default') ? true : false}><b>Default</b></Button>
                <Button id='customButton' onClick={this.changeDash} disabled={(this.state.option === 'custom') ? true : false}><b>Custom</b></Button>
            </ButtonGroup >
        );
        if (this.state.option === 'default') {
            return (
                <div id='dashboard'>
                    {selector}
                    <DefaultDash />
                </div>
            );
        }
        else {
            return (
                <div id='dashboard'>
                    {selector}
                    <CustomDash />
                </div>
            );
        }
    }
}
