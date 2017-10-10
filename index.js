const childProcess = require("child_process");
const equals = require('array-equal');
const os = require('os');
const processWindows = require ("node-process-windows");
console.log('You are running on ', os.platform()); // 'win32'


let startedApps = [];
let knownApps = [];

function openApp(applicationName) {
    let command = knownApps.find((elem)=>{
        return elem.name === applicationName;
    });

    //isOpen ? winOS ? focusWin

    let process = childProcess.spawn(command.path, command.parameters)
    let appRecord = {
      name: applicationName,
      parameters: command.parameters,
      //options: [],
      process: process 
    }
    startedApps.push(appRecord);
}

function knowApp(applicationName, path, parameters){
    let app = {
        name: applicationName,
        path: path,
        parameters: parameters
    } 
    knownApps.push(app);
}

function isRunning(applicationName) {
    let process = startedApps.find((elem)=>{
        return elem.name === applicationName;
    });
    return process !== undefined;
}

function getPid(applicationName) {
    let data = startedApps.find((elem)=>{
        return elem.name === applicationName;
    });
    return data.process.pid;
}

function fucusWindow(applicationName) {
    if (os.platform()==='win32') {
        let pid = get(applicationName);
        processWindows.focusWindow(pid);
    }
}

//test

let appName = 'nw-loader-google'
let path = '/home/alejandro/Dev/nw-loader/build/nw-loader/linux64/nw-loader'
let parameter = ['--url','http://www.google.com']
knowApp(appName,path,parameter)
console.log(isRunning('nw-loader-google'))

setTimeout(
    function () {
        openApp('nw-loader-google')
      }, 4000);

setTimeout(function () {
  console.log(isRunning('nw-loader-google'))
}, 5000);

setTimeout(function () {
  console.log(getPid('nw-loader-google'))
}, 9000);

setTimeout(finish, 12000);
function finish() {
  console.log('finish')
}

setTimeout(function(){ 
    //childProcess.spawn('/home/alejandro/Dev/nw-loader/build/nw-loader/linux64/nw-loader', ["--url","http://www.google.com"], ["pid"])
 }, 1000);
