const fs = require('fs');
const child_process = require('child_process')
const exec = child_process.exec
const spawn = child_process.spawn
const path = require('path');
const tinyUrl = require('tinyurl');
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
    let daemonRunning = /daemon is running/.test(dataString);
    if (daemonRunning) {
      console.log('Warning: Daemon already is running in a seperate process! Closing this application will not kill your IPFS Daemon.')
      resolve(daemonRunning);
    }
    let permissionDenied = /cannot acquire lock/.test(dataString);
    if (permissionDenied) {
      alert('Warning: File permission denied. Please install latest version of Go or use "sudo ipfs daemon"')
      resolve(permissionDenied);
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

disperse.makeTinyUrlPromise = function (url) {
  return new Promise((resolve, reject) => {
    if (!/Qm/.test(url)) reject(new Error('invalid hash'));
    if (!/https:\/\/ipfs.io\/ipfs\//.test(url)) url = `https://ipfs.io/ipfs/${url}`;
    tinyUrl.shorten(url, function (res) {
      resolve(res); //Returns a shorter version of http://google.com - http://tinyurl.com/2tx
    });
  });
}

disperse.addPin = function (pinHash) {
  return new Promise((resolve, reject) => {
    exec('ipfs pin add ' + pinHash, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`error in addPin: ${error}`));
      } else {
        resolve(pinHash + " has been added");
      }
    });
  })
}

module.exports = disperse;