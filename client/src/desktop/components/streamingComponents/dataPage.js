import React from 'react';
import GraphBox from '../graphBox';
import { constGraphTitles } from '../../../constants';
import '../../styling/streamingData.css';

export default class DataPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graphTitles: constGraphTitles
        }
    }

    findUnitIndex = (title) => {
        return this.state.graphTitles.findIndex(obj => obj.title === title);
    }

    render = () => {
        return (
            <div id='streamingData'>
                <GraphBox title={this.props.content} id={0} units={this.state.graphTitles[this.findUnitIndex(this.props.content)].units} />
            </div>
        );
    }
}