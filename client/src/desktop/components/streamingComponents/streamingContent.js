import React from "react";
import StreamingDash from "../dashComponents/dashboard";
import MobileGraphingDashboard from "../mobileStreamingComponents/mobileGraphingDashboard";
import DataAnalysisDash from "../dataAnalysisComponents/dashboard";
import CustomVisDash from "../customVisComponents/dashboard";
import VirtualDash from "../3DComponents/virtualDash";
import { isMobile } from "react-device-detect";

export default class StreamingContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileContent: "plotting",
      content: "Dash",
      marginLeft: isMobile ? "0px" : "80px",
      toggleDash: false,
    };
  }

  changeContentMobile = (newContent) => {
    this.setState({ mobileContent: newContent });
  };

  changeContent = (newContent) => {
    this.setState({ content: newContent });
    this.forceUpdate();
  };

  changeLeftMargin = () => {
    this.setState({
      marginLeft: this.state.marginLeft === "80px" ? "255px" : "80px",
    });
  };

  render = () => {
    return (
      <div
        id="streamingContent"
        style={{ transition: "all 0.15s", marginLeft: this.state.marginLeft }}
      >
        {this.state.content === "Dash" ? (
          isMobile ? (
            <MobileGraphingDashboard content={this.state.mobileContent} />
          ) : (
            <StreamingDash leftMargin={this.state.marginLeft} />
          )
        ) : null}
        {this.state.content === "Custom Plots" ? <CustomVisDash /> : null}
        {this.state.content === "Data Analysis" ? <DataAnalysisDash /> : null}
        {this.state.content === "Digital Twin" ? <VirtualDash /> : null}
      </div>
    );
  };
}
