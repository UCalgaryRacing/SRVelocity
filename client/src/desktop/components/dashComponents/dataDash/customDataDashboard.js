import React from 'react';
import DataDashboard from './dataDashboard';
import CustomDataChoice from "./customDataChoice";
import '../../../styling/customDash.css';

export default class CustomDataDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showChoice: true,
            selectedCategories: []
        }
    }

    enter = (dataChoices) => {
        this.setState({
            showChoice: false,
            selectedCategories: dataChoices
        });
    }

    render = () => {
        return (
            <div id='customDash' >
                {this.state.showChoice ? 
                    <CustomDataChoice enter={this.enter}/>:
                    <DataDashboard categories={this.state.selectedCategories}/>}
            </div>
        );
    }
}