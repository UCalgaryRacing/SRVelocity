import React from 'react';
import CustomDataDashM from './customDataDashboardM';
import CustomDataChoiceM from './customDataChoiceM';
import '../../styling/dashM.css';

export default class CustomDashM extends React.Component {
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
        })
    }

    render = () => {
        return (
            <div id='customDash'>
                {this.state.showChoice ? 
                    <CustomDataChoiceM enter={this.enter}/>:
                    <CustomDataDashM dataInfo={this.state.selectedData}/>}
            </div>
        );
    }
}