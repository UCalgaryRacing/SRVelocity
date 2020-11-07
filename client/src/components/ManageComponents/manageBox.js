import React from "react";
import { Button } from "react-bootstrap";
import ManageEdit from "./manageEdit";
import ConfirmationModal from "./confirmationModal";
import "./manageBox.css";

export default class ManageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: this.props.labels,
      values: this.props.values,
      ID: this.props.ID,
      showEdit: false,
      showConfirmation: false,
    };
    this.info = [];
  }

  componentWillMount = () => {
    this.generateBox();
  };

  generateBox = () => {
    this.info = [];
    var i = 1;
    var margin = 30;
    while (i < this.state.labels.length) {
      this.info.push(
        <div
          id="column"
          style={{ marginTop: margin + "px" }}
          onClick={this.downloadFile}
        >
          <div id="label">{this.state.labels[i]}:&nbsp;</div>
          <div id="value">{this.state.values[i]}</div>
        </div>
      );
      margin += 30;
      i++;
    }
    this.info.push(
      <div id="column" style={{ marginTop: margin + "px" }}>
        {this.props.children}
      </div>
    );

    this.forceUpdate();
  };

  submitEdit = async (data) => {
    let status = await this.props.submitEdit(data, this.props.ID);
    if (status) {
      await this.setState({ values: data, showEdit: false });
      this.generateBox();
    } else {
      //Oops, something went wrong
    }
    return status;
  };

  toggleEdit = () => {
    this.setState({ showEdit: !this.state.showEdit });
  };

  delete = () => {
    this.props.delete(this.props.ID);
  };

  hideModal = () => {
    this.setState({ showConfirmation: false });
  };

  render = () => {
    return (
      <div id="manageBox">
        <div
          style={{
            height: "36px",
            position: "absolute",
            lineHeight: "36px",
            fontSize: "20px",
            cursor: "pointer",
          }}
          onClick={this.downloadFile}
        >
          {this.state.values[0]}
        </div>
        {this.info}
        <Button
          id="boxButton"
          onClick={() => {
            this.setState({ showConfirmation: true });
          }}
          style={{ position: "absolute", right: "20px" }}
        >
          <img
            id="logoImg"
            style={{ marginTop: "2px" }}
            src={require("../../assets/delete-x.svg")}
          />
        </Button>
        <Button
          id="boxButton"
          onClick={this.toggleEdit}
          style={{ position: "absolute", right: "20px", marginTop: "46px" }}
        >
          <img
            id="logoImg"
            width="27px"
            style={{
              marginTop: "-14px",
              marginLeft: "-13px",
              position: "absolute",
            }}
            src={require("../../assets/edit.svg")}
          />
        </Button>
        {this.state.showEdit ? (
          <ManageEdit
            labels={this.state.labels}
            values={this.state.values}
            submitEdit={this.submitEdit}
          />
        ) : null}
        <ConfirmationModal
          showModal={this.state.showConfirmation}
          hideModal={this.hideModal}
          delete={this.delete}
          name={this.state.values[0]}
        />
      </div>
    );
  };
}
