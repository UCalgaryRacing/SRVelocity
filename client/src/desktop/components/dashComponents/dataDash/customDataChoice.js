import React from 'react';
import {Form, Button} from 'react-bootstrap';
import SensorData from '../../../../constants';
import '../../../styling/customDataChoice.css';

export default class CustomDataChoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sensors: SensorData.getInstance().getSensors()
        }
        this.switches = [];
        this.indices = [];
    }

    componentWillMount = () => {
        SensorData.getInstance().getCategories().then(categories => {
            var i = 1;
            for (const category of categories) {
                this.switches.push(<Form.Check name={category[i]} label={category} id={i} key={i} onChange={this.selectData} />);
                i++;
            }
            this.setState({categories: categories});
        })
    }

    selectData = (event) => {
        if (!event.target.id) event.target.id = 0; 
        let i = this.indices.indexOf(event.target.id);
        if (i < 0) this.indices.push(event.target.id); 
        else this.indices.splice(i, 1); 
    }

    submit = (event) => {
        let selectedData = [];
        for (const i of this.indices) selectedData.push(this.state.categories[i - 1]); 
        this.props.enter(selectedData);
    }

    render = () => {
        return (
            <div id='graphChoice'>
                <Form>{this.switches}</Form>
                <Button id='submitButton' onClick={this.submit}>Submit</Button>
            </div>
        );
    }
}