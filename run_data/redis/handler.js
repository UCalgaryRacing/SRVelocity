const redis = require('redis')
const dump = require('redis-dump');
const objectsToCSV = require('objects-to-csv')
const { uploadCSV } = require('../file_server/fileServerHandler')

var counter = 0 //using to get never repeating keys when adding data

const { PORT, HOST } = require('./redisEnv')

const client = redis.createClient({
    port: PORT,
    host: HOST
})

client.on('connect', () => {
    console.log('Redis client connected')
})

client.on('error', (err) => {
    console.log('Redis client could NOT connect: \n' + err)
})


//Takes the SET operations on the redis db and converts them into a csv
function writeCSVFromRedis(CSVname) {
    dump({
        // These are default values, you can omit them
        filter: '*',
        port: 6379,
        host: '127.0.0.1'
      },
      function(err, result){
            if(err) {
                console.log(err)
            }
            if (!result) {
                return
            }

            //Takes the command dump string and transforms it into a list of json objects. Then the list is transformed to a list of javascript objects.
            result = result.replace(/[^}]+(\'|$)/g, '')
            result = result.replace(/}/g, '},')
            result = '[' + result.slice(0, -1) + ']'
            var objs = JSON.parse(result)

            objs.sort((a, b) => (a.count > b.count) ? 1 : -1)



            //Writes the objects into a csv where the columns are in alphabetical order
            new objectsToCSV(objs).toString({ allColumns: true })
            .then( fileString => {
                uploadCSV(CSVname + '.csv', fileString)
            })

            //Clears the redis db
            client.flushdb(function (err) {
                if (!err) {
                    return
                }
                console.log('Could not clear db : ' + err);
            });

            counter = 0
        })
}



function addData(data) {
    client.set(++counter, JSON.stringify(data), (err, reply) => {
            if (err) {
                console.log("Could not add data to redis with following error:\n\n" + err)
            }
        })

    }


module.exports = {addData, writeCSVFromRedis}

// key: counter
// value: JSON of sensor data
