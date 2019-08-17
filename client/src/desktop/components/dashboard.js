import React from 'react';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: 'dash'
        }
    }

    render = () => {
        if(this.state.option === 'dash') {
            return (
                <div id='dashboard'>
                    Hello
                </div>
            );
        }
        else {
            return (
                <div id='dashboard'>
                    Hello
                </div>
            );
        }
    }
}
