import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { constDataTitles } from '../../../../constants';
import DataBoxM from './dataBoxM';

export default class DataDashM extends React.Component {
    constructor(props) {
        super(props);
        this.totalData = [];
        for (var sensor in constDataTitles) {
            this.totalData.push(sensor)
        }
        this.boxes = [];
        this.layout = [];
    }

    componentWillMount = () => {
        this.createBoxes();
        this.createLayout();
    }

    createLayout = () => {
        for (let i = 0; this.boxes[i]; i++) {
            this.layout.push(<Row><Col>{this.boxes[i]}</Col></Row>);
        }
    }

    createBoxes = () => {
        for (var sensor of this.totalData) {
            this.boxes.push(<DataBoxM name={sensor}></DataBoxM>);
        }
    }

    render = () => {
        return (
            <div style={{ marginTop: '20px', marginRight: '20px', marginLeft: '20px', textAlign: 'center', color: '#FFF', fontWeight: '700' }}>
                {this.layout}
            </div>
        );
    }
}