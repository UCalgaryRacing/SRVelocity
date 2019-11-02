import React from 'react';
import '../../styling/defaultDash.css';
import LineGraph from '../lineGraph';
import GraphBox from '../graphBox';
import { Row, Col, Button } from 'react-bootstrap';

export default class DefaultDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            renderAllSwitch: true,
            singleGraph: null
        }
    }

    renderOne = (event) => {
        event.preventDefault()
        this.setState({
            renderAllSwitch: false,
            singleGraph: [this.graphs[event.target.id], <Button onClick={this.renderAll}>Close</Button>]
        })
    }

    renderAll = (event) => {
        this.setState({ renderAllSwitch: true })
    }

    createAll = () => {                                     //organizes the graphs into rows and columsn (2 graphs a row)
        for (let i = 0; i < this.graphs.length; i += 2) {
            if (i === this.graphs.length - 1) {
                this.container.push(<Row>
                    <Col>{this.graphs[i]}</Col>
                </Row>)
            } else {
                this.container.push(<Row>
                    <Col>{this.graphs[i]}</Col>
                    <Col>{this.graphs[i + 1]}</Col>
                </Row>)
            }
        }
    }


    render = () => {
        return (
            <div id='defaultDash'>
                <Row>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='RPM'/>
                    </Col>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Suspension'/>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Throttle Position'/>
                    </Col>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Injector Pulse Width'/>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Barometer'/>
                    </Col>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Manifold Air Pressure'/>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Air To Fuel'/>
                    </Col>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Intake Air Temperature'/>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Engine Temperature'/>
                    </Col>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Oil Pressure'/>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Oil Temperature'/>
                    </Col>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Fuel Temperature'/>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Acceleration'/>
                    </Col>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Roll'/>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Pitch'/>
                    </Col>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Yaw'/>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Speed'/>
                    </Col>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Distance'/>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginTop: '30px' }}>
                        <GraphBox title='Track Map'/>
                    </Col>
                </Row>
            </div>
        );
    }
}