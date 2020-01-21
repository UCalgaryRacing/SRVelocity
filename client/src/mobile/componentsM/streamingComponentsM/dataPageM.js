import React from 'react';
import GraphBoxM from '../graphComponentsM/graphBoxM';

export default class DataPageM extends React.Component {
    render = () => {
        return (
            <div id='streamingData' style={{marginTop: '0'}}>
                <GraphBoxM title={this.props.content}/>
            </div>
        );
    }
}