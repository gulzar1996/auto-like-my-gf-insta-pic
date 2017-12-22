const cron = require('node-cron');
const request = require('request');

const task = cron.schedule('* */15 * * * *', () => {
  request('http://localhost:3000/run');
});

task.start();
