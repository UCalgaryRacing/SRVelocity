import React from 'react';
import GraphBox from './graphBox';
import { Row, Col } from 'react-bootstrap';

export default class GraphingDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graphTitles: this.props.graphInfo,
            displayModal: false,
            currentGraph: null
        }
        this.graphs = [];
        this.container = [];
    }

    componentWillMount = () => {
        this.createGraphs();
        this.createToRender();
    }

    createGraphs = () => {
        var i = 0
        for (const graph of this.state.graphTitles) {
            this.graphs.push(<GraphBox title={graph.title} id={i + 1} units={graph.units} key={i + 1} />);
            i++;
        }
    }

    createToRender = () => {
        for (const graph of this.graphs) {
            this.container.push(<Row style={{ marginTop: '30px' }}><Col>{graph}</Col></Row>);
        }
    }

    render = () => {
        return (
            <>{this.container}</>
        );
    }
}