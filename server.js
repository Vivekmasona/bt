const express = require('express');
const noble = require('noble');
const app = express();
const port = 3000;

app.use(express.static('public'));

let devices = [];

// State change handler
noble.on('stateChange', (state) => {
    if (state === 'poweredOn') {
        noble.startScanning();
    } else {
        noble.stopScanning();
    }
});

// Device discovery handler
noble.on('discover', (peripheral) => {
    const device = {
        name: peripheral.advertisement.localName,
        uuid: peripheral.uuid
    };
    devices.push(device);
});

// Endpoint to get the list of devices
app.get('/devices', (req, res) => {
    res.json(devices);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
