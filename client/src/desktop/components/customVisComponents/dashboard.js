import React from 'react';

export default class CustomVisDash extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div id ='dashboard'>
                <p style={{textAlign: 'center', marginTop: '100px', fontSize: '20px'}}>
                    Custom Data Visualization Dashboard
                </p>
                <p style={{textAlign: 'center', marginTop: '100px', fontSize: '20px'}}>
                    Under Construction
                </p>
            </div>
        )
    }
}