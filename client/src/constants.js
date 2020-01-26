const constGraphTitles =  [
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
    { title: 'Track Map', units: '' }]

const constDataTitles = 
    {rpm: ['RPM'],
    atf: ['Air To Fuel'],
    map: ['Manifold Air Pressure', '(kPa)'],
    tp: ['Throttle Position', '(%)'],
    engineTemp: ['Engine Temperature','(˚C)'],
    oilTemp: ['Oil Temperature','(˚C)' ],
    fuelTemp: ['Fuel Temperature', '(˚C)'],
    iat: ['Intake Air Temperature', '(˚C)'],
    oilPres: ['Oil Pressure', '(kPa)'],
    baro: ['Barometer', '(kPa)'],
    ipw: ['Injector Pulse Width', '(s)'],
    voltage: ['Battery Voltage', '(V)'],
    fl: ['Suspension','(mm)', 'Front Left', [0]],
    fr: ['Suspension','(mm)', 'Front Right', [1]],
    rl: ['Suspension','(mm)', 'Rear Left', [2]],
    rr: ['Suspension','(mm)', 'Rear Right', [3]],
    x: ['Acceleration', '(g)', 'X Accel', [0]],
    y: ['Acceleration','(g)', 'Y Accel', [1]],
    z: ['Acceleration','(g)', 'Z Accel', [2]],
    roll: ['Axes', '(˚)', 'Roll', [0]],
    pitch: ['Axes', '(˚)', 'Pitch', [1]],
    yaw: ['Axes', '(˚)', 'Yaw', [2]],
    speed: ['Speed', '(km/h)'],
    distance: ['Distance', '(km)']}

export {constGraphTitles, constDataTitles}


