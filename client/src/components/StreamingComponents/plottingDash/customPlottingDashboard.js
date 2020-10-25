import React from 'react';
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
        this.setState({ 
            showChoice: false, 
            selectedGraphs: graphChoices 
        }, this.props.updateSelectionComplete()); 
    }

    render = () => {
        return (
            <div id='customDash'>
                {this.state.showChoice ?
                    <CustomChoice closeBottomNav={this.props.closeBottomNav} openBottomNav={this.props.openBottomNav} enter={this.enter} type={'plot'}/>:
                    <GraphingDashboard plots={this.state.selectedGraphs}/>}
            </div>
        );
    }
}
