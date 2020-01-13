import React from 'react';
import DataBoxM from './dataBoxM';
import { Row, Col, Modal } from 'react-bootstrap';

export default class CustomDataDashM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTitles: this.props.dataInfo
        }
        this.dataBoxes = []
        this.container = []
    }

    componentWillMount = () => {
        this.createDataBoxes();
        this.createToRender();
    }

    createDataBoxes = () => {
        var i = 0;
        for (const data of this.state.dataTitles) {
            this.dataBoxes.push(
                <DataBoxM name={data} />
            );
            i++;
        }
    }

    createToRender = () => {
        var i = 0;
        for (let i = 0; this.dataBoxes[i]; i++) {
            this.container.push(
                <Row>
                    <Col>
                        {this.dataBoxes[i]}
                    </Col>
                </Row>
            );
        }
    }

    render = () => {
        return (
            <div style={{ marginTop: '20px', textAlign: 'center', color: '#FFF', fontWeight: '600' }}>
                {this.container}
            </div>
        )
    }
}