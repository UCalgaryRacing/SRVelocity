import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import SideNavM from '../componentsM/navigationComponentsM/sideNavM';
import StreamingContentM from '../componentsM/streamingComponentsM/streamingContentM';
import TopNavM from '../componentsM/navigationComponentsM/topNavM';

export default class StreamingPageM extends React.Component {
    constructor(props) {
        super(props);
        this.streamingContent = React.createRef();
        this.state = {
            streamingContent: 'dashboard',
            dashOption: 'default',
            typeOption: 'plotting'
        }
    }

    changeDash = () => {
        this.setState({ dashOption: (this.state.dashOption === 'default') ? 'custom' : 'default' });
    }

    changeType = () => {
        this.setState({ typeOption: (this.state.typeOption === 'plotting') ? 'currentData' : 'plotting' });
    }

    render = () => {
        let dashSelector = (
            <ButtonGroup id='dashSelector' style={{ height: '44px', width: '100%'}}>
                <Button id='defaultButton' style={{width: '50%'}} onClick={this.changeDash} disabled={(this.state.dashOption === 'default') ? true : false}><b style={{fontSize: '0.95rem'}}>Default</b></Button>
                <Button id='customButton' style={{width: '50%'}} onClick={this.changeDash} disabled={(this.state.dashOption === 'custom') ? true : false}><b style={{fontSize: '0.95rem'}}>Custom</b></Button>
            </ButtonGroup >
        );
        let typeSelector = (
            <ButtonGroup id='dashSelector' style={{ height: '44px', width: '100%'}}>
                <Button id='defaultButton' style={{width: '50%'}} onClick={this.changeType} disabled={(this.state.typeOption === 'plotting') ? true : false}><b style={{fontSize: '0.95rem'}}>Plotting</b></Button>
                <Button id='customButton'  style={{width: '50%'}} onClick={this.changeType} disabled={(this.state.typeOption === 'currentData') ? true : false}><b style={{fontSize: '0.95rem'}}>Data</b></Button>
            </ButtonGroup >
        );
        return (
            <div>
                <TopNavM/>
                <SideNavM streamingContent={this.streamingContent} />
                <div class='row' style={{marginTop: '20px'}}>
                    <div class='col' style={{marginLeft: '5px', paddingRight: '2.5px'}}>
                        {dashSelector}
                    </div>
                    <div class='col' style={{textAlign: 'right', marginRight: '5px', paddingLeft: '2.5px'}}>
                        {typeSelector}
                    </div>
                </div>
                <StreamingContentM ref={this.streamingContent} option={this.state.dashOption} />
            </div>
        );
    }
}