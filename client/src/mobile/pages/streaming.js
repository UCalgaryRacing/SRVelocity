import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import SideNavM from '../components/navigationComponents/sideNavM';
import StreamingContentM from '../componentsM/streamingComponentsM/streamingContentM';
import TopNavM from '../components/navigationComponents/topNavM';

export default class StreamingPageM extends React.Component {
    constructor(props) {
        super(props);
        this.streamingContent = React.createRef();
        this.state = {
            streamingContent: 'dashboard',
            option: 'default',
        }
    }

    changeDash = () => {
        this.setState({
            option: (this.state.option === 'default') ? 'custom' : 'default'
        });
    }

    render = () => {
        let selector = (
            <ButtonGroup id='dashSelector'>
                <Button id='defaultButton' onClick={this.changeDash} disabled={(this.state.option === 'default') ? true : false}><b>Default</b></Button>
                <Button id='customButton' onClick={this.changeDash} disabled={(this.state.option === 'custom') ? true : false}><b>Custom</b></Button>
            </ButtonGroup >
        );
        return (
            <React.Fragment>
                <div style={{position: 'absolute', top:'66px', right: '15px', zIndex: '1000'}}>{selector}</div>
                <TopNavM />
                <SideNavM streamingContent={this.streamingContent}/>
                <StreamingContentM ref={this.streamingContent} option={this.state.option} />
            </React.Fragment>
        );
    }
}