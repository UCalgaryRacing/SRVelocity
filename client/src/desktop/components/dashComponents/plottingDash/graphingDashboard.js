import React from 'react';
import GraphBox from './graphBox';
import CustomGraphBox from './customGraphBox';
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
        this.customGraph = [];
        this.container = [];
        this.customSensors = [];
    }

    componentWillMount = () => {
        this.createGraphs();
    }

    componentDidUpdate = (prevProps) => {
        if(this.props.plots != prevProps.plots){
            this.graphs = []
            this.container = []
            this.setState({ plots: this.props.plots }, function(){ this.createGraphs() })
        }
    }

    showAddModal = () => {
        this.setState({
            showAddModal: !this.state.showAddModal
        })
    }
    
    updateModal = () => {
        this.setState({
            modalSelectionOption: (this.state.modalSelectionOption === 'sensor') ? 'custom' : 'sensor'
        })
    }

    addToDash = (selectedGraphs) => {
        this.props.add(selectedGraphs)
    }

    deleteFromDash = (index) => {
        this.props.delete(index)
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
            const xSensor = sensorData.filter(item => { return item.category === x })
            const ySensor = sensorData.filter(item => { return item.category === y })
            this.customSensors = [];
            this.customSensors.push(xSensor);
            this.customSensors.push(ySensor);
            this.graphs.push(
                <CustomGraphBox
                    id={this.state.plots.length + 1}
                    sensors={this.customSensors}
                    delete={this.deleteFromDash}
                />
            );
            this.container = []
            for (const graph of this.graphs) this.container.push(<Row style={{ marginTop: '30px' }}><Col>{graph}</Col></Row>);
            this.showAddModal();
            this.forceUpdate();
        });
    }

    render = () => {
        let modalSelector = (
            <ButtonGroup id='modalSelector' style={{ position: 'absolute', marginLeft: '140px' }}>
                <Button id='sensorButton' onClick={this.updateModal} disabled={(this.state.modalSelectionOption === 'sensor') ? true : false}><b>Sensor Graph</b></Button>
                <Button id='customButton' onClick={this.updateModal} disabled={(this.state.modalSelectionOption === 'custom') ? true : false}><b>Custom Graph</b></Button>
            </ButtonGroup>
        )
        return (
            <div>
                <div style={{ marginBottom: '20px' }}>
                    {this.container}
                </div>
                <Button id='addGraph' onClick={this.showAddModal} style={{ position: 'absolute', width: '93%' }}><b>Add Graph</b></Button>
                <Modal show={this.state.showAddModal} onHide={this.showAddModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <b style={{ position: 'absolute', marginLeft: '8px', marginBottom: '18px', marginTop: '2px' }}>Add Graph</b>
                            &nbsp;&nbsp;{modalSelector}&nbsp;&nbsp;
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {(this.state.modalSelectionOption === 'sensor') ?
                        <ModalSensorChoice hide={this.showAddModal} numDisplayed={this.props.plotsLength} displayed={this.props.plots} add={this.addToDash} updateSelectionComplete={this.updateAddedGraphs}/> :
                        <ModalCustomChoice hide={this.showAddModal} sendOptions={this.sendOptions} add={this.addToDash}/>}
                    </Modal.Body>
                </Modal>
            </div>
        ); //Add copyright at the bottom
    }
}