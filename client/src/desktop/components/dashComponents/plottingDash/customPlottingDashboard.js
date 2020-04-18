import React from 'react';
import '../../../styling/customDash.css';
import GraphingDashboard from "./graphingDashboard";
import CustomChoice from '../customChoice';

export default class CustomPlottingDash extends React.Component {
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
            <div id='customDash'>
                {this.state.showChoice ?
                    <CustomChoice enter={this.enter} type={'plot'}/>:
                    <GraphingDashboard plots={this.state.selectedGraphs} />}
            </div>
        );
    }
}
