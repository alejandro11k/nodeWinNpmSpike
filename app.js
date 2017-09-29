const express = require('express')
const app = express()
var storage = require ("storage-device-info");
var processWindows = require ("node-process-windows");

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
		console.log("" + p.pid.toString());
		console.log("" + p.mainWindowTitle);
		console.log("" + p.processName);
		});
	});
	
	processWindows.focusWindow("notepad++");
})