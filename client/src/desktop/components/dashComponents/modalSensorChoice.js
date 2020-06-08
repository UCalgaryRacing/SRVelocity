import React from 'react'
import { Form, Button } from "react-bootstrap";
import SensorData from "../../../constants";
import { isMobile } from 'react-device-detect';

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
        this.MAX_GRAPHS = (isMobile ? 4 : 10) - this.props.displayed.length;
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
            <div id='graphChoice' style={{margin: 'auto', marginTop: '15px'}}>
                <Form style={{marginTop: '10px'}}>{this.switches}</Form>
                {(this.MAX_GRAPHS === 0) ? <p style={{marginTop: '40px', marginLeft: '10px'}}>Maximum number of graphs already displayed.</p> : 
                (this.state.overMax) ? <p style={{marginTop: '40px', marginLeft: '10px'}}>Please select {this.MAX_GRAPHS} {(this.MAX_GRAPHS === 1) ? 'only one graph.' : 'or fewer graphs.'} ({this.indices.length} currently chosen)</p> : null}
                <Button onClick={this.submit} style={{ fontWeight: "600", backgroundColor: "#C22D2D", borderColor: "#C22D2D", width: "calc(100% - 20px)", alignContent: 'center', marginLeft: '10px', marginTop: '15px', marginBottom: '15px'}}>Submit</Button>
            </div>
        );
    }
}