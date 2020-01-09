import React from 'react';
import LineGraph from '../components/lineGraph';
import ScatterPlot from '../components/scatterPlot';
import '../styling/graphBox.css';
import Data from '../../data';

export default class GraphBox extends React.Component {
    constructor(props) {
        super(props);
        if(this.props.title === 'Track Map') {
            this.state = {
                currentLabel: 3,
                data: Data.getInstance().get(this.props.title)
            }
        }
        else {
            this.state = {
                currentLabel: 3,
                data: {
                    labels: Data.getInstance().getLabels(),
                    datasets: Data.getInstance().get(this.props.title)
                }
            }
        }
    }

    componentWillMount() {
        this.interval = setInterval(() => this.tick(), 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    pullData = () => {
        let newDatasets = Data.getInstance().get(this.props.title)
        if (newDatasets == undefined) { //Sometimes null for some reason
            return;
        }
        if (this.props.title === 'Track Map') {
            this.setState({ data: newDatasets });
        }
        else {
            this.setState({
                data: {
                    datasets: newDatasets
                }
            });
        }
    }

    get = (index) => {
        for (var parameter of this.datasets) {
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
        if (this.props.title === 'Track Map') {
            return (
                <div id='graphBox' onClick={this.props.onClick}>
                    <p id='graphTitle'><b>{this.props.title}</b></p>
                    <ScatterPlot id={this.props.id} data={this.state.data} title={this.props.title} units={this.props.units} />
                </div>
            );
        }
        else {
            return (
                <div id='graphBox' onClick={this.props.onClick}>
                    <p id='graphTitle'><b>{this.props.title}</b></p>
                    <LineGraph id={this.props.id} data={this.state.data} title={this.props.title} units={this.props.units} />
                </div>
            );
        }
    }
}