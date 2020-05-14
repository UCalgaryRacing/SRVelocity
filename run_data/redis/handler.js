const redis = require('redis')
const dump = require('redis-dump');
const objectsToCSV = require('objects-to-csv') 

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

writeCSVFromRedis()


//Takes the SET operations on the redis db and converts them into a csv
function writeCSVFromRedis() {
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
            console.log(result)
            //Takes the command dump string and transforms it into a list of json objects. Then the list is transformed to a list of javascript objects.
            result = result.replace(/[^}]+(\'|$)/g, '')
            result = result.replace(/}/g, '},')
            result = '[' + result.slice(0, -1) + ']'
    
            var objs = JSON.parse(result)

            //Writes the objects into a csv where the columns are in alphabetical order
            new objectsToCSV(objs).toDisk('./test.csv', { allColumns: true })
        })
}



function addData(data) {
    client.set('content-' + event.ID, event.content, (err, reply) => {
            if (err) {
                console.log("Could not set content when playing event: \n\n" + event)
            }
        })

    }


module.exports = addData

// id: [children]
// content-id: "content"
