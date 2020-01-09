import React from 'react';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class Data {
    constructor() {
        this.params = {
            MAX_LENGTH: 30
        }
        this.labels = [0]
        this.datasets = [
            {
                title: 'RPM', value: [{
                    data: [],
                    label: '',
                    borderColor: 'rgb(255, 0, 0)',
                    pointRadius: 1,
                    backgroundColor: 'rgb(255, 255, 255, 0)',
                    lineTension: 0
                }]
            },
            {
                title: 'Air To Fuel', value: [{
                    data: [],
                    label: '',
                    borderColor: 'rgb(255, 0, 0)',
                    pointRadius: 1,
                    backgroundColor: 'rgb(255, 255, 255, 0)',
                    lineTension: 0
                }]
            },
            {
                title: 'Manifold Air Pressure', value: [{
                    data: [],
                    label: '',
                    borderColor: 'rgb(255, 0, 0)',
                    pointRadius: 1,
                    backgroundColor: 'rgb(255, 255, 255, 0)',
                    lineTension: 0
                }]
            },
            {
                title: 'Throttle Position', value: [{
                    data: [],
                    label: '',
                    borderColor: 'rgb(255, 0, 0)',
                    pointRadius: 1,
                    backgroundColor: 'rgb(255, 255, 255, 0)',
                    lineTension: 0
                }]
            },
            {
                title: 'Engine Temperature', value: [{
                    data: [],
                    label: '',
                    borderColor: 'rgb(255, 0, 0)',
                    pointRadius: 1,
                    backgroundColor: 'rgb(255, 255, 255, 0)',
                    lineTension: 0
                }]
            },
            {
                title: 'Oil Temperature', value: [{
                    data: [],
                    label: '',
                    borderColor: 'rgb(255, 0, 0)',
                    pointRadius: 1,
                    backgroundColor: 'rgb(255, 255, 255, 0)',
                    lineTension: 0
                }]
            },
            {
                title: 'Fuel Temperature', value: [{
                    data: [],
                    label: '',
                    borderColor: 'rgb(255, 0, 0)',
                    pointRadius: 1,
                    backgroundColor: 'rgb(255, 255, 255, 0)',
                    lineTension: 0
                }]
            },
            {
                title: 'Intake Air Temperature', value: [{
                    data: [],
                    label: '',
                    borderColor: 'rgb(255, 0, 0)',
                    pointRadius: 1,
                    backgroundColor: 'rgb(255, 255, 255, 0)',
                    lineTension: 0
                }]
            },
            {
                title: 'Oil Pressure', value: [{
                    data: [],
                    label: '',
                    borderColor: 'rgb(255, 0, 0)',
                    pointRadius: 1,
                    backgroundColor: 'rgb(255, 255, 255, 0)',
                    lineTension: 0
                }]
            },
            {
                title: 'Barometer', value: [{
                    data: [],
                    label: '',
                    borderColor: 'rgb(255, 0, 0)',
                    pointRadius: 1,
                    backgroundColor: 'rgb(255, 255, 255, 0)',
                    lineTension: 0
                }]
            },
            {
                title: 'Injector Pulse Width', value: [{
                    data: [],
                    label: '',
                    borderColor: 'rgb(255, 0, 0)',
                    pointRadius: 1,
                    backgroundColor: 'rgb(255, 255, 255, 0)',
                    lineTension: 0
                }]
            },
            {
                title: 'Suspension',
                value: [
                    {
                        data: [],
                        label: '',
                        borderColor: 'rgb(0, 114, 178)',
                        pointRadius: 1,
                        backgroundColor: 'rgb(255, 255, 255, 0)',
                        lineTension: 0,
                        type: 'line',
                        label: 'Rear Left'
                    },
                    {
                        data: [],
                        label: '',
                        borderColor: 'rgb(230, 159, 0)',
                        pointRadius: 1,
                        backgroundColor: 'rgb(255, 255, 255, 0)',
                        lineTension: 0,
                        type: 'line',
                        label: 'Rear Right'
                    },
                    {
                        data: [],
                        label: '',
                        borderColor: 'rgb(0, 158, 115)',
                        pointRadius: 1,
                        backgroundColor: 'rgb(255, 255, 255, 0)',
                        lineTension: 0,
                        type: 'line',
                        label: 'Front Left'
                    },
                    {
                        data: [],
                        label: '',
                        borderColor: 'rgb(204, 121, 167)',
                        pointRadius: 1,
                        backgroundColor: 'rgb(255, 255, 255, 0)',
                        lineTension: 0,
                        type: 'line',
                        label: 'Front Right'
                    }
                ]
            },
            {
                title: 'Acceleration', 
                value: [
                    {
                        data: [],
                        label: '',
                        borderColor: 'rgb(0, 114, 178)',
                        pointRadius: 1,
                        backgroundColor: 'rgb(255, 255, 255, 0)',
                        lineTension: 0,
                        type: 'line',
                        label: 'X'
                    },
                    {
                        data: [],
                        label: '',
                        borderColor: 'rgb(230, 159, 0)',
                        pointRadius: 1,
                        backgroundColor: 'rgb(255, 255, 255, 0)',
                        lineTension: 0,
                        type: 'line',
                        label: 'Y'
                    },
                    {
                        data: [],
                        label: '',
                        borderColor: 'rgb(0, 158, 115)',
                        pointRadius: 1,
                        backgroundColor: 'rgb(255, 255, 255, 0)',
                        lineTension: 0,
                        type: 'line',
                        label: 'Z'
                    }
                ]
            },
            {
                title: 'Roll', value: [{
                    data: [],
                    label: '',
                    borderColor: 'rgb(255, 0, 0)',
                    pointRadius: 1,
                    backgroundColor: 'rgb(255, 255, 255, 0)',
                    lineTension: 0
                }]
            },
            {
                title: 'Pitch', value: [{
                    data: [],
                    label: '',
                    borderColor: 'rgb(255, 0, 0)',
                    pointRadius: 1,
                    backgroundColor: 'rgb(255, 255, 255, 0)',
                    lineTension: 0
                }]
            },
            {
                title: 'Yaw', value: [{
                    data: [],
                    label: '',
                    borderColor: 'rgb(255, 0, 0)',
                    pointRadius: 1,
                    backgroundColor: 'rgb(255, 255, 255, 0)',
                    lineTension: 0
                }]
            },
            {
                title: 'Speed', value: [{
                    data: [],
                    label: '',
                    borderColor: 'rgb(255, 0, 0)',
                    pointRadius: 1,
                    backgroundColor: 'rgb(255, 255, 255, 0)',
                    lineTension: 0
                }]
            },
            {
                title: 'Distance', value: [{
                    data: [],
                    label: '',
                    borderColor: 'rgb(255, 0, 0)',
                    pointRadius: 1,
                    backgroundColor: 'rgb(255, 255, 255, 0)',
                    lineTension: 0
                }]
            },
            {
                title: 'Track Map', value: [{
                    data: [],
                    label: '',
                    borderColor: 'rgb(255, 0, 0)',
                    pointRadius: 1,
                    backgroundColor: 'rgb(255, 255, 255, 0)',
                    lineTension: 0
                }]
            }]
        this.interval = setInterval(() => this.tick(), 100);
    }

    pullData = () => {
        let newTime = this.labels[this.labels.length - 1] + 1;
        this.labels.push(newTime)
        if (this.labels.length > this.params.MAX_LENGTH) {
            this.labels.shift()
        }
        for (var parameter of this.datasets) {
            if(parameter.title !== 'Suspension' && parameter.title !== 'Acceleration') {
            parameter.value[0].data.push(getRandomInt(0, 10));
            if (parameter.value[0].data.length > this.params.MAX_LENGTH) {
                parameter.value[0].data.shift();
            }
            }
            else if(parameter.title === 'Suspension') {
                parameter.value[0].data.push(getRandomInt(0, 10));
                parameter.value[1].data.push(getRandomInt(0, 10));
                parameter.value[2].data.push(getRandomInt(0, 10));
                parameter.value[3].data.push(getRandomInt(0, 10));
                if (parameter.value[0].data.length > this.params.MAX_LENGTH) { 
                    parameter.value[0].data.shift(); 
                    parameter.value[1].data.shift();
                    parameter.value[2].data.shift();
                    parameter.value[3].data.shift();
                }
            }
            else if(parameter.title === 'Acceleration') {
                parameter.value[0].data.push(getRandomInt(0, 10));
                parameter.value[1].data.push(getRandomInt(0, 10));
                parameter.value[2].data.push(getRandomInt(0, 10));
                if (parameter.value[0].data.length > this.params.MAX_LENGTH) { 
                    parameter.value[0].data.shift(); 
                    parameter.value[1].data.shift();
                    parameter.value[2].data.shift();
                }
            }
            else {
                //Track map
            }
        }
    }

    get = (index) => {
        for (var parameter of this.datasets) {
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
