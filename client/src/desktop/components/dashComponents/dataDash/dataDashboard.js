import React from 'react';
import DataBox from './dataBox';
import { Row, Col } from 'react-bootstrap';
import SensorData from '../../../../constants';

export default class DataDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: this.props.categories
        }
        this.dataBoxes = [];
        this.container = [];
    }

    componentWillMount = () => {
        this.createDataBoxes();
    }

    createDataBoxes = () => {
        SensorData.getInstance().getSensors().then(async sensorData => {
            var i = 0;
            var categories = await this.state.categories;
            for (const category of categories) { 
                const sensors = sensorData.filter(item => { return item.category === category; });
                for(const sensor of sensors) {
                    this.dataBoxes.push(<DataBox sensor={sensor} id={i} key={i}/>); 
                    i++;
                }
            }
            for (let i = 0; this.dataBoxes[i]; i += 2) {
                if (this.dataBoxes[i + 1]) {
                    this.container.push(
                        <Row>
                            <Col>{this.dataBoxes[i]}</Col>
                            <Col>{this.dataBoxes[i + 1]}</Col>
                        </Row>
                    );
                }
                else this.container.push(<Row><Col>{this.dataBoxes[i]}</Col></Row>);
            }
            this.forceUpdate();
        })
    }

    render = () => {
        return (
            <div style={{ marginTop: '20px', marginRight: '15px', textAlign: 'center', color: '#FFF', fontWeight: '700' }}>
                {this.container}
            </div>
        );
    }
}