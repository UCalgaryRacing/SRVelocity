import { transparentFill } from "@arction/lcjs"

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


const constDataTitles =
{
    rpm: ['RPM'],
    atf: ['Air To Fuel'],
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
    flSuspension: ['Suspension', '(mm)', 'Front Left Suspension', [0]],
    frSuspension: ['Suspension', '(mm)', 'Front Right Suspension', [1]],
    rlSuspension: ['Suspension', '(mm)', 'Rear Left Suspension', [2]],
    rrSuspension: ['Suspension', '(mm)', 'Rear Right Suspension', [3]],
    x: ['Acceleration', '(g)', 'X Accel', [0]],
    y: ['Acceleration', '(g)', 'Y Accel', [1]],
    z: ['Acceleration', '(g)', 'Z Accel', [2]],
    roll: ['Axes', '(˚)', 'Roll', [0]],
    pitch: ['Axes', '(˚)', 'Pitch', [1]],
    yaw: ['Axes', '(˚)', 'Yaw', [2]],
    speed: ['Speed', '(km/h)'],
    distance: ['Distance', '(km)'],
    egt1: ['EGT', '(˚C)', 'Exhaust Temp 1', [0]],
    egt2: ['EGT', '(˚C)', 'Exhaust Temp 2', [1]],
    egt3: ['EGT', '(˚C)', 'Exhaust Temp 3', [2]],
    egt4: ['EGT', '(˚C)', 'Exhaust Temp 4', [3]],
    o2: ['O2', ''],
    cam: ['Cam Position', ''],
    crank: ['Crank Position', ''],
    neutral: ['Neutral Switch', ''],
    flSpeed: ['Wheel Speeds', '(Kph)', 'Front Left Speed', [0]],
    frSpeed: ['Wheel Speeds', '(Kph)', 'Front Right Speed', [1]],
    rlSpeed: ['Wheel Speeds', '(Kph)', 'Rear Left Speed', [2]],
    rrSpeed: ['Wheel Speeds', '(Kph)', 'Rear Right Speed', [3]],
    fbrakes: ['Brake Pressures', '(kPa)', 'Front Brake Pressure', [0]],
    rbrakes: ['Brake Pressures', '(kPa)', 'Rear Brake Pressure', [1]],
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

export { constGraphTitles, constDataTitles, sensorGroupings }


