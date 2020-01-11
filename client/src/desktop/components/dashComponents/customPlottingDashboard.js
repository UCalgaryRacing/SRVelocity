import React from 'react';
import '../../styling/customDash.css';
import {GraphingDashboard} from "./graphingDashboard";
import CustomGraphChoice from "./customGraphChoice";

export default class CustomPlottingDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showChoice: true,
            selectedGraphs: []
        }
    }

    enter = (graphChoices) => {
        this.setState({
            showChoice: false,
            selectedGraphs: graphChoices
        })
    }


    render = () => {

        return (
            <div id='customDash'>
                {this.state.showChoice ? 
                    <CustomGraphChoice enter={this.enter}></CustomGraphChoice>:
                    <GraphingDashboard graphInfo={this.state.selectedGraphs}></GraphingDashboard>}
            </div>
        );
    }
}
