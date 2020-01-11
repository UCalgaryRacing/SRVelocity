import React from 'react';
import SideNavM from '../components/navigationComponents/sideNavM';
import StreamingContentM from '../componentsM/streamingComponentsM/streamingContentM';
import TopNavM from '../components/navigationComponents/topNavM';
import SettingsM from '../componentsM/settingsComponentsM/settingsM';

export default class StreamingPageM extends React.Component {
    constructor(props) {
        super(props);
        this.streamingContent = React.createRef();
        this.state = {
            streamingContent: 'dashboard',
            toggleDashType: 'default',
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
            <React.Fragment>
                <TopNavM />
                <SideNavM streamingContent={this.streamingContent}/>
                <StreamingContentM ref={this.streamingContent} toggleDashType={this.state.toggleDashType} />
            </React.Fragment>
        );
    }
}