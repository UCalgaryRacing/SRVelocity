import React from 'react';
import MobileGraphBox from './mobileGraphBox';
import { Row, Col, Modal } from 'react-bootstrap';
import SensorData from '../../../constants';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import '../../styling/dashboard.css';
import MobileChoiceModal from './mobileChoiceModal'


export default class MobileGraphingDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plots: SensorData.getInstance().getCategories(),
            currentGraph: null,
            showAddModal: false,
            modalSelectionOption: 'sensor'
        }
        this.modalButton =  <Button onClick={this.showAddModal} style={{margin: '20px'}}>Switch Graph</Button>
        this.defaultPlot = 'Axes'
    }

  componentDidMount = () => {
    this.createGraph(this.defaultPlot);
  };

    showAddModal = () => {
        this.setState({
            showAddModal: !this.state.showAddModal
        });
    }


    createGraph = (plot) => {
        SensorData.getInstance().getSensors().then(sensorData => {
            const sensors = sensorData.filter(item => { return item.category === plot; });
            this.setState({currentGraph: null})
            let tempGraph = <MobileGraphBox
                                sensors={sensors}
                                modalButton={this.modalButton}
                            />
            this.setState({
                currentGraph: tempGraph
             })
        });
    }


    render = () => {
        return (
            <div>
                <div>
                    {this.state.currentGraph}
                    <MobileChoiceModal show={this.state.showAddModal} onHide={this.showAddModal} plots={this.state.plots} changeGraph={this.createGraph}/>
                </div>
        
            </div>
        ); //Add copyright at the bottom
    }
}
