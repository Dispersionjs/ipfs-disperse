const fs = require('fs');
const child_process = require('child_process')
const exec = child_process.exec
const spawn = child_process.spawn
const path = require('path');
const disperse = {};


disperse.startDaemon = function () {
    let daemonCommand = spawn('ipfs', ['daemon']);
    daemonCommand.stdout.on('data', function (data) {
        let dataString = data.toString();
        let result = /Daemon is ready/.test(dataString);
        if (result) {
            console.log('the daemon is running')
        }
    });
    daemonCommand.stderr.on('data', function (data) {
        let dataString = data.toString();
        let result = /daemon is running/.test(dataString);
        if (result) {
            console.log('Warning: Daemon already is running in a seperate process! Closing this application will not kill your IPFS Daemon.')
        }
    })
}


disperse.ipfsAddPromise = function (file) {
    return new Promise((resolve, reject) => {
        exec(`ipfs add '${file}'`, (error, stdout, stderr) => {
            if (error) {
                reject(new Error(`error in ipfsAddPromise: ${error}`));
            } else {
                let hashObj = disperse.makeHashObj(stdout);
                resolve(hashObj);
            }
        });
    })
}

disperse.makeHashObj = function (hashStr) {
    var hashArray = hashStr.split(' ');
    var hashObj = {
        [hashArray[1]]: {
            "file": hashArray.slice(2).join(' ').trim(),
            "time": new Date().toUTCString(),
            "url": "https://ipfs.io/ipfs/" + hashArray[1]
        }
    }
    return hashObj;
}

module.exports = disperse;