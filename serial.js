// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { SerialPort } = require('serialport');

let leftSerialPortName = "";
let rightSerialPortName = "";

let leftSerialPort;
let rightSerialPort;

const ANALOG_MAX =  4096;

// Objects keeping track of current finger flexion values, 0 for fully extended, ANALOG_MAX for fully closed 
let leftHandFingerFlexion = {
    thumb: ANALOG_MAX,
    index: 0,
    middle: 0,
    ring: ANALOG_MAX,
    pinky: ANALOG_MAX
};

let rightHandFingerFlexion = {
    thumb: 0,
    index: 0,
    middle: ANALOG_MAX,
    ring: ANALOG_MAX,
    pinky: 0
};

let string = "";

function updateFingerFlexion(hand) {
  if(hand == "L"){
    leftHandFingerFlexion.index = parseInt(string.slice(string.indexOf("B") + 1));
    leftHandFingerFlexion.thumb = parseInt(string.slice(string.indexOf("A") + 1));
    leftHandFingerFlexion.middle = parseInt(string.slice(string.indexOf("C") + 1));
    leftHandFingerFlexion.ring = parseInt(string.slice(string.indexOf("D") + 1));
    leftHandFingerFlexion.pinky = parseInt(string.slice(string.indexOf("E") + 1));
  } else {
    rightHandFingerFlexion.index = parseInt(string.slice(string.indexOf("B") + 1));
    rightHandFingerFlexion.thumb = parseInt(string.slice(string.indexOf("A") + 1));
    rightHandFingerFlexion.middle = parseInt(string.slice(string.indexOf("C") + 1));
    rightHandFingerFlexion.ring = parseInt(string.slice(string.indexOf("D") + 1));
    rightHandFingerFlexion.pinky = parseInt(string.slice(string.indexOf("E") + 1));
  }
}

function decodeFlexion(data,hand) {
  data = data.toString();
  
  if(data.includes("\n")){
    string += data.slice(0, data.indexOf("\n"));
    updateFingerFlexion(hand);
    string = data.slice(data.indexOf("\n") + 1);
  } else {
    string += data;
  }
}

const leftSerialErrorElement = document.getElementById("leftSerialError");
const rightSerialErrorElement = document.getElementById("rightSerialError");

document.getElementById("savePorts").addEventListener("click", async () => {  
  leftSerialErrorElement.style.display = "none";
  rightSerialErrorElement.style.display = "none";
  
  if(rightSerialPort) {
    await rightSerialPort.close();
    console.log("closing rightSerialPort");
    rightSerialPort = null;
  };
  
  if(leftSerialPort) {
    await leftSerialPort.close();
    console.log("closing leftSerialPort");
    leftSerialPort = null;
  }
  
  leftSerialPortName = document.getElementById("leftPort").value;
  rightSerialPortName = document.getElementById("rightPort").value;
});


function handlePortError(err, hand) {
  const serialErrorElement = hand == "L" ? leftSerialErrorElement : rightSerialErrorElement;
  serialErrorElement.style.display = "block";
  serialErrorElement.textContent =  err;
}

function getPorts() {
  console.log("getting ports");
  if(!leftSerialPort && leftSerialPortName) {
    leftSerialPort = new SerialPort({
      path: leftSerialPortName,
      baudRate: 115200,
    }, (err) => handlePortError(err, "L"));
    if(leftSerialPort) leftSerialPort.on('data', (data) => decodeFlexion(data, 'L'));
  }
  
  if(!rightSerialPort && rightSerialPortName) {
    rightSerialPort = new SerialPort({
      path: rightSerialPortName,
      baudRate: 115200,
    }, (err) => handlePortError(err, "R"));
    if(rightSerialPort) rightSerialPort.on('data', (data) => decodeFlexion(data, 'R'));
  }
  
  console.log(leftSerialPort);
  console.log(rightSerialPort);

  setTimeout(getPorts, 2000);
}


// Set a timeout that will check for new serialPorts every 2 seconds.
// This timeout reschedules itself.
setTimeout(getPorts, 2000);
