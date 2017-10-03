const express = require('express')
const app = express()
var storage = require ("storage-device-info");
var processWindows = require ("node-process-windows");
var program = "C:\\Windows\\System32\\calc.exe"
var cp = require("child_process");
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
	processes.forEach(function (p){
	console.log("no focus")
		//console.log("pidToString: " + p.pid.toString());
		//console.log("mainWindowTitle: " + p.mainWindowTitle);
		//console.log("processName: " + p.processName); processName: 'Calculator'
		if (p.mainWindowTitle == '')
		  console.log(p)
	});

	processes.forEach(function (p){
		console.log("si focus")
		//console.log("pidToString: " + p.pid.toString());
		//console.log("mainWindowTitle: " + p.mainWindowTitle);
		//console.log("processName: " + p.processName); processName: 'Calculator'
		if (p.mainWindowTitle !== '')
		  console.log(p)
	});
	
	//console.log((getProcess(processes,"Calculator")).pid)
	
	let found = (getProcess(processes,"ApplicationFrameHost")).pid
    processWindows.focusWindow(found);

	if (getProcess(processes,"Calculator") !== undefined) {
	  console.log("found")
	  let found = (getProcess(processes,"Calculator")).pid
	  processWindows.focusWindow(found);
	} else {
	  console.log("not found")
	  //cp.exec(program);
	  cp.exec(program, function (err, stdout, stderr) {
        if (err) {
			console.error(err);
			return;
		}
		console.log(stdout);
		process.exit(0);// exit process once it is opened
	})

	}

		//process.exit(0);
	});
	
	
	//processWindows.focusWindow("Calculator");

	
function getProcess(processes, process) {
  return processes.find((elem) => { return elem.processName === process  }) // && elem.mainWindowTitle !== "" })	
}
	
})