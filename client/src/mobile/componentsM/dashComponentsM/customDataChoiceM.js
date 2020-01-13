import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { constDataTitles } from '../../../constants'

export default class CustomDataChoiceM extends React.Component {
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
        var suspension = false;
        var accel = false;
        for (const data in this.state.dataTitles) {
            if (this.state.dataTitles[data][0] === 'Suspension' && !suspension) {
                this.switches.push(<Form.Check name={this.state.dataTitles[data][0]} label={this.state.dataTitles[data][0]} id={data} key={i} onChange={this.selectData} />);
                suspension = true;
                continue;
            }
            if (this.state.dataTitles[data][0] === 'Acceleration' && !accel) {
                this.switches.push(<Form.Check name={this.state.dataTitles[data][0]} label={this.state.dataTitles[data][0]} id={data} key={i} onChange={this.selectData} />);
                accel = true;
                continue;
            }
            if (this.state.dataTitles[data][0] !== 'Acceleration' && this.state.dataTitles[data][0] !== 'Suspension') {
                this.switches.push(<Form.Check name={this.state.dataTitles[data][0]} label={this.state.dataTitles[data][0]} id={data} key={i} onChange={this.selectData} />);
            }
            i++;
        }
    }

    selectData = event => {
        if (!event.target.id) { event.target.id = 0 }
        let i = this.indexes.indexOf(event.target.id)
        if (i < 0) { this.indexes.push(event.target.id) }
        else { this.indexes.splice(i, 1) }
    }

    submit = event => {
        let selectedData = []
        for (const i of this.indexes) {
            selectedData.push(i)
        }
        this.props.enter(selectedData)
    }

    render = () => {
        return (
            <div id='dataChoice' style={{ fontWeight: '600', marginTop: '40px' }}>
                <Form>
                    {this.switches}
                </Form>
                <div style={{textAlign: 'center'}}>
                    <Button onClick={this.submit} style={{ fontWeight: '600', backgroundColor: '#C22D2D', borderColor: '#C22D2D', width: '90%', marginTop: '15px', marginBottom: '40px', fontSize: '20px' }}>Submit</Button>
                </div>
            </div>
        );
    }
}