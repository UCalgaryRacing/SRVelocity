import React from 'react';
import StreamingDash from '../dashComponents/dashboard';
import DataAnalysisDash from '../dataAnalysisComponents/dashboard';
import CustomVisDash from '../customVisComponents/dashboard';
import VirtualDash from '../3DComponents/virtualDash';

export default class StreamingContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: 'Dash',
            marginLeft: '80px',
            toggleDash: false
        }
    }

    changeContent = (newContent) => {
        this.setState({ content: newContent });
        this.forceUpdate();
    }

    changeLeftMargin = () => {
        this.setState({ marginLeft: (this.state.marginLeft === '80px') ? '270px' : '80px' });
    }

    render = () => {
        return (
            <div id='streamingContent' style={{ marginTop: '0px', transition: 'all 0.15s', marginLeft: this.state.marginLeft }}>
                {this.state.content === 'Dash' ? <StreamingDash /> : null}
                {this.state.content === 'Custom Plots' ? <CustomVisDash /> : null}
                {this.state.content === 'Data Analysis' ? <DataAnalysisDash /> : null}
                {this.state.content === 'Digital Twin' ? <VirtualDash /> : null}
            </div>
        );
    }
}