import React from 'react';
import LineGraphM from '../graphComponentsM/lineGraph';
import CalculationBoxM from './calculationBox';
import { Col, Row } from 'react-bootstrap'
import '../../styling/graphBoxM.css'

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class GraphBoxM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLabel: 3,
            data: {
                labels: [0, 1, 2],
                datasets: [{
                    data: [1, 2, 3],
                    borderColor: 'rgb(255, 0, 0)',
                    pointRadius: 1,
                    backgroundColor: 'rgb(255, 255, 255)',
                    lineTension: 0
                }]
            }
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 200);
        this.state.data.datasets[0].label = this.props.title
    }

    pullData = () => {
        this.state.data.labels.push(this.state.currentLabel.toString());
        this.state.data.datasets[0].data.push(getRandomInt(0, 10));
        let newTime = this.state.currentLabel + 1;
        this.setState({ currentLabel: (this.state.currentLabel + 1) });

        if (this.state.currentLabel - 30 > this.state.data.labels[0]) {
            this.state.data.labels.shift();
            this.state.data.datasets[0].data.shift();
        }
    }

    tick = () => {
        this.pullData();
    }

    formulaTest1 = () => {
        return (this.state.data.datasets[0].data[this.state.data.datasets[0].data.length - 1]) * 2
    }

    render = () => {
        return (
            <div id='graphBoxM'>
                <p id='graphTitleM'><b>{this.props.title}</b></p>
                <LineGraphM title={this.props.title} units={this.props.units} data={this.state.data} />
                <Row style={{ marginRight: 0, marginLeft: 0 }}>
                    <Col style={{ paddingRight: 0, paddingLeft: 0 }}>
                        <CalculationBoxM title='RPM' data={this.state.data.datasets[0].data[this.state.data.datasets[0].data.length - 1]} />
                    </Col>
                    <Col style={{ paddingRight: 0, paddingLeft: 0 }}>
                        <CalculationBoxM title='RPM' data={this.state.data.datasets[0].data[this.state.data.datasets[0].data.length - 1]} />
                    </Col>
                    <Col style={{ paddingRight: 0, paddingLeft: 0 }}>
                        <CalculationBoxM title='RPM' data={this.state.data.datasets[0].data[this.state.data.datasets[0].data.length - 1]} />
                    </Col>
                </Row>
            </div>
        );
    }
}