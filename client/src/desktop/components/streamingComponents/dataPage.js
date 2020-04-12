import React from 'react';
import { Row, Col } from 'react-bootstrap';
import GraphBox from '../dashComponents/plottingDash/graphBox';
import RadialChart from '../graphComponents/radialChart';
import { constGraphTitles } from '../../../constants';
import '../../styling/streamingData.css';

export default class DataPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graphTitles: constGraphTitles
        }
    }

    findUnitIndex = (title) => { return this.state.graphTitles.findIndex(obj => obj.title === title); }

    render = () => {
        if (this.props.content !== 'Acceleration') {
            return (
                <div id='streamingData'>
                    <GraphBox title={this.props.content} name={this.state.graphTitles[this.findUnitIndex(this.props.content)].name} choice={true} id={0} units={this.state.graphTitles[this.findUnitIndex(this.props.content)].units} />
                </div>
            );
        }
        else {
            return (
                <div id='streamingData'>
                    <Row style={{display: 'flex'}}>
                        <Col style={{margin: 0, padding: 0}}>
                            <GraphBox title={this.props.content} name={this.state.graphTitles[this.findUnitIndex(this.props.content)].name} choice={true} id={0} units={this.state.graphTitles[this.findUnitIndex(this.props.content)].units} />
                        </Col>
                        <Col style={{margin: 0, padding: 0, minWidth: '630px'}}>
                            <RadialChart showLabels={true}/>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}