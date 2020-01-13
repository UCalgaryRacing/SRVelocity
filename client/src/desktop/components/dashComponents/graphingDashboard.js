import React from 'react';
import GraphBox from '../graphBox';
import { Row, Col, Modal } from 'react-bootstrap';

export default class GraphingDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graphTitles: this.props.graphInfo,
            displayModal: false,
            currentGraph: null
        }
        this.graphs = []
        this.container = []
    }

    componentWillMount = () => {
        this.createGraphs()
        this.createToRender()
    }

    createGraphs = () => {
        var i = 0
        for (const graph of this.state.graphTitles) {
            this.graphs.push(
                <GraphBox title={graph.title} id={i} units={graph.units} onClick={this.showGraph} key={i}/>
            );
            i++;
        }
        this.setState({currentGraph: this.graphs[0]})
    }

    createToRender = () => {
        for (const graph of this.graphs) {
            this.container.push(
                <Row style={{ marginTop: '30px' }}>
                    <Col>
                        {graph}
                    </Col>
                </Row>
            );
        }
    }

    showGraph = (event) => {
        event.preventDefault()
        this.setState({
            currentGraph: this.graphs[event.target.id]
        })
        this.showModal()
    }

    showModal = () => {
        this.setState({displayModal: true})
    }

    hideModal = () => {
        this.setState({displayModal: false})
    }

    render = () => {
        return (
            <div>
                {this.container}
                <Modal id = "graphModal" 
                    show={this.state.displayModal} 
                    onHide={this.hideModal} 
                    keyboard={true}
                    size = "xl"
                    centered>
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.currentGraph}
                        </Modal.Body>
                </Modal>
            </div>
        );
    }
}