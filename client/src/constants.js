
export default class SensorData {
    static instance = null;
    static sensors =
        fetch('http://localhost:4000/sensor/getSensors/14', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'apikey': 'VQ2SBXW-1N14EQ7-PWX5JBZ-C5S45FA'
            }
        }).then(res => res.json()).then(res => { return res; }).catch(err => { console.log(err) });

    constructor() { }

    getGrouping = async (category) => {
        var sensors = await SensorData.sensors;

    }

    getSensors = async () => {
        var sensors = await SensorData.sensors;
        return sensors;
    }

    static getInstance() {
        if (SensorData.instance == null) {
            SensorData.instance = new SensorData();
        }
        return this.instance;
    }
}

SensorData.getInstance();

//name is either the grouping or the sensor itself, title is what is displayed as the title of the graph
const constGraphTitles = [
    { title: 'RPM', name: 'rpm', units: 'RPM' },
    { title: 'Air To Fuel', name: 'atf', units: '' },
    { title: 'Manifold Air Pressure', name: 'map', units: 'kPa' },
    { title: 'Throttle Position', name: 'tp', units: '%' },
    { title: 'Engine Temperature', name: 'engineTemp', units: '˚C' },
    { title: 'Oil Temperature', name: 'oilTemp', units: '˚C' },
    { title: 'Fuel Temperature', name: 'fuelTemp', units: '˚C' },
    { title: 'Intake Air Temperature', name: 'iat', units: '˚C' },
    { title: 'Oil Pressure', name: 'oilPres', units: 'kPa' },
    { title: 'Barometer', name: 'baro', units: 'kPa' },
    { title: 'Injector Pulse Width', name: 'ipw', units: 'seconds' },
    { title: 'Battery Voltage', name: 'voltage', units: 'V' },
    { title: 'Suspension', name: 'Suspension', units: 'mm' },
    { title: 'Acceleration', name: 'Acceleration', units: 'g' },
    { title: 'Axes', name: 'Axes', units: '˚' },
    { title: 'Speed', name: 'speed', units: 'km/h' },
    { title: 'Distance', name: 'distance', units: 'km' },
    { title: 'Track Map', name: 'Track Map', units: '' },
    { title: 'EGT', name: 'EGT', units: '˚C' },
    { title: 'O2', name: 'o2', units: '' },
    { title: 'Cam Position', name: 'cam', units: '' },
    { title: 'Crank Position', name: 'crank', units: '' },
    { title: 'Neutral Switch', name: 'neutral', units: '' },
    { title: 'Wheel Speeds', name: 'Wheel Speeds', units: 'Kph' },
    { title: 'Brake Pressures', name: 'Brake Pressures', units: 'kPa' },
    { title: 'Rotary Pot', name: 'rotPot', units: '%' }]

//List of all the sensors with their units
const constDataTitles =
{
    rpm: ['RPM', ''],
    atf: ['Air To Fuel', ''],
    map: ['Manifold Air Pressure', '(kPa)'],
    tp: ['Throttle Position', '(%)'],
    engineTemp: ['Engine Temperature', '(˚C)'],
    oilTemp: ['Oil Temperature', '(˚C)'],
    fuelTemp: ['Fuel Temperature', '(˚C)'],
    iat: ['Intake Air Temperature', '(˚C)'],
    oilPres: ['Oil Pressure', '(kPa)'],
    baro: ['Barometer', '(kPa)'],
    ipw: ['Injector Pulse Width', '(s)'],
    voltage: ['Battery Voltage', '(V)'],
    flSuspension: ['Front Left Suspension', '(mm)'],
    frSuspension: ['Front Right Suspension', '(mm)'],
    rlSuspension: ['Rear Left Suspension', '(mm)'],
    rrSuspension: ['Rear Right Suspension', '(mm)'],
    x: ['X Accel', '(g)'],
    y: ['Y Accel', '(g)'],
    z: ['Z Accel', '(g)'],
    roll: ['Roll', '(˚)'],
    pitch: ['Pitch', '(˚)'],
    yaw: ['Yaw', '(˚)'],
    speed: ['Speed', '(km/h)'],
    distance: ['Distance', '(km)'],
    egt1: ['Exhaust Temp 1', '(˚C)'],
    egt2: ['Exhaust Temp 2', '(˚C)'],
    egt3: ['Exhaust Temp 3', '(˚C)'],
    egt4: ['Exhaust Temp 4', '(˚C)'],
    o2: ['O2', ''],
    cam: ['Cam Position', ''],
    crank: ['Crank Position', ''],
    neutral: ['Neutral Switch', ''],
    flSpeed: ['Front Left Speed', '(kph)'],
    frSpeed: ['Front Right Speed', '(kph)'],
    rlSpeed: ['Rear Left Speed', '(kph)'],
    rrSpeed: ['Rear Right Speed', '(kph)'],
    fbrakes: ['Front Brake Pressure', '(kPa)'],
    rbrakes: ['Rear Brake Pressure', '(kPa)'],
    rotPot: ['Rotary Pot', '(%)']
}

//Groups sensors to use in graphs
const sensorGroupings = {
    'Suspension': ['flSuspension', 'frSuspension', 'rlSuspension', 'rrSuspension'],
    'Acceleration': ['x', 'y', 'z'],
    'Axes': ['roll', 'pitch', 'yaw'],
    'EGT': ['egt1', 'egt2', 'egt3', 'egt4'],
    'Wheels Speeds': ['flSpeed', 'frSpeed', 'rlSpeed', 'rrSpeed'],
    'Brake Pressures': ['fbrakes', 'rbrakes']
}
