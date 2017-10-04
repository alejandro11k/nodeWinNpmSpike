const express = require('express')
const app = express()
var storage = require ("storage-device-info");
var processWindows = require ("node-process-windows");
//var program = "C:\\Windows\\System32\\calc.exe"
var program = "C:\\Users\\alejandroK\\dev\\nw-loader\\build\\nw-loader\\win64\\nw-loader.exe --url http://www.exo.com.ar"
var cp = require("child_process");
var processName = "nw-loader"
var mainWindowTitle = "EXO S.A. | Soluciones Tecnol�gicas"
//cp.exec(program); // notice this without a callback..
//process.exit(0); // exit this nodejs process

//child_process.exec(cmd,function(error,stdout,stderr){}) 

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
  storage.getPartitionSpace("c:\\", function(error, space) {
	console.dir(space);
  });
  
var processes = processWindows.getProcesses(function(err, processes){
	console.log("no focus")
	processes.forEach(function (p){
		//console.log("pidToString: " + p.pid.toString());
		//console.log("mainWindowTitle: " + p.mainWindowTitle);
		//console.log("processName: " + p.processName); processName: 'Calculator'
		if (p.mainWindowTitle == '')
		  console.log(p)
	});

	console.log("si focus")
	processes.forEach(function (p){
		//console.log("pidToString: " + p.pid.toString());
		//console.log("mainWindowTitle: " + p.mainWindowTitle);
		//console.log("processName: " + p.processName); processName: 'Calculator'
		if (p.mainWindowTitle !== '')
		  console.log(p)
	});
	
	//console.log((getProcess(processes,"Calculator")).pid)
	
	//let found = (getProcess(processes,"ApplicationFrameHost")).pid
   // processWindows.focusWindow(6724);

	if (getProcess(processes, processName, mainWindowTitle) !== undefined) {
	  console.log("found")
		let found = (getProcess(processes,processName, mainWindowTitle)).pid
		console.log(found);
	  processWindows.focusWindow(found);
	} else {
	  console.log("not found")
	  //cp.exec(program);
	  cp.exec(program, function (err, stdout, stderr) {
        if (err) {
			console.error(err);
			return;
		}
		//console.log(stdout);
		process.exit(0);// exit process once it is opened
	})

	}
		//process.exit(0);
	});
		
	//processWindows.focusWindow("Calculator");

function getProcess(processes, processName, mainWindowTitle) {
  return processes.find((elem) => { 
		return elem.processName === processName 
		&& elem.mainWindowTitle === mainWindowTitle })	
}
	
})