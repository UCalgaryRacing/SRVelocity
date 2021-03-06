import React from "react";
import HistoricalDash from './historicalData/historicalDash';
import BottomNav from '../NavigationComponents/bottomNav';
import TopNav from '../NavigationComponents/topNav';
import HistoricalPlotDash from './historicalPlots/historicalPlotDash'
import Sessions from './historicalData/Sessions.js';
import './historicalContent.css';

export default class StreamingContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "Data",
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
        id="historicalContent"
        style={{ transition: "all 0.15s", marginLeft: this.state.marginLeft}}
      >
        <TopNav/>
        {this.state.content === "Data" ? <HistoricalDash marginLeft={this.state.marginLeft}/> : null}
        {/*{this.state.content === "Sessions" ? <Sessions marginLeft={this.state.marginLeft}/> : null}*/}
        {this.state.content === "Data" ? <Sessions marginLeft={this.state.marginLeft}/> : null}
        {this.state.content === "Create Plots" ? <HistoricalPlotDash marginLeft={this.state.marginLeft}/> : null}
        <BottomNav/>
      </div>
    );
  };
}
