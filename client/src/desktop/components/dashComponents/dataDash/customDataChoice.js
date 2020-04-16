import React from 'react';
import {Form, Button} from 'react-bootstrap';
import {constDataTitles} from '../../../../constants';
import '../../../styling/customDataChoice.css';

export default class CustomDataChoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTitles: constDataTitles
        }
        this.switches = [];
        this.indexes = [];
    }

    componentWillMount = () => {
        var i = 0;
        var suspension, accel, axes = false;
        for (const data in this.state.dataTitles) {
            //Refactor this
            if(this.state.dataTitles[data][0] === 'Suspension' && !suspension) { 
                this.switches.push(<Form.Check name={this.state.dataTitles[data][0]} label={this.state.dataTitles[data][0]} id={data} key={i} onChange={this.selectData}/>);
                suspension = true; 
                continue;
            }
            if(this.state.dataTitles[data][0] === 'Acceleration' && !accel) { 
                this.switches.push(<Form.Check name={this.state.dataTitles[data][0]} label={this.state.dataTitles[data][0]} id={data} key={i} onChange={this.selectData}/>);
                accel = true; 
                continue;
            }
            if(this.state.dataTitles[data][0] === 'Axes' && !axes) { 
                this.switches.push(<Form.Check name={this.state.dataTitles[data][0]} label={this.state.dataTitles[data][0]} id={data} key={i} onChange={this.selectData}/>);
                axes = true; 
                continue;
            }
            if(this.state.dataTitles[data][0] !== 'Acceleration' && this.state.dataTitles[data][0] !== 'Suspension' && this.state.dataTitles[data][0] !== 'Axes') { 
                this.switches.push(<Form.Check name={this.state.dataTitles[data][0]} label={this.state.dataTitles[data][0]} id={data} key={i} onChange={this.selectData}/>);
            }
            i++;
        }
    }

    selectData = (event) => {
        if (!event.target.id) { event.target.id = 0; }
        let i = this.indexes.indexOf(event.target.id);
        //Refactor if possible
        if(event.target.id === "fl") {
            this.indexes.push("fl");
            this.indexes.push("fr");
            this.indexes.push("rl");
            this.indexes.push("rr");
        }
        else if(event.target.id === "x") {
            this.indexes.push("x");
            this.indexes.push("y");
            this.indexes.push("z");
        }
        else if(event.target.id === "roll") {
            this.indexes.push("roll");
            this.indexes.push("pitch");
            this.indexes.push("yaw");
        }
        else {
            if(i < 0) { this.indexes.push(event.target.id); } 
            else { this.indexes.splice(i, 1); }
        }
    }

    submit = (event) => {
        let selectedData = [];
        for(const i of this.indexes) selectedData.push(i); 
        this.props.enter(selectedData);
    }

    render = () => {
        return (
            <div id='graphChoice'>
                <Form>{this.switches}</Form>
                <Button id='submitButton' onClick={this.submit}>Submit</Button>
            </div>
        );
    }
}