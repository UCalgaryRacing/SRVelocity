import React from 'react';
import './scriptDash.css';

class ScriptElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scriptName: this.props.scriptName,
      fileName: this.props.fileName,
      authorName: this.props.authorName,
      uploaderName: this.props.uploaderName,
      date: this.props.date,
      description: this.props.description,
      showEditModal: false,
      showMore: false,
      confirmDelete: false,
    };
  }

  deleteFile = () => {};

  render() {
    return (
      <div id="scriptBox">
        <p id="scriptName">{this.state.scriptName}</p>
        <p>{this.state.fileName}</p>
        <p>{this.state.authorName}</p>
        <p>{this.state.uploaderName}</p>
        <p>{this.state.date}</p>
      </div>
    );
  }
}

export default ScriptElement;
