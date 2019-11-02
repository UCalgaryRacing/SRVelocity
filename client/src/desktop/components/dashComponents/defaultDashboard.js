import React from 'react';
import '../../styling/defaultDash.css';
import LineGraph from '../lineGraph';
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
                    <Col>
                        <LineGraph />
                    </Col>
                    <Col>
                        <LineGraph />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <LineGraph />
                    </Col>
                    <Col>
                        <LineGraph />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <LineGraph />
                    </Col>
                    <Col>
                        <LineGraph />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <LineGraph />
                    </Col>
                    <Col>
                        <LineGraph />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <LineGraph />
                    </Col>
                    <Col>
                        <LineGraph />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <LineGraph />
                    </Col>
                    <Col>
                        <LineGraph />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <LineGraph />
                    </Col>
                    <Col>
                        <LineGraph />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <LineGraph />
                    </Col>
                    <Col>
                        <LineGraph />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <LineGraph />
                    </Col>
                    <Col>
                        <LineGraph />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <LineGraph />
                    </Col>
                </Row>
            </div>
        );
    }
}