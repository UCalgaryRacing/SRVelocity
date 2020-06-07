import React from 'react'
import { Form, Button, FormCheck } from "react-bootstrap";
import ScatterSettings from './scatterSettings';
import LineSettings from './lineSettings';
import SensorData from "../../../constants";
import { isMobile } from 'react-device-detect';

export default class ModalCustomChoice extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sensors: SensorData.getInstance().getSensors(),
            overMax: false,
            selectTypePage: true,
            plotSettingsPage: false
        }
        this.plotChoice = '';
        this.MAX_GRAPHS = (isMobile ? 4 : 10) - this.props.numDisplayed;
    }

    continueToSettings = () => {
        if(this.MAX_GRAPHS === 0) return null;
        if(this.plotChoice === '') return null;
        this.setState({
            selectTypePage: false,
            plotSettingsPage: true
        })
    }

    selectType = (type) => {
        if(this.plotChoice === type) this.plotChoice = ''
        else this.plotChoice = type
        this.forceUpdate()
    }

    sendOptions = (x, y) => {
        let graphs = ['Custom' + '-' + x + '-' + y];
        this.props.add(graphs);
        this.props.hide();
    }
    
    render = () => {
        return(
            <div id='graphChoice' style={{marginLeft: '20px'}}>
                {(this.MAX_GRAPHS === 0) ? <p>Maximum number of graphs already displayed.</p>: null}
                {(this.state.selectTypePage) ?
                    <div>
                        <Form>
                            <Form.Group>
                                <Form.Label style={{ fontSize: '15px' }}>Plot Type</Form.Label>
                                <Form.Check label="Line Plot" id="line" disabled={(this.plotChoice === 'scatter') ? true : false} onChange={() => this.selectType('line')} />
                                <Form.Check label="Scatter Plot" id="scatter" disabled={(this.plotChoice === 'line') ? true : false} onChange={() => this.selectType('scatter')} />
                            </Form.Group>
                        </Form>
                        <Button onClick={this.continueToSettings} style={{ fontWeight: "600", backgroundColor: "#C22D2D", borderColor: "#C22D2D", width: "95%", alignContent: 'center', marginTop: '15px' }}>Continue</Button>
                    </div> : null}

                {(this.state.plotSettingsPage) ?
                
                <Form>
                    {(this.plotChoice === 'line') ? 
                        <div>
                            <LineSettings/>
                        </div>: 
                    (this.plotChoice === 'scatter') ? 
                        <div>
                            <ScatterSettings sendOptions={this.sendOptions}/>
                        </div> : null}
                </Form> : null}
            </div>
        );
    }
}