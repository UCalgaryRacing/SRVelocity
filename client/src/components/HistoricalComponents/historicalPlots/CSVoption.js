// import { ReadError } from "got/dist/source";
import React from "react";
import { Card } from "react-bootstrap";

export default function CSVoption(props) {
  const showPlots = (e) => {
    let reader = new FileReader();

    reader.addEventListener("loadend", (e) => {
      const CSVString = e.srcElement.result;
      console.log(CSVString);
    });
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>{props.filename}</Card.Title>
          <Card.Text style={{ color: "#C22E2D" }}>Created:</Card.Text>
          <Card.Text style={{ color: "#B0B0B0" }}>{props.date}</Card.Text>
          <Card.Text style={{ color: "#C22E2D" }}>Vehicle:</Card.Text>
          <Card.Text style={{ color: "#B0B0B0" }}>{props.car}</Card.Text>
          <Card.Text style={{ color: "#C22E2D" }}>Driver:</Card.Text>
          <Card.Text style={{ color: "#B0B0B0" }}>{props.driver}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
