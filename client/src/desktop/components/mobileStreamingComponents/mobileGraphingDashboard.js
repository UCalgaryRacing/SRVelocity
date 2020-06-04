import React from 'react';
import MobileGraphBox from './mobileGraphBox';
import { Row, Col, Modal } from 'react-bootstrap';
import SensorData from '../../../constants';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import '../../styling/dashboard.css';


export default class MobileGraphingDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plots: SensorData.getInstance().getCategories(),
            currentGraph: null,
            showAddModal: false,
            modalSelectionOption: 'sensor'
        }
        this.graphs = [];
        this.container = [];
    }

  componentDidMount = () => {
    this.createGraph();
  };

    showAddModal = () => {
        this.setState({
            showAddModal: !this.state.showAddModal
        });
    }


    deleteFromDash = (index) => {
        this.state.plots.splice(index - 1, 1);
        this.graphs = [];
        this.container = [];
        this.createGraph();
    }

    createGraph = () => {
        this.setState()
        SensorData.getInstance().getSensors().then(sensorData => {
            var i = 0;
            for (const plot of this.state.plots) {
                const sensors = sensorData.filter(item => { return item.category === plot; });
                this.graphs.push(
                    
                );
                i++;
            }
            for (const graph of this.graphs) this.container.push(<Row style={{ marginTop: '30px' }}><Col>{graph}</Col></Row>);
            this.forceUpdate();
        });
    }


    render = () => {
        let modalSelector = (
            <ButtonGroup id='modalSelector' style={{ position: 'absolute', marginLeft: '140px' }}>
                <Button id='sensorButton' onClick={this.updateModal} disabled={(this.state.modalSelectionOption === 'sensor') ? true : false}><b>Sensor Graph</b></Button>
                <Button id='customButton' onClick={this.updateModal} disabled={(this.state.modalSelectionOption === 'custom') ? true : false}><b>Custom Graph</b></Button>
            </ButtonGroup>
        );
        return (
            <div>
                <div>
                    {this.container}
                </div>
        
            </div>
        ); //Add copyright at the bottom
    }
}
