import React from 'react';
import Button from 'react-bootstrap/Button';
import SideNavbar from '../componentsM/navigationComponentsM/sideNavM';
import StreamingContentM from '../componentsM/streamingComponentsM/streamingContentM';
import SettingsM from '../componentsM/settingsComponentsM/settingsM';

export default class StreamingPageM extends React.Component {

    constructor(props) {
        super(props);
        this.streamingContent = React.createRef();
        this.state = {
            streamingContent: 'dashboard',
            toggleDashType: 'default'
        }
        this.handleDashType = this.handleDashType.bind(this);
    }

    handleDashType = () => {
        this.setState({
            toggleDashType: (this.state.toggleDashType === 'default') ? 'custom' : 'default'
        });

    }
    render = () => {
        return (
            <div id='streamingPage' style={{ height: '100%' }}>
                <StreamingContentM ref={this.streamingContent} toggleDashType={this.state.toggleDashType} />
            </div>
        );
    }
}