import React from 'react';
import { Form, Button } from "react-bootstrap";
import SensorData from "../../constants";
import { isMobile } from 'react-device-detect';
import './customChoice.css';

export default class CustomChoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sensors: SensorData.getInstance().getSensors(),
            overMax: false
        }
        this.switches = [];
        this.indices = [];
        this.MAX_GRAPHS = isMobile ? 4 : 10;
    }

    componentWillMount = () => {
        SensorData.getInstance().getCategories().then(categories => {
            var i = 1;
            for (const category of categories) {
                this.switches.push(<Form.Check style={{width: '300px'}} name={category[i]} label={category} id={i} key={i} onChange={this.selectData} />);
                i++;
            }
            this.setState({categories: categories});
        })
    }

    componentDidMount = () => {
        this.props.closeBottomNav();
    }

    componentWillUnmount = () => {
        this.props.openBottomNav();
    }

    selectData = (event) => {
        if (!event.target.id) event.target.id = 0; 
        let i = this.indices.indexOf(event.target.id);
        if (i < 0) this.indices.push(event.target.id); 
        else this.indices.splice(i, 1); 
    }

    submit = (event) => {
        if(this.props.type === 'plot') {
            if (this.indices.length > this.MAX_GRAPHS) {
                this.setState({ overMax: true });
                return;
            }
            let selectedGraphs = [];
            for (const i of this.indices) selectedGraphs.push(this.state.categories[i - 1]); 
            this.props.enter(selectedGraphs);
            this.props.openBottomNav();
        } else {
            let selectedData = [];
            for (const i of this.indices) selectedData.push(this.state.categories[i - 1]); 
            this.props.enter(selectedData);
            this.props.openBottomNav();
        }
    }

    render = () => {
        return (
            <div id='customChoice' style={{margin: 'auto', marginTop: '40px'}}>
                {this.state.overMax ?
                    <p style={{marginLeft: '10px'}}>Please select only {this.MAX_GRAPHS} graphs. ({this.indices.length} currently chosen)</p> : null}
                <Form>{this.switches}</Form>
                <Button id='submitButton' onClick={this.submit} style={{ fontWeight: "600", backgroundColor: "#C22D2D", borderColor: "#C22D2D", marginTop: "15px", marginLeft: '10px'}}>Submit</Button>
            </div>
        );
    }
}