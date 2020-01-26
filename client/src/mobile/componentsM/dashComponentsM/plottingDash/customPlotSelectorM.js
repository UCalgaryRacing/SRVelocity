import React from 'react';
import CustomPlotChoiceM from './customPlotChoiceM';
import PlottingDashboardM from './plottingDashboardM';

export default class CustomPlotSelectorM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showChoice: true,
            selectedGraphs: []
        }
    }

    enter = (graphChoices) => {
        this.setState({ showChoice: false, selectedGraphs: graphChoices });
    }

    render = () => {
        return (
            <div style={{ margin: '0px' }}>
                {this.state.showChoice ?
                    <CustomPlotChoiceM enter={this.enter} /> :
                    <PlottingDashboardM graphInfo={this.state.selectedGraphs} />}
            </div>
        )
    }
}