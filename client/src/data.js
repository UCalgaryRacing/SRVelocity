import React from 'react';


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export default class Data{

    constructor() {
        //super(props);

        this.params = {
            MAX_LENGTH: 30
        }

        this.labels = [0]

        this.datasets = [
                { title: 'RPM', value: []},
                { title: 'Air To Fuel', value: []},
                { title: 'Manifold Air Pressure', value: []},
                { title: 'Throttle Position', value: []},
                { title: 'Engine Temperature', value: []},
                { title: 'Oil Temperature', value: []},
                { title: 'Intake Air Temperature', value: []},
                { title: 'Oil Pressure', value: []},
                { title: 'Barometer', value: []},
                { title: 'Injector Pulse Width', value: []}, 
                { title: 'Suspension', value: []},
                { title: 'Acceleration', value: []},
                { title: 'Roll', value: []},
                { title: 'Pitch', value: []},
                { title: 'Yaw', value: []},
                { title: 'Speed', value: []},
                { title: 'Distance', value: []},
                { title: 'Track Map', value: []}]

        this.interval = setInterval(() => this.tick(), 200);

    }


    pullData = () => {
        let newTime = this.labels[this.labels.length -1 ] + 1;
        this.labels.push(newTime)

        if(this.labels.length > this.params.MAX_LENGTH) {
            this.labels.shift()
        }

        for (var parameter of this.datasets) {
            parameter.value.push(getRandomInt(0, 10));

            if (parameter.value.length > this.params.MAX_LENGTH) {
                parameter.value.shift();
            }
        }
    }

    get = (index) => {
        for(var parameter of this.datasets)  {
            if (index === parameter.title) {
                return parameter.value;
            }
        }
    }

    getLabels = () => {
        return this.labels;
    }

    tick = () => {
        this.pullData();
    }


    static instance = null;

    static getInstance() {
        if (Data.instance == null) {
            Data.instance = new Data();
        }

        return this.instance;
    }


}
