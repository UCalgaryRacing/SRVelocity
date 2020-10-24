import { GATEWAYSERVERIP } from "./dataServerEnv";

export default class SensorData {
  static instance = null;
  static sensors = fetch("/sensor/vehicle/14", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      apikey: "VQ2SBXW-1N14EQ7-PWX5JBZ-C5S45FA",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });

  constructor() {}

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
