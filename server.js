const express = require('express');
const bonjour = require('bonjour')();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

let devices = [];

// Discover all available services
bonjour.find({}, (service) => {
    const device = {
        name: service.name,
        type: service.type,
        port: service.port,
        address: service.referer.address
    };
    devices.push(device);
});

app.get('/devices', (req, res) => {
    res.json(devices);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
