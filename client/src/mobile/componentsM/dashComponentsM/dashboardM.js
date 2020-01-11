import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import DefaultDashM from './defaultDashM';
import CustomDashM from './customDashM';
import '../../styling/dashM.css';

export default class StreamingDashM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render = () => {
        if (this.props.toggleDashType === 'default') {
            return (
                <div id='dashboard'>
                    <DefaultDashM />
                </div>
            );
        }
        else {
            return (
                <div id='dashboard'>
                    <CustomDashM />
                </div>
            );
        }
    }
}
