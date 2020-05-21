import React from "react";
import { Row, Col, Button } from "react-bootstrap";

class Member extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <p>Currently in member mode</p>
        <Row>
          <Col md={{ span: 1, offset: 0 }}>
            <Button
              style={{ backgroundColor: "rgb(194, 45, 45)", color: "white" }}
              onClick={this.props.toggleMemberView}
            >
              Back
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Member;
