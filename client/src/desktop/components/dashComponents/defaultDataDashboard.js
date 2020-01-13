import React from 'react';
import { Row, Col } from 'react-bootstrap';
import {constDataTitles} from '../../../constants';
import DataBox from "./dataBox";
import '../../styling/defaultDash.css';

export default class DefaultDataDash extends React.Component {
    constructor(props) {
        super(props);
        this.totalData = []
        for (var sensor in constDataTitles) {
            this.totalData.push(sensor)
        }
        this.boxes = []
        this.layout = []
    }

    componentWillMount() {
        this.createBoxes()
        this.createLayout()
    }

    createLayout = () => {
        for (let i = 0; this.boxes[i]; i += 2) {
            if (this.boxes[i+1]) {
                this.layout.push(
                    <Row>
                        <Col>
                            {this.boxes[i]}
                        </Col>
                        <Col>
                            {this.boxes[i + 1]}
                        </Col>
                    </Row>
                )
            } 
            else {
                this.layout.push(
                    <Row>
                        <Col>
                            {this.boxes[i]}
                        </Col>
                    </Row>
                )
            }
        }
    }

    createBoxes = () => {
        for (var sensor of this.totalData) {
            this.boxes.push(
                <DataBox name={sensor}></DataBox>
            )
        }
    }

    render = () => {
        return (
            <div style={{ marginTop: '20px', marginRight: '15px', textAlign: 'center', color: '#FFF', fontWeight: '700' }}>
                {this.layout}
            </div>
        );
    }
}