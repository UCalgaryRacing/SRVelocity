import React from "react";
import StreamingDash from "../dashComponents/dashboard";
import DataAnalysisDash from "../dataAnalysisComponents/dashboard";
import CustomVisDash from "../customVisComponents/dashboard";
import VirtualDash from "../3DComponents/virtualDash";
import BottomNav from '../navigationComponents/bottomNav';

export default class StreamingContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileContent: "plotting",
      content: "Dash",
      marginLeft: window.innerWidth < 1000 ? "0px" : "64px",
      toggleDash: false,
      sideOpen: false
    };
  }

  componentWillMount = () => {
    window.addEventListener("resize", this.updateMargin);
  }

  updateMargin = () => {
    if (window.innerWidth < 1000) {
      this.setState({
        marginLeft: "0px"
      });
    } else {
      this.setState({
        marginLeft: this.state.sideOpen ? '240px' : '64px'
      });
    }
  }

  changeLeftMargin = () => {
    this.setState({
      marginLeft: this.state.marginLeft === "64px" ? "240px" : "64px",
      sideOpen: !this.state.sideOpen
    });
  };

  changeContent = (newContent) => {
    this.setState({ content: newContent });
  }

  render = () => {
    return (
      <div
        id="streamingContent"
        style={{ transition: "all 0.15s", marginLeft: this.state.marginLeft}}
      >
        {this.state.content === "Dash" ? <StreamingDash marginLeft={this.state.marginLeft} refreshPage={this.props.refreshPage}/> : null}
        {this.state.content === "Custom Plots" ? <CustomVisDash /> : null}
        {this.state.content === "Data Analysis" ? <DataAnalysisDash /> : null}
        {this.state.content === "Digital Twin" ? <VirtualDash /> : null}
        <BottomNav/>
      </div>
    );
  };
}
