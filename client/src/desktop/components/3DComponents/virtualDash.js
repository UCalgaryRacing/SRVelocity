//FOR JAMES:

import React from 'react';

export default class VirtualDash extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div id ='dashboard'>
                <p style={{textAlign: 'center', marginTop: '100px', fontSize: '20px'}}>
                    Digital Twin Dasboard
                </p>
                <p style={{textAlign: 'center', marginTop: '100px', fontSize: '20px'}}>
                    Under Construction
                </p>
            </div>
        )
    }
}