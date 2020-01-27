import React from 'react';
import DataDashM from './dataDash/dataDashboard';
import CustomDataSelectorM from './dataDash/customDataSelectorM';
import CustomPlotSelectorM from './plottingDash/customPlotSelectorM';
import PlottingDashboardM from './plottingDash/plottingDashboardM';
import '../../styling/dashM.css';

export default class StreamingDashM extends React.Component {
    render = () => {
        if (this.props.dashOption === 'default' && this.props.typeOption === 'plotting') {
            return (
                <div id='dashboardM'>
                    <PlottingDashboardM graphInfo={[
                        { title: 'Engine Temperature', units: '˚C' },
                        { title: 'Oil Pressure', units: 'kPa' },
                        { title: 'Oil Temperature', units: '˚C' },
                        { title: 'Fuel Temperature', units: '˚C' },
                        { title: 'Battery Voltage', units: 'V' }]}/>
                </div>
            );
        }
        else if (this.props.dashOption === 'default' && this.props.typeOption === 'currentData') {
            return (
                <div id='dashboardM'>
                    <DataDashM />
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
