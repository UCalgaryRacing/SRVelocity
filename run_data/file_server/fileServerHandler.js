const AWS = require('aws-sdk');
const { ACCESS_KEY, SECRET_KEY, REGION, BUCKET_NAME } = require('./fileServerEnv')

AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
    region: 'eu-west-2'
  });


// Create S3 service object
const s3 = new AWS.S3();


function viewFiles(res) {
    var getParams = {
        Bucket: BUCKET_NAME
    }

    var allKeys = []

    getAllFiles()

    function getAllFiles(token) {
        if(token) getParams.ContinuationToken = token;

        s3.listObjectsV2(getParams, function (err, data) {
            if (err) {
                console.log(err)
                res.sendStatus(500)
            }
            allKeys = allKeys.concat(data.Contents)

            if(data.IsTruncated)
                getAllKeys(data.NextContinuationToken);
            else
                onlyKeys = []
                allKeys.map( entry => {
                    onlyKeys.push(entry.Key)
                })
                res.send(onlyKeys)
        })
    }
}

function downloadFile(res, filename) {
    var downloadParams = {
        Bucket: BUCKET_NAME,
        Key: filename
    }

    s3.getObject(downloadParams, (err, data) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
        }
        
        res.attachment(downloadParams.Key)

        s3.getObject(downloadParams)
            .createReadStream()
            .pipe(res);
    })

}

function renameFile(res, oldFilename, newFilename) {
    var copyParams = {
        CopySource: `${BUCKET_NAME}/${oldFilename}`, 
        Bucket: BUCKET_NAME,
        Key: newFilename
    }

    // Copy the object to a new location
    s3.copyObject(copyParams, (err) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
            return
        }

        deleteFile(res, oldFilename)
    })
}

function deleteFile(res, filename) {
    var deleteParams = {
        Bucket: BUCKET_NAME,
        Key: filename
    }

    s3.deleteObject(deleteParams, err => {
        if(err) {
            res.sendStatus(500)
            console.log(err)
            return
        }

        res.sendStatus(200)
    })
}

function uploadCSV(filename, fileContents) {
    var uploadParams = {
        Bucket: BUCKET_NAME,
        Key: filename, 
        Body: fileContents}
    
    
    s3.upload(uploadParams, function (err, data) {
        if (err) {
            console.log("Error", err)
        } 
        if (data) {
            console.log("Upload Success", data.Location)
        }
    });
}


module.exports = { uploadCSV, viewFiles, downloadFile, renameFile, deleteFile }
