import React from "react";
import { Form, Button } from "react-bootstrap";
import SensorData from "../../../../constants";

export default class CustomGraphChoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            overMax: false
        }
        this.switches = [];
        this.indices = [];
        this.MAX_GRAPHS = 10;
    }

    componentWillMount = () => {
        var categories = SensorData.getInstance().getCategories();
        categories.then(categories => {
            var i = 1;
            for (const category of categories) {
                this.switches.push(<Form.Check name={category[i]} label={category} id={i} key={i} onChange={this.selectGraph} />);
                i++;
            }
            this.setState({categories: categories});
        })
    }

    selectGraph = (event) => {
        if (!event.target.id) event.target.id = 0; 
        let i = this.indices.indexOf(event.target.id);
        if (i < 0) this.indices.push(event.target.id); 
        else this.indices.splice(i, 1); 
    }

    submit = (event) => {
        if (this.indices.length > this.MAX_GRAPHS) {
            this.setState({ overMax: true });
            return;
        }
        let selectedGraphs = [];
        for (const i of this.indices) selectedGraphs.push(this.state.categories[i - 1]); 
        this.props.enter(selectedGraphs);
    }

    render = () => {
        return (
            <div id="graphChoice" style={{ fontWeight: "600" }}>
                {this.state.overMax ?
                    <p>Please select only {this.MAX_GRAPHS} graphs. ({this.indices.length} currently chosen)</p> : null}
                <Form>{this.switches}</Form>
                <Button onClick={this.submit} style={{ fontWeight: "600", backgroundColor: "#C22D2D", borderColor: "#C22D2D", width: "366px", marginLeft: "-20px", marginTop: "15px" }}>Submit</Button>
            </div>
        );
    }
}
