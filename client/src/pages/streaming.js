import React from "react";
import StreamingSideNav from "../components/NavigationComponents/streamingSideNav";
import StreamingContent from "../components/StreamingComponents/streamingContent";
import "./_styling/streaming.css";

export default class StreamingPage extends React.Component {
  constructor(props) {
    super(props);
    this.streamingContent = React.createRef();
  }

  render = () => {
    return (
      <div id="streamingPage">
        <StreamingSideNav streamingContent={this.streamingContent} />
        <StreamingContent ref={this.streamingContent} refreshPage={this.props.refreshPage}/>
      </div>
    );
  };
}
