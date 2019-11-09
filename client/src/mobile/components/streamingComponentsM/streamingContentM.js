import React from 'react';
import StreamingDash from '../../../desktop/components/dashComponents/dashboard.js';
import DataPage from '../../../desktop/components/streamingComponents/dataPage.js';

export default class StreamingContentM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: 'Dash',
            marginLeft: '80px'
        }
    }

    changeContent = (newContent) => {
        this.setState({ content: newContent });
    }

    changeLeftMargin = () => {
        this.setState({
            marginLeft: (this.state.marginLeft === '80px') ? '270px' : '80px'
        });
    }

    render = () => {
        if (this.state.content === 'Dash') {
            return (
                <div id='streamingContent' style={{ marginTop: '15px', transition: 'all 0.15s', marginLeft: this.state.marginLeft }}>
                    <StreamingDash />
                </div>
            );
        }
        else {
            return (
                <div id='streamingContent' style={{ marginTop: '15px', transition: 'all 0.15s', marginLeft: this.state.marginLeft }}>
                    <DataPage content={this.state.content}/>
                </div>
            );
        }
    }
}