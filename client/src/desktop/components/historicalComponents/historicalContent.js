import React from 'react';

export default class HistoricalContent extends React.Component {
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
            <div id='streamingPage' style={{ marginTop: '15px', transition: 'all 0.15s', marginLeft: this.state.marginLeft }}>
                <div id='dashboard'>
                    <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.5rem' }}>
                        Historical Dashboard
                        </p>
                    <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.5rem' }}>
                        On this dashboard, you will be able to download CSV data, comment on CSV data, create and save custom data 
                        visualization. There may also be some applications for race/driver comparisons. This part of the system will
                        not be visible to the public. 
                        </p>
                </div>
            </div>
        );
    }
}