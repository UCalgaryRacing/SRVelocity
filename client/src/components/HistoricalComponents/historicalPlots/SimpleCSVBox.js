import React from "react";
import { Card } from "react-bootstrap";
import { GATEWAYSERVERIP } from "../../../dataServerEnv";

export default class SimpleCSVBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filename: this.props.filename,
      driver: this.props.driver,
      car: this.props.car,
      date: this.props.date,
    };
  }

  downloadFile = () => {
    fetch(GATEWAYSERVERIP + "/historical/getFile/" + this.state.filename, {
      method: "GET",
    })
      .then((res) => res.blob())
      //.then(blob => download(blob, this.state.filename))
      .catch((err) => {
        console.log(err);
      });
  };

  showPlots = (e) => {
    let reader = new FileReader();

    reader.addEventListener("loadend", (e) => {
      const CSVString = e.srcElement.result;
      this.props.showFilePlot(CSVString, this.props.filename, this.props.ID);
    });

    fetch(GATEWAYSERVERIP + "/historical/getFile/" + this.state.filename, {
      method: "GET",
    })
      .then((res) => res.blob())
      .then((blob) => reader.readAsText(blob))
      .catch((err) => {
        console.log(err);
      });
  };

  render = () => {
    return (
      <div id="SimpleCSVBox" onClick={this.showPlots}>
        <Card>
          <Card.Body>
            <Card.Title>{this.state.filename}</Card.Title>
            <Card.Text style={{ color: "#C22E2D" }}>Created:</Card.Text>
            <Card.Text style={{ color: "#B0B0B0" }}>
              {this.state.date}
            </Card.Text>
            <Card.Text style={{ color: "#C22E2D" }}>Vehicle:</Card.Text>
            <Card.Text style={{ color: "#B0B0B0" }}>{this.state.car}</Card.Text>
            <Card.Text style={{ color: "#C22E2D" }}>Driver:</Card.Text>
            <Card.Text style={{ color: "#B0B0B0" }}>
              {this.state.driver}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  };
}
