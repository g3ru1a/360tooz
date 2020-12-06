import aws from 'aws-sdk';
import fs from 'fs';
import path from 'path';

aws.config.loadFromPath(path.join(__dirname, '../../config.json'));

export default async (filePath: string, fileName: string) => {

    let key = fileName;
    let bucketName = process.env.AWS_BUCKED_NAME;

    var objectParams = {Bucket: bucketName!, Key: key, Body: 'Hello World!'};
    // Create object upload promise
    var uploadPromise = new aws.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
    uploadPromise.then(
      function(data) {
        console.log("Successfully uploaded data to " + bucketName + "/" + key);
    });

}