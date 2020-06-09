import React from 'react';
import GraphBox from './graphBox';
import CustomScatterGraphBox from './customScatterGraphBox';
import { Row, Col, Modal, Button, ButtonGroup} from 'react-bootstrap';
import SensorData from '../../../../constants';
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
    };

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
                if (prevLength <= j)
                    this.container.push(<Row style={{ marginTop: '30px', width: '100%', marginRight: '0', marginLeft: '0' }}><Col style={{ padding: '0', marginLeft: '0px', marginRight: '0px' }}>{graph}</Col></Row>);
                j++;
            }
            this.forceUpdate();
        });
    }

    deleteFromDash = (index) => {
        this.graphs = [];
        this.container = [];
        this.state.plots.splice(index - 1, 1);
        this.setState({ plots: this.state.plots });
        this.createGraphs();
    }

    createGraphs = () => {
        SensorData.getInstance().getSensors().then(sensorData => {
            var i = 0;
            for (const plot of this.state.plots) {
                if(plot.includes('Custom')){
                    var xTemp = plot.slice(plot.indexOf('-') + 1); //Part of the string that has sensor names
                    var yTemp = xTemp.slice(xTemp.indexOf('-') + 1); //Get y sensor from end of string
                    xTemp = xTemp.slice(0, xTemp.indexOf('-')); //Get x sensor from middle of string
                    
                    const xSensor = sensorData.filter(item => { return item.category === xTemp })
                    const ySensor = sensorData.filter(item => { return item.category === yTemp })
                    this.graphs.push(
                        <CustomScatterGraphBox
                            id={i + 1}
                            xSensor={xSensor}
                            ySensor={ySensor}
                            delete={this.deleteFromDash}
                        />
                    );
                }
                else{
                    const sensors = sensorData.filter(item => { return item.category === plot; });
                    this.graphs.push(
                        <GraphBox
                            sensors={sensors}
                            id={i + 1}
                            key={i + 1}
                            delete={this.deleteFromDash}
                        />
                    );
                }
                i++;
            }
            for (const graph of this.graphs) this.container.push(<Row style={{ marginTop: '30px', width: '100%', marginRight: '0', marginLeft: '0' }}><Col style={{ padding: '0', marginLeft: '0px', marginRight: '0px' }}>{graph}</Col></Row>);
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
            <ButtonGroup id='modalSelector' style={{ width: 'calc(100% - 20px)', marginLeft: '10px', marginTop: '10px'}}>
                <Button id='sensorButton' onClick={this.updateModal} disabled={(this.state.modalSelectionOption === 'sensor') ? true : false}><b>Sensor</b></Button>
                <Button id='customButton' onClick={this.updateModal} disabled={(this.state.modalSelectionOption === 'custom') ? true : false}><b>Custom</b></Button>
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
                            <b style={{ position: 'absolute', marginLeft: '8px', marginBottom: '16px', marginTop: '2px', fontSize: '2rem'}}>Add Graph</b>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{padding: '0'}}>
                    {modalSelector}
                        {(this.state.modalSelectionOption === 'sensor') ?
                            <ModalSensorChoice hide={this.showAddModal} displayed={this.state.plots} add={this.addToDash} updateSelectionComplete={this.updateAddedGraphs} /> :
                            <ModalCustomChoice hide={this.showAddModal} displayed={this.state.plots} sendOptions={this.sendOptions} />}
                    </Modal.Body>
                </Modal>
            </div>
        ); //Add copyright at the bottom
    }
}
