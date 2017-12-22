var cron = require('node-cron');
var request = require('request');

var task = cron.schedule('* */15 * * * *', function() {
	request('http://localhost:3000/run');
});

task.start();