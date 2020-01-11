import React from 'react';
import StreamingDashM from '../dashComponentsM/dashboardM';
import DataPageM from '../streamingComponentsM/dataPageM';

export default class StreamingContentM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: 'Dash',
        }
    }

    changeContent = (newContent) => {
        this.setState({ content: newContent });
    }

    render = () => {
        if (this.state.content === 'Dash') {
            return (
                <div id='streamingContent' style={{ marginTop: '15px', transition: 'all 0.15s' }}>
                    <StreamingDashM toggleDashType={this.props.toggleDashType} />
                </div>
            );
        }
        else {
            return (
                <div id='streamingContent' style={{ marginTop: '-40px', transition: 'all 0.15s' }}>
                    <DataPageM content={this.state.content} key={Math.random()}/>
                </div>
            );
        }
    }
}