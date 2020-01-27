import React from 'react';
import DataDashboard from './dataDashboard';
import CustomDataChoice from "./customDataChoice";
import '../../../styling/customDash.css';

export default class CustomDataDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showChoice: true,
            selectedData: []
        }
    }

    enter = (graphChoices) => {
        this.setState({
            showChoice: false,
            selectedData: graphChoices
        });
    }

    render = () => {
        return (
            <div id='customDash' >
                {this.state.showChoice ? 
                    <CustomDataChoice enter={this.enter}/>:
                    <DataDashboard dataInfo={this.state.selectedData}/>}
            </div>
        );
    }
}