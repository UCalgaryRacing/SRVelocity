import React from 'react';
import DataDashboard from './dataDashboard';
import CustomChoice from '../customChoice';
import './customDash.css';

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
        }, this.props.updateSelectionComplete());
    }

    render = () => {
        return (
            <div id='customDash' >
                {this.state.showChoice ? 
                    <CustomChoice closeBottomNav={this.props.closeBottomNav} openBottomNav={this.props.openBottomNav} enter={this.enter} type={'data'}/>:
                    <DataDashboard categories={this.state.selectedCategories}/>}
            </div>
        );
    }
}