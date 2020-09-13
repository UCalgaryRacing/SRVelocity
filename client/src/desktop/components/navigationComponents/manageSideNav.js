import React from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "../../styling/sideNav.css";

export default class ManageSideNav extends React.Component {
  render = () => {
    return (
      <React.Fragment>
        <SideNav
          onToggle={() => {
            this.props.manageContent.current.changeLeftMargin();
          }}
          onSelect={(selected) => {
            this.props.manageContent.current.changeContent(selected);
          }}
          style={{ top: "56px", fontSize: "2rem" }}
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="Sensors">
            <NavItem eventKey="Sensors">
              <NavIcon>
                <img
                  src={require("../../../assets/sensor.svg")}
                  style={{ marginLeft: "14px", marginTop: "8px" }}
                  alt="Sensors"
                />
              </NavIcon>
              <NavText>
                <b>&nbsp;&nbsp;&nbsp;Manage Sensors</b>
              </NavText>
            </NavItem>
            <NavItem eventKey="Drivers">
              <NavIcon>
                <img
                  src={require("../../../assets/driver.svg")}
                  style={{ marginLeft: "12px", marginTop: "8px"}}
                  alt="Drivers"
                />
              </NavIcon>
              <NavText>
                <b>&nbsp;&nbsp;&nbsp;Manage Drivers</b>
              </NavText>
            </NavItem>
            <NavItem eventKey="Vehicles">
              <NavIcon>
                <img
                  src={require("../../../assets/f1.svg")}
                  style={{ marginLeft: "5px", marginTop: "-3px" }}
                  alt="Vehicles"
                />
              </NavIcon>
              <NavText>
                <b>&nbsp;&nbsp;&nbsp;Manage Vehicles</b>
              </NavText>
            </NavItem>
            <NavItem eventKey="Subteams">
              <NavIcon>
                <img
                  src={require("../../../assets/subteam.svg")}
                  style={{ marginLeft: "12px", marginTop: "15px" }}
                  alt="Subteams"
                />
              </NavIcon>
              <NavText>
                <b>&nbsp;&nbsp;&nbsp;Manage Subteams</b>
              </NavText>
            </NavItem>
            <NavItem eventKey="People">
              <NavIcon>
                <img
                  src={require("../../../assets/person.svg")}
                  style={{ marginLeft: "15.5px", marginTop: "9px" }}
                  alt="People"
                />
              </NavIcon>
              <NavText>
                <b>&nbsp;&nbsp;&nbsp;Manage People</b>
              </NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
      </React.Fragment>
    );
  };
}
