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
        this.setState({ 
            showChoice: false, 
            selectedGraphs: graphChoices 
        }, this.props.updateSelectionComplete()); 
    }

    deleteFromDash = (index) => {
        const temp = this.state.selectedGraphs.filter(function(num, i){
            return ((i === index-1) ? false : true)
        });
        this.setState({
            selectedGraphs: temp
        })
        this.forceUpdate()
    }

    addToDash = (graphChoices) => {
       this.setState({
           selectedGraphs: this.state.selectedGraphs.concat(graphChoices)
       })
       this.forceUpdate()
    }

    render = () => {
        return (
            <div id='customDash'>
                {this.state.showChoice ?
                    <CustomChoice enter={this.enter} type={'plot'}/>:
                    <GraphingDashboard delete={this.deleteFromDash} add={this.addToDash} plots={this.state.selectedGraphs} plotsLength={this.state.selectedGraphs.length}/>}
            </div>
        );
    }
}
