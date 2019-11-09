import React from 'react';

export default class DataPageM extends React.Component {
    render = () => {
        return (
            <div id='streamingData'>
                {this.props.content}
            </div>
        );
    }
}