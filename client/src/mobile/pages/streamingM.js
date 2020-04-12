import React from 'react';
import SideNavM from '../componentsM/navigationComponentsM/sideNavM';
import StreamingContentM from '../componentsM/streamingComponentsM/streamingContentM';
import TopNavM from '../componentsM/navigationComponentsM/topNavM';

export default class StreamingPageM extends React.Component {
    constructor(props) {
        super(props);
        this.streamingContent = React.createRef();
        this.state = {
            streamingContent: 'dashboard'
        }
    }


    render = () => {
        return (
            <div id='streamingM'>
                <TopNavM />
                <SideNavM streamingContent={this.streamingContent} />
                <StreamingContentM ref={this.streamingContent} option={this.state.dashOption} />
            </div>
        );
    }
}