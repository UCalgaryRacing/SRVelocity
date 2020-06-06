import React from 'react';
import { Form, Button } from "react-bootstrap";
import SensorData from "../../../constants";
import { isMobile } from 'react-device-detect';

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
        if(this.props.type === 'plot') {
            if (this.indices.length > this.MAX_GRAPHS) {
                this.setState({ overMax: true });
                return;
            }
            let selectedGraphs = [];
            for (const i of this.indices) selectedGraphs.push(this.state.categories[i - 1]); 
            this.props.enter(selectedGraphs);
        } else {
            let selectedData = [];
            for (const i of this.indices) selectedData.push(this.state.categories[i - 1]); 
            this.props.enter(selectedData);
        }
    }

    render = () => {
        return (
            <div id='graphChoice' style={{marginLeft: '20px', marginTop: '40px'}}>
                {this.state.overMax ?
                    <p>Please select only {this.MAX_GRAPHS} graphs. ({this.indices.length} currently chosen)</p> : null}
                <Form>{this.switches}</Form>
                <Button onClick={this.submit} style={{ fontWeight: "600", backgroundColor: "#C22D2D", borderColor: "#C22D2D", marginLeft: "-10px", marginTop: "15px", maxWidth: '400px', minWidth: '300px', width: '100%'}}>Submit</Button>
            </div>
        );
    }
}