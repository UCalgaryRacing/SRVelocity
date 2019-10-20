import React from 'react';
import '../../styling/defaultDash.css';
import LineGraph from '../lineGraph';
import {Container, Row, Col, Button} from 'react-bootstrap';


export default class DefaultDash extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            renderAllSwitch: true,
            singleGraph: null
        }

        this.graphData1 = {
                //Bring in data
                labels: ["Jan", "Feb", "March"],
                datasets: [
                    {
                        label: "Sales",
                        data: [86, 67, 91],
                    }
                ]
        }

        this.graphData2 = {
            //Bring in data
            labels: ["June", "July", "August"],
            datasets: [
                {
                    label: "Sales",
                    data: [86, 67, 91],
                }
            ]
    }

        this.container = []

        this.graphs = [<LineGraph data={this.graphData1} index={0} onClick={this.renderOne} key={1}/>, 
                    <LineGraph data={this.graphData2} index={1} onClick={this.renderOne} key={2}/>]
                    //index has to be the index of the graph in the list

        this.createAll()
    }

    renderOne = (event) => {
        event.preventDefault()
        this.setState({
            renderAllSwitch: false,
            singleGraph: [this.graphs[event.target.id], <Button onClick={this.renderAll}>Close</Button>]
        })
    }

    renderAll = (event) => {
        this.setState({renderAllSwitch: true})
    }

    createAll = () => {                                     //organizes the graphs into rows and columsn (2 graphs a row)
        for (let i = 0; i < this.graphs.length; i += 2) {
            if (i === this.graphs.length - 1) {
                this.container.push(<Row>
                    <Col>{this.graphs[i]}</Col>
                </Row>)
            } else {
                this.container.push(<Row>
                    <Col>{this.graphs[i]}</Col>
                    <Col>{this.graphs[i+1]}</Col>
                </Row>)
            }
        }
    }


    render = () => {
        return (
            <div id='defaultDash'>
                <Container>
                    {this.state.renderAllSwitch ? this.container: this.state.singleGraph}
                </Container>
            </div>  
        );
    }
}