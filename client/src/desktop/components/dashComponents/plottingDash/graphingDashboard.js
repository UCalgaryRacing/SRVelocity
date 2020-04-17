import React from 'react';
import GraphBox from './graphBox';
import { Row, Col } from 'react-bootstrap';
import SensorData from '../../../../constants';

export default class GraphingDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plots: this.props.plots,
            currentGraph: null
        }
        this.graphs = [];
        this.container = [];
    }

    componentWillMount = () => {
        this.createGraphs();
    }

    createGraphs = () => {
        SensorData.getInstance().getSensors().then(sensorData => {
            var i = 0;
            for (const plot of this.state.plots) {
                const sensors = sensorData.filter(item => { return item.category === plot; });
                this.graphs.push(
                    <GraphBox
                        sensors={sensors}
                        id={i + 1}
                        key={i + 1}
                    />
                );
                i++;
            }
            for (const graph of this.graphs) this.container.push(<Row style={{ marginTop: '30px' }}><Col>{graph}</Col></Row>);
            this.forceUpdate();
        });
    }

    render = () => {
        return (
            <div style={{ marginBottom: '20px' }}>
                {this.container}
            </div>
        ); //Add copyright at the bottom
    }
}