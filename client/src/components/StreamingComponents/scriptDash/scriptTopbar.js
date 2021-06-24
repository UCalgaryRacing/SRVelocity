import React from 'react';
import Button from 'react-bootstrap/Button';
import './scriptDash.css';

class ScriptTopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        id="top"
        style={{
          position: 'fixed',
          top: '56px',
          right: '0',
          left: '0',
          zIndex: '999',
          height:
            this.state.typeOption === 'plotting' &&
            this.state.showBottomNav &&
            window.innerWidth < 1000
              ? '102px'
              : '56px',
          paddingLeft: 'calc(' + this.props.marginLeft + ' + 10px)',
          paddingTop: '16px',
          background: '#F5F5F5',
          borderColor: '#C22D2D',
          borderWidth: '0',
          borderBottomWidth: '1px',
          borderStyle: 'solid',
        }}
      >
        <Button id="uploadButton" onClick={this.props.handleMatlabUploadModal}>
          <b>Upload MatLab Script</b>
        </Button>
        &nbsp;&nbsp;
      </div>
    );
  }
}

export default ScriptTopBar;
