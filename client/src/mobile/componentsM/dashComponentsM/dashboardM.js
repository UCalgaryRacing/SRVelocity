import React from 'react';
import DefaultPlottingDashboardM from './defaultPlottingDashboardM';
import DefaultDataDashM from './defaultDataDashboardM';
import CustomDataSelectorM from './customDataSelectorM';
import CustomPlotSelectorM from './customPlotSelectorM';
import '../../styling/dashM.css';

export default class StreamingDashM extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        if (this.props.dashOption === 'default' && this.props.typeOption === 'plotting') {
            return (
                <div id='dashboardM'>
                    <DefaultPlottingDashboardM />
                </div>
            );
        }
        else if (this.props.dashOption === 'default' && this.props.typeOption === 'currentData') {
            return (
                <div id='dashboardM'>
                    <DefaultDataDashM />
                </div>
            );
        }
        else if (this.props.dashOption === 'custom' && this.props.typeOption === 'plotting') {
            return (
                <div id='dashboardM'>
                    <CustomPlotSelectorM />
                </div>
            );
        }
        else {
            return (
                <div id='dashboardM'>
                    <CustomDataSelectorM />
                </div>
            );
        }
    }
}
