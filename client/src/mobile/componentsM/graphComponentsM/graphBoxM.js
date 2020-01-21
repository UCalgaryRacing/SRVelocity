import React from 'react';
import LineChartM from './lineChartM';
import Data from '../../../data';
import '../../styling/graphBoxM.css';

export default class GraphBoxM extends React.Component {
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

    componentWillMount = () => {
        this.interval = setInterval(() => this.tick(), 100);
    }

    componentWillUnmount = () => {
        clearInterval(this.interval);
    }

    pullData = () => {
        let newDatasets = Data.getInstance().get(this.props.title)
        if (newDatasets == undefined) { return; }
        if (this.props.title === 'Track Map') { this.setState({ data: newDatasets }); }
        else { this.setState({ data: {datasets: newDatasets} }); }
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
        return (
            <div id='graphBoxM'>
                <p id='graphTitleM'><b>{this.props.title}</b></p>
                <LineChartM title={this.props.title} units={this.props.units} data={this.state.data} />
            </div>
        );
    }
}