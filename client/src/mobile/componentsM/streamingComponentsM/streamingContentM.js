import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import StreamingDashM from '../dashComponentsM/dashboardM';
import DataPageM from '../streamingComponentsM/dataPageM';

export default class StreamingContentM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: 'Dash',
            dashOption: 'default',
            typeOption: 'plotting'
        }
    }

    changeContent = (newContent) => {
        this.setState({ content: newContent });
    }

    changeDash = () => {
        this.setState({ dashOption: (this.state.dashOption === 'default') ? 'custom' : 'default' });
    }

    changeType = () => {
        this.setState({ typeOption: (this.state.typeOption === 'plotting') ? 'currentData' : 'plotting' });
    }

    render = () => {
        let dashSelector = (
            <ButtonGroup id='dashSelector' style={{ height: '44px', width: '100%' }}>
                <Button id='defaultButton' style={{ width: '40%' }} onClick={this.changeDash} disabled={(this.state.dashOption === 'default') ? true : false}><b style={{ fontSize: '0.95rem' }}>Default</b></Button>
                <Button id='customButton' style={{ width: '40%' }} onClick={this.changeDash} disabled={(this.state.dashOption === 'custom') ? true : false}><b style={{ fontSize: '0.95rem' }}>Custom</b></Button>
            </ButtonGroup >
        );
        let typeSelector = (
            <ButtonGroup id='dashSelector' style={{ height: '44px', width: '100%' }}>
                <Button id='defaultButton' style={{ width: '45%' }} onClick={this.changeType} disabled={(this.state.typeOption === 'plotting') ? true : false}><b style={{ fontSize: '0.95rem' }}>Plotting</b></Button>
                <Button id='customButton' style={{ width: '45%' }} onClick={this.changeType} disabled={(this.state.typeOption === 'currentData') ? true : false}><b style={{ fontSize: '0.95rem' }}>Data</b></Button>
            </ButtonGroup >
        );
        let buttons = (
            <div class='row' style={{ marginTop: '20px' }}>
                <div class='col' style={{ paddingRight: '2.5px', marginLeft: '20px' }}>
                    {dashSelector}
                </div>
                <div class='col' style={{ textAlign: 'right', paddingLeft: '2.5px', marginRight: '20px' }}>
                    {typeSelector}
                </div>
            </div>
        );
        if (this.state.content === 'Dash') {
            return (
                <div id='streamingContent' style={{transition: 'all 0.15s' }}>
                    {buttons}
                    <StreamingDashM dashOption={this.state.dashOption} typeOption={this.state.typeOption} />
                </div>
            );
        }
        else {
            return (
                <div id='streamingContent' style={{transition: 'all 0.15s' }}>
                    <DataPageM content={this.state.content} key={Math.random()} />
                </div>
            );
        }
    }
}