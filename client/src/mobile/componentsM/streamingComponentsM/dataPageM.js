import React from 'react';
import GraphBox from '../graphComponentsM/graphBox';

export default class DataPageM extends React.Component {
    render = () => {
        return (
            <div id='streamingData'>
                <GraphBox title={this.props.content}/>
            </div>
        );
    }
}