import React from 'react';
import ScriptUploadFileModal from './scriptUploadFileModal';
import ScriptTopBar from './scriptTopbar';
import ScriptList from './scriptList';
import './scriptDash.css';
class ScriptDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showMatlabUploadModal: false };
  }

  handleMatlabUploadModal = () => {
    this.setState({ showMatlabUploadModal: true });
  };

  render() {
    return (
      <React.Fragment>
        <div id="scriptDash">
          <ScriptTopBar
            marginLeft={this.props.marginLeft}
            handleMatlabUploadModal={() => {
              this.handleMatlabUploadModal();
            }}
          />
          <div id="scriptContent">
            <ScriptUploadFileModal
              show={this.state.showMatlabUploadModal}
              onHide={() => this.setState({ showMatlabUploadModal: false })}
            />
          </div>
          <div>
            <ScriptList />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ScriptDash;
