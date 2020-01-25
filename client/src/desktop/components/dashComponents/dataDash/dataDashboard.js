import React from 'react';
import DataBox from './dataBox';
import { Row, Col } from 'react-bootstrap';

export default class DataDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTitles: this.props.dataInfo
        }
        this.dataBoxes = [];
        this.container = [];
    }

    componentWillMount = () => {
        this.createDataBoxes();
        this.createToRender();
    }

    createDataBoxes = () => {
        for (const data of this.state.dataTitles) {
            this.dataBoxes.push(<DataBox name={data} />);
        }
    }

    createToRender = () => {
        for (let i = 0; this.dataBoxes[i]; i += 2) {
            if (this.dataBoxes[i + 1]) {
                this.container.push(
                    <Row>
                        <Col>{this.dataBoxes[i]}</Col>
                        <Col>{this.dataBoxes[i + 1]}</Col>
                    </Row>
                );
            }
            else {
                this.container.push(
                    <Row>
                        <Col>{this.dataBoxes[i]}</Col>
                    </Row>
                );
            }
        }
    }

    render = () => {
        return (
            <div style={{ marginTop: '20px', marginRight: '15px', textAlign: 'center', color: '#FFF', fontWeight: '700' }}>
                {this.container}
            </div>
        );
    }
}