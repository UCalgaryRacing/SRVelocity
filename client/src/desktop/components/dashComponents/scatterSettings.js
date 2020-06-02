import React from 'react'
import SensorData from "../../../constants";
import { Form, Button } from 'react-bootstrap';

export default class ScatterSettings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            xChosen: false,
            yChosen: false,
            overMax: false,
            notChosen: false
        }
        //0 - 26 is X
        //27 - 52 is Y
        this.dataX = [];
        this.dataY = [];
        this.indicesX = [];
        this.indicesY = [];
    }

    componentWillMount = () => {
        SensorData.getInstance().getCategories().then(categories => {
            var i = 1;
            for (const category of categories) {
                if(category != 'Track Map'){
                    this.dataX.push(<Form.Check name={category[i] + "X"} label={category} id={i} key={i} onChange={this.selectDataX} />);
                    i++;
                }
            }
            for (const category of categories) {
                if(category != 'Track Map'){
                    this.dataY.push(<Form.Check name={category[i] + "Y"} label={category} id={i} key={i} onChange={this.selectDataY} />);
                    i++;
                }
            }
            var categoriesTemp = categories.filter(function(category){
                return category != 'Track Map'
            });

            this.setState({
                categories: categoriesTemp
            });
        })
    }

    selectDataX = (event) => {
        if (!event.target.id) event.target.id = 0; 
        let i = this.indicesX.indexOf(event.target.id);
        if (i < 0) this.indicesX.push(event.target.id); 
        else this.indicesX.splice(i, 1); 
    }

    selectDataY = (event) => {
        if (!event.target.id) event.target.id = 0; 
        let i = this.indicesY.indexOf(event.target.id); 
        if (i < 0) this.indicesY.push(event.target.id); 
        else this.indicesY.splice(i, 1); 
    }

    submit = () => {
        if(this.indicesX.length > 1 || this.indicesY.length > 1){
            this.setState({ 
                overMax: true,
                notChosen: false
            })
            return
        }
        else if(this.indicesX.length === 0 || this.indicesY.length === 0){
            this.setState({ 
                notChosen: true,
                overMax: false
            })
            return
        }
        var selectedX = this.indicesX[0];
        var selectedY = this.indicesY[0] - 25;

        this.props.sendOptions(this.state.categories[selectedX - 1], this.state.categories[selectedY - 1])
    }

    render = () => {
        return(
            <div>
                {(this.state.overMax === true) ? 
                <p>Please select only 1 option for each axis (Too many selected)</p> : 
                (this.state.notChosen === true) ? 
                <p>Please select 1 option for each axis (Not enough selected)</p> : null}
                <Form>
                    <Form.Label style={{ fontSize: '15px' }}>Plot Settings - Scatter Plot Data</Form.Label>
                    
                    <div style={{ position: 'relative', float: 'left', width: '223px', height: '500px' }}>
                        <Form.Label style={{ position: 'relative', marginLeft: '70px', marginTop: '10px' }}>X Axis</Form.Label>
                        <Form.Check>{this.dataX}</Form.Check>
                    </div>

                    <div style={{ position: 'relative', float: 'left', width: '223px', height: '500px' }}>
                        <Form.Label style={{ position: 'relative', marginLeft: '70px', marginTop: '10px' }}>Y Axis</Form.Label>
                        <Form.Check>{this.dataY}</Form.Check>
                    </div>
                </Form>
                <Button onClick={this.submit} style={{ fontWeight: "600", backgroundColor: "#C22D2D", borderColor: "#C22D2D", width: "95%", alignContent: 'center', marginTop: '15px'}}>Submit</Button>
            </div>
        );
    }
}