import { transparentFill } from "@arction/lcjs"

const constGraphTitles = [
    { title: 'RPM', units: 'RPM' },
    { title: 'Air To Fuel', units: '' },
    { title: 'Manifold Air Pressure', units: 'kPa' },
    { title: 'Throttle Position', units: '%' },
    { title: 'Engine Temperature', units: '˚C' },
    { title: 'Oil Temperature', units: '˚C' },
    { title: 'Fuel Temperature', units: '˚C' },
    { title: 'Intake Air Temperature', units: '˚C' },
    { title: 'Oil Pressure', units: 'kPa' },
    { title: 'Barometer', units: 'kPa' },
    { title: 'Injector Pulse Width', units: 'seconds' },
    { title: 'Battery Voltage', units: 'V' },
    { title: 'Suspension', units: 'mm' },
    { title: 'Acceleration', units: 'g' },
    { title: 'Axes', units: '˚' },
    { title: 'Speed', units: 'km/h' },
    { title: 'Distance', units: 'km' },
    { title: 'Track Map', units: '' },
    { title: 'TPS', units: '%' },
    { title: 'EGT', units: '˚C' },
    { title: 'O2', units: '' },
    { title: 'Cam Position', units: '' },
    { title: 'Crank Position', units: '' },
    { title: 'Neutral Switch', units: '' },
    { title: 'Wheel Speeds', units: 'Kph' },
    { title: 'Brake Pressures', units: 'kPa' },
    { title: 'Rotary Pot', units: '%' }]

// tps %
// exhaust temp 4 values (EGT) degree C
// o2 NA
// cam position NA
// crank position NA
// neutral switch NA
// 4 wheels speeds Kph
// presure transducer 2 sensors (Front and Rear Brake Pressure) kPa
// rotary pot %


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
    tps: ['TPS', '(%)'],
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
    rotpot: ['Rotary Pot', '(%)']
}

export { constGraphTitles, constDataTitles }


