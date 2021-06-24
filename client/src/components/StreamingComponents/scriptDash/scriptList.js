import React from 'react';
import ScriptElement from './scriptElement';
import './scriptDash.css';
class ScriptList extends React.Component {
  constructor(props) {
    super(props);

    this.tempList = [
      {
        scriptName: 'Script',
        fileName: 'test1',
        authorName: 'guest1',
        uploaderName: 'guest1',
        date: '01-01-21',
        description: 'This is a test',
      },
    ];
    this.state = { scripts: null };
  }

  componentDidMount = () => {
    this.addScripts(this.tempList);
  };

  addScripts = (scripts) => {
    let tempScripts = [];
    scripts.forEach((script) => {
      tempScripts.push(
        <ScriptElement
          scriptName={script.scriptName}
          fileName={script.fileName}
          authorName={script.authorName}
          uploaderName={script.uploaderName}
          date={script.date}
          description={script.description}
        />
      );
    });
    this.setState({ scripts: tempScripts });
  };

  render() {
    return <div>{this.state.scripts}</div>;
  }
}

export default ScriptList;
