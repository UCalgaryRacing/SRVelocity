import React from 'react';

export default class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: this.props.content,
            commenter: this.props.commenter,
            commenterID: this.props.commenterID,
            date: this.props.date,
            ID: this.props.ID,
            showDelete: (this.props.commenterID === sessionStorage.getItem("ID")) ? true : false
        }
    }

    render = () => {
        return (
            <div style={{ margin: '10px', paddingLeft: '10px', borderLeft: '1px solid', borderColor: '#C22E2D' }}>
                <div style={{ color: '#C22E2D', marginBottom: '10px', fontSize: '12px' }}>
                    {this.state.commenter}:
                </div>
                <div dangerouslySetInnerHTML={{ __html: this.state.content }}></div>
                <div style={{ color: '#B0B0B0', fontSize: '12px', display: 'inline-block' }}>
                    {this.state.date}
                </div>
                <div
                    onClick={() => { this.props.deleteComment(this.props.ID) }}
                    style={{ color: '#C22E2D', fontSize: '12px', marginTop: '5px', marginLeft: '5px', display: this.state.showDelete ? 'inline-block' : 'none', cursor: 'pointer' }}
                >
                    DELETE
                </div>
            </div>
        );
    }
}