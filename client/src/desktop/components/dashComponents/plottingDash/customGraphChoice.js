import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { constGraphTitles } from '../../../../constants';

export default class CustomGraphChoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graphTitles: constGraphTitles,
            over_max: false
        }
        this.switches = [];
        this.indexes = [];
        this.MAX_GRAPHS = 10;
    }

    componentWillMount = () => {
        var i = 1;
        for (const graph of this.state.graphTitles) {
            this.switches.push(<Form.Check name={graph.title} label={graph.title} id={i} key={i} onChange={this.selectGraph} />);
            i++;
        }
    }

    selectGraph = (event) => {
        if (!event.target.id) { event.target.id = 0; }
        let i = this.indexes.indexOf(event.target.id);
        if (i < 0) { this.indexes.push(event.target.id); }
        else { this.indexes.splice(i, 1); }
    }

    submit = (event) => {
        if (this.indexes.length > this.MAX_GRAPHS) {
            this.setState({ over_max: true })
            return;
        }
        let selectedGraphs = [];
        for (const i of this.indexes) { selectedGraphs.push(this.state.graphTitles[i - 1]); }
        this.props.enter(selectedGraphs);
    }

    render = () => {
        return (
            <div id='graphChoice' style={{ fontWeight: '600' }}>
                {this.state.over_max ?
                    <p>Please select only {this.MAX_GRAPHS} graphs. ({this.indexes.length} currently chosen)</p> : null}
                <Form>{this.switches}</Form>
                <Button onClick={this.submit} style={{ fontWeight: '600', backgroundColor: '#C22D2D', borderColor: '#C22D2D', width: '366px', marginLeft: '-20px', marginTop: '15px' }}>Submit</Button>
            </div>
        );
    }
}
