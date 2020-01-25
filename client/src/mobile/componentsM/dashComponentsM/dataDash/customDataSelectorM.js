import React from 'react';
import CustomDataDashM from './customDataDashboardM';
import CustomDataChoiceM from './customDataChoiceM';
import '../../../styling/dashM.css';

export default class CustomDataSelectorM extends React.Component {
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
            <div style={{margin: '20px'}}>
                {this.state.showChoice ? 
                    <CustomDataChoiceM enter={this.enter}/>:
                    <CustomDataDashM dataInfo={this.state.selectedData}/>}
            </div>
        );
    }
}