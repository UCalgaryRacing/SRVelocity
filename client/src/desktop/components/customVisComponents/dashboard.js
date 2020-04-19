import React from 'react';

export default class CustomVisDash extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div id ='dashboard'>
                <p style={{textAlign: 'center', marginTop: '100px', fontSize: '20px'}}>
                    Custom Data Visualization Dasboard
                </p>
                <p style={{textAlign: 'center', marginTop: '100px', fontSize: '20px'}}>
                    In Progress
                </p>
                <p style={{textAlign: 'center', marginTop: '100px', fontSize: '20px', margin: '40px'}}>
                    This dashboard will allow you to create, save, and interact with custom data visualizations. 
                    This will also be available with historical data.
                </p>
            </div>
        )
    }
}