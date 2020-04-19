import React from 'react';

export default class ManageContent extends React.Component {
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
                        Manage Dashboard
                        </p>
                    <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.5rem' }}>
                        On this dashboard, you will be able to manage data (add, delete, rename, etc). You will also be able to add, remove, and update
                        sensors, drivers, vehicles, and people. Here we would define who is driving, and which sensors are on the vehicle. For security
                        purposes, new people that join will need to be approved. This part of the system will not be visible to the public.
                        </p>
                </div>
            </div>
        );
    }
}