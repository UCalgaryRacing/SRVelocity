import React from 'react'
import { Form, Button } from "react-bootstrap";
import SensorData from "../../../constants";
import GraphBox from './plottingDash/graphBox';
import GraphingDashboard from './plottingDash/graphingDashboard';


export default class ModalSensorChoice extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sensors: SensorData.getInstance().getSensors(),
            overMax: false
        }
        this.switches = [];
        this.indices = [];
        this.availableGraphs = [];
        this.MAX_GRAPHS = 10 - this.props.numDisplayed;
    }

    componentWillMount = () => {
        SensorData.getInstance().getCategories().then(categories => {
            var i = 1;
            for (const category of categories) {
                if(!this.props.displayed.includes(category)){
                    this.switches.push(<Form.Check name={category[i]} label={category} id={i} key={i} onChange={this.selectData} />);
                    this.availableGraphs.push(category);
                    i++;
                }
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
        this.state.overMax = false
        if (this.indices.length > this.MAX_GRAPHS) {
            this.setState({ overMax: true });
            return;
        }
        let selectedGraphs = [];
        for (const i of this.indices) selectedGraphs.push(this.availableGraphs[i - 1]); 
        this.props.add(selectedGraphs);
        this.props.hide();
    }


    render = () => {
        return(
            <div id='graphChoice' style={{marginLeft: '20px'}}>
                {(this.MAX_GRAPHS === 0) ? <p>Maximum number of graphs already displayed.</p> : 
                (this.state.overMax) ? <p>Please select {this.MAX_GRAPHS} {(this.MAX_GRAPHS === 1) ? 'only one graph.' : 'or fewer graphs.'} ({this.indices.length} currently chosen)</p> : null}
                <Form>{this.switches}</Form>
                <Button onClick={this.submit} style={{ fontWeight: "600", backgroundColor: "#C22D2D", borderColor: "#C22D2D", width: "95%", alignContent: 'center', marginTop: '15px'}}>Submit</Button>
            </div>
        );
    }
}