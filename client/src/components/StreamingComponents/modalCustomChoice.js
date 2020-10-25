import React from 'react'
import { Form, Button } from "react-bootstrap";
import ScatterSettings from './scatterSettings';
import LineSettings from './lineSettings';
import SensorData from "../../constants";
import { isMobile } from 'react-device-detect';

export default class ModalCustomChoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sensors: SensorData.getInstance().getSensors(),
            overMax: false,
            selectTypePage: true,
            plotSettingsPage: false
        }
        this.plotChoice = '';
        this.MAX_GRAPHS = (isMobile ? 4 : 10) - this.props.displayed.length;
    }

    continueToSettings = () => {
        if (this.MAX_GRAPHS === 0) return null;
        if (this.plotChoice === '') return null;
        this.setState({
            selectTypePage: false,
            plotSettingsPage: true
        })
    }

    selectType = (type) => {
        if (this.plotChoice === type) this.plotChoice = ''
        else this.plotChoice = type;
        this.forceUpdate();
    }

    sendOptions = (x, y) => {
        let graphs = ['Custom' + '-' + x + '-' + y];
        this.props.add(graphs);
        this.props.hide();
    }

    render = () => {
        return (
            <div id='graphChoice' style={{ margin: 'auto', marginTop: '15px' }}>
                {(this.MAX_GRAPHS === 0) ? <p><b style={{ marginLeft: '10px' }}>Maximum number of graphs already displayed.</b></p> : null}
                {(this.state.selectTypePage) ?
                    <Form>
                        <Form.Check name="Line Plot" label="Line" id={1} key={1} disabled={(this.plotChoice === 'scatter') ? true : false} onChange={() => this.selectType('line')} />
                        <Form.Check name="Scatter Plot" label="Scatter" id={2} key={2} disabled={(this.plotChoice === 'line') ? true : false} onChange={() => this.selectType('scatter')} />
                    </Form> : null}
                <Button onClick={this.continueToSettings} style={{ fontWeight: "600", backgroundColor: "#C22D2D", borderColor: "#C22D2D", width: "calc(100% - 20px)", alignContent: 'center', marginTop: '15px', marginBottom: '15px', marginLeft: '10px' }}>Continue</Button>
                {(this.state.plotSettingsPage) ?

                    <Form>
                        {(this.plotChoice === 'line') ?
                            <div>
                                <LineSettings />
                            </div> :
                            (this.plotChoice === 'scatter') ?
                                <div>
                                    <ScatterSettings sendOptions={this.sendOptions} />
                                </div> : null}
                    </Form> : null}
            </div>
        );
    }
}