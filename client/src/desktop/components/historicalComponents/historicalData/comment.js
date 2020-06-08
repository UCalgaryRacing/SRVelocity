import React from 'react';

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: this.props.content,
            poster: 'Justin Tijunelis' + ":",
            date: this.props.date,
            ID: this.props.ID
        }
    }

    render = () => {
        return (
            <div style={{margin: '10px', paddingLeft: '10px', borderLeft: '1px solid', borderColor: '#C22E2D'}}>
                <div style={{color: '#C22E2D', marginBottom: '16px', fontSize: '12px'}}>
                    {this.state.poster}
                </div>
                <div dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
                <div style={{color: '#B0B0B0', fontSize: '12px'}}>
                    {this.state.date}
                </div>
            </div>
        );
    }
}