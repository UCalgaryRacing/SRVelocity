import React from 'react';
import GraphBox from './graphBox';
import { Row, Col, Modal } from 'react-bootstrap';
import SensorData from '../../../../constants';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ModalSensorChoice from '../modalSensorChoice';
import ModalCustomChoice from '../modalCustomChoice';
import '../../../styling/dashboard.css';

export default class GraphingDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plots: this.props.plots,
            currentGraph: null,
            showAddModal: false,
            modalSelectionOption: 'sensor'
        }
        this.graphs = [];
        this.container = [];
    }

    componentWillMount = () => {
        this.createGraphs();
    }

    showAddModal = () => {
        this.setState({
            showAddModal: !this.state.showAddModal
        });
    }

    updateModal = () => {
        this.setState({
            modalSelectionOption: (this.state.modalSelectionOption === 'sensor') ? 'custom' : 'sensor'
        });
    }

    addToDash = (selectedGraphs) => {
        console.log(selectedGraphs)
        SensorData.getInstance().getSensors().then(sensorData => {
            var i = 0;
            let prevLength = this.state.plots.length;
            for (const graph of selectedGraphs) {
                const sensors = sensorData.filter(item => { return item.category === graph; });
                this.graphs.push(
                    <GraphBox
                        sensors={sensors}
                        id={this.state.plots.length + i + 1}
                        key={this.state.plots.length + i + 1}
                        delete={this.deleteFromDash}
                    />
                );
                this.state.plots.push(graph);
            }
            var j = 0;
            for (const graph of this.graphs) {
                if(prevLength <= j)
                    this.container.push(<Row style={{ marginTop: '30px' }}><Col>{graph}</Col></Row>);
                j++;
            }
            this.forceUpdate();
        });
    }

    deleteFromDash = (index) => {
        this.state.plots.splice(index - 1, 1);
        this.graphs = [];
        this.container = [];
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
                        delete={this.deleteFromDash}
                    />
                );
                i++;
            }
            for (const graph of this.graphs) this.container.push(<Row style={{ marginTop: '30px' }}><Col>{graph}</Col></Row>);
            this.forceUpdate();
        });
    }

    sendOptions = (x, y) => {
        SensorData.getInstance().getSensors().then(sensorData => {
            const xSensor = sensorData.filter(item => { return item.category === x });
            const ySensor = sensorData.filter(item => { return item.category === y });

            this.graphs.push(
                <GraphBox
                    delete={this.deleteFromDash}
                />
            );
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
                <div style={{ marginBottom: '20px' }}>
                    {this.container}
                </div>
                <Modal show={this.state.showAddModal} onHide={this.showAddModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <b style={{ position: 'absolute', marginLeft: '8px', marginBottom: '18px', marginTop: '2px' }}>Add Graph</b>
                            &nbsp;&nbsp;{modalSelector}&nbsp;&nbsp;
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {(this.state.modalSelectionOption === 'sensor') ?
                            <ModalSensorChoice hide={this.showAddModal} numDisplayed={this.props.plots.length} displayed={this.props.plots} add={this.addToDash} updateSelectionComplete={this.updateAddedGraphs} /> :
                            <ModalCustomChoice hide={this.showAddModal} sendOptions={this.sendOptions} />}
                    </Modal.Body>
                </Modal>
            </div>
        ); //Add copyright at the bottom
    }
}