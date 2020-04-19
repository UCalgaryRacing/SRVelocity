import React from 'react';

export default class DataAnalysisDash extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div id ='dashboard'>
                <p style={{textAlign: 'center', marginTop: '100px', fontSize: '20px'}}>
                    Data Analysis Dashboard
                </p>
                <p style={{textAlign: 'center', marginTop: '100px', fontSize: '20px'}}>
                    In Progress
                </p>
                <p style={{textAlign: 'center', marginTop: '100px', fontSize: '20px', margin: '40px'}}>
                    This dashboard will include real-time data analysis. Currently looking into machine learning applications that may be useful. 
                    Could also compare streaming data with historicals. Also looking into lap time predictions based on pace. 
                </p>
            </div>
        )
    }
}