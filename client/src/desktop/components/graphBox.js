import React from 'react';
import LineGraph from '../components/lineGraph';
import '../styling/graphBox.css';
import Data from '../../data';

export default class GraphBox extends React.Component {
    constructor(props) {
        super(props);
        this.state  = {
            currentLabel: 3,
            data: {
                labels: Data.getInstance().getLabels(),
                datasets: Data.getInstance().get(this.props.title)
            }
        }
    }

    componentWillMount() {
        this.interval = setInterval(() => this.tick(), 200);
    }

    pullData = () => {
        let newDatasets = Data.getInstance().get(this.props.title)
        if (newDatasets == undefined) { //Sometimes null for some reason
            return;
        }
        this.setState({data: {
            datasets: newDatasets
        }});
    }

    get = (index) => {
        for(var parameter of this.datasets)  {
            if (index === parameter.title) {
                return parameter.value;
            }
        }
    }

    getLabels = () => {
        return this.labels;
    }

    tick = () => {
        this.pullData();
    }

    render = () => {
        return (
            <div id='graphBox' onClick={this.props.onClick}>
                <p id='graphTitle'><b>{this.props.title}</b></p>
                <LineGraph id={this.props.id} data={this.state.data} title={this.props.title} units={this.props.units}/>
            </div>
        );
    }
}