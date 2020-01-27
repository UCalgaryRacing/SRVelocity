import React from 'react';
import StreamingDash from '../dashComponents/dashboard';
import DataPage from '../streamingComponents/dataPage';

export default class StreamingContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: 'Dash',
            marginLeft: '80px',
            toggleDash: false
        }
        this.disableDash = this.disableDash.bind(this);
    }

    componentWillMount() { document.addEventListener('OFF', () => { this.disableDash() }); }
    componentWillUnmount() { document.removeEventListener('OFF', this.disableDash()); }

    disableDash = () => { this.setState({ toggleDash: true }); }

    changeContent = (newContent) => {
        this.setState({ content: newContent });
        this.forceUpdate();
    }

    changeLeftMargin = () => { this.setState({ marginLeft: (this.state.marginLeft === '80px') ? '270px' : '80px' }); }

    render = () => {
        if (this.state.toggleDash) {
            return (
                <div id='streamingContent' style={{ marginTop: '100px', transition: 'all 0.15s', marginLeft: this.state.marginLeft, textAlign: 'center' }}>
                    <p style={{ fontWeight: 'bold' }}>
                        The SR21 is currently off. Please check back later.
                    </p>
                </div>
            )
        }
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
                    <DataPage content={this.state.content} key={Math.random()} />
                </div>
            );
        }
    }
}