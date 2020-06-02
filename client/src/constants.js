export default class SensorData {
    static instance = null;
    static sensors =
        fetch('http://localhost:5000/api/pgdb/getSensors', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "accepts":"application/json"
            }
        })
        .then(res => res.json())
        .then(res => { return res; })
        .catch(err => { console.log(err) });

    constructor() { }

  getCategories = async (category) => {
    var sensors = await SensorData.sensors;
    var lookup = {};
    var result = [];
    for (var sensor, i = 0; (sensor = sensors[i++]); ) {
      var category = sensor.category;
      if (!(category in lookup)) {
        lookup[category] = category;
        result.push(category);
      }
    }
    return result;
  };

  getSensors = async () => {
    var sensors = await SensorData.sensors;
    return sensors;
  };

  static getInstance() {
    if (SensorData.instance == null) SensorData.instance = new SensorData();
    return this.instance;
  }
}

SensorData.getInstance().getCategories();
