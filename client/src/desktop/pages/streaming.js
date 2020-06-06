import React from "react";
import TopNav from "../components/navigationComponents/topNav";
import StreamingSideNav from "../components/navigationComponents/streamingSideNav";
import StreamingContent from "../components/streamingComponents/streamingContent";
import { isMobile } from "react-device-detect";
import SideNavMobileStreaming from "../components/mobileStreamingComponents/sideNavMobile";
import "../styling/streaming.css";

export default class StreamingPage extends React.Component {
  constructor(props) {
    super(props);
    this.streamingContent = React.createRef();
  }

  render = () => {
    let sideNav = null;
    let topNav = null;
    return (
      <div id="streamingPage">
        <TopNav />
        <StreamingSideNav streamingContent={this.streamingContent} />
        <StreamingContent ref={this.streamingContent} />
      </div>
    );
  };
}
