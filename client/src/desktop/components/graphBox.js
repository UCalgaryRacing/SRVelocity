import React from 'react';
import LineGraph from '../components/lineGraph';
import '../styling/graphBox.css';

export default class GraphBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div id='graphBox'>
                <p id='graphTitle'><b>{this.props.title}</b></p>
                <LineGraph title={this.props.title} units={this.props.units}/>
            </div>
        );
    }
}