var zerorpc = require("zerorpc");
const path = require('path');
const { spawn } = require('child_process');

const pythonConnector = spawn('python3', ['-u', path.join(__dirname, 'face_recog.py'), 'inputFiles/input.mp4', 'inputFiles/ravindra.jpeg']);

pythonConnector.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

pythonConnector.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

pythonConnector.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

var client = new zerorpc.Client();
client.connect("tcp://127.0.0.1:4242");

client.invoke("hello", "World!", function (error, res, more) {
  console.log(res);
});