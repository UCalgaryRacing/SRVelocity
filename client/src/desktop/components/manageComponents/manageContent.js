import React from "react";
import TeamList from "./teamList";
import SensorDash from "./sensorDash";

export default class ManageContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "Data",
      marginLeft: "80px",
      toggleDash: false,
    };
  }

  changeContent = (newContent) => {
    this.setState({ content: newContent });
    this.forceUpdate();
  };

  changeLeftMargin = () => {
    this.setState({
      marginLeft: this.state.marginLeft === "80px" ? "270px" : "80px",
    });
  };

  render() {
    return (
      <div
        id="managementPage"
        style={{
          marginTop: "15px",
          transition: "all 0.15s",
          marginLeft: this.state.marginLeft,
        }}
      >
        {this.state.content === "Data" ? <p>Data</p> : null}
        {this.state.content === "Sensors" ? <SensorDash /> : null}
        {this.state.content === "Drivers" ? <p>Drivers</p> : null}
        {this.state.content === "Vehicles" ? <p>Vehicles</p> : null}
        {this.state.content === "People" ? <TeamList /> : null}
      </div>
    );
  }
}
