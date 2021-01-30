import React from 'react';
import { Card } from 'react-bootstrap';
import { GATEWAYSERVERIP } from '../../../dataServerEnv';

export default class SimpleCSVBox extends React.Component {
  downloadFile = () => {
    fetch(GATEWAYSERVERIP + '/historical/getFile/' + this.props.filename, {
      method: 'GET',
    })
      .then((res) => res.blob())
      //.then(blob => download(blob, this.state.filename))
      .catch((err) => {
        console.log(err);
      });
  };

  showPlots = (e) => {
    // let reader = new FileReader();

    // reader.addEventListener('loadend', (e) => {
    //   const CSVString = e.srcElement.result;
    //   console.log(Array.isArray(CSVString));
    //   this.props.showFilePlot(CSVString, this.props.filename, this.props.ID);
    // });

    fetch(GATEWAYSERVERIP + '/historical/getHeader/' + this.props.filename, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res_json) => {
        this.props.showFilePlot(res_json, this.props.filename, this.props.ID);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render = () => {
    return (
      <div id="SimpleCSVBox" onClick={this.showPlots}>
        <Card border='dark' style={{width:'300px', height:'300px', marginBottom:'25px'}}>
          <Card.Body>
            <Card.Title>{this.props.filename}</Card.Title>
            <Card.Text style={{ color: '#C22E2D' }}>Created:</Card.Text>
            <Card.Text style={{ color: '#B0B0B0' }}>
              {this.props.date}
            </Card.Text>
            <Card.Text style={{ color: '#C22E2D' }}>Vehicle:</Card.Text>
            <Card.Text style={{ color: '#B0B0B0' }}>{this.props.car}</Card.Text>
            <Card.Text style={{ color: '#C22E2D' }}>Driver:</Card.Text>
            <Card.Text style={{ color: '#B0B0B0' }}>
              {this.props.driver}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  };
}
