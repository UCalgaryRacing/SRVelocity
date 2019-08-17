import React from 'react';
import StreamingDash from './dashboard';

export default class StreamingContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: 'Dash',
            marginLeft: '90px'
        }
    }

    changeContent = (newContent) => {
        this.setState({ content: newContent });
    }

    changeLeftMargin = () => {
        this.setState({
            marginLeft: (this.state.marginLeft === '90px') ? '270px' : '90px'
        })
    }

    render = () => {
        if (this.state.content === 'Dash') {
            return (
                <div id='streamingContent' style={{ marginTop: '20px', transition: 'all 0.15s', marginLeft: this.state.marginLeft }}>
                    <StreamingDash />
                </div>
            );
        }
        else {
            return (
                <div id='streamingContent' style={{ marginTop: '20px', marginLeft: this.state.marginLeft }}>
                    {this.state.content}
                </div>
            );
        }
    }
}