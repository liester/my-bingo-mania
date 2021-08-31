const path = require('path');
const axios = require('axios');
const cors = require('cors');
const express = require('express');
const app = express();

const { Server } = require("socket.io");


const PORT = process.env.PORT || 5000;

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
app.use(cors());

app.get('/jobs', async (req, res) => {
    try {
        // let { description = '', full_time, location = '', page = 1 } = req.query;
        //
        // description = description ? encodeURIComponent(description) : '';
        // location = location ? encodeURIComponent(location) : '';
        // full_time = full_time === 'true' ? '&full_time=true' : '';
        // if (page) {
        //   page = parseInt(page);
        //   page = isNaN(page) ? '' : `&page=${page}`;
        // }
        // const query = `https://jobs.github.com/positions.json?description=${description}&location=${location}${full_time}${page}`;
        // const result = await axios.get(query);
        const jobs = [
            {
                id: 1,
                type: "Awesome",
                created_at: new Date(),
                company: "Mind Canary",
                location: "Montana",
                title: "Extra Most Bestest",
                company_logo: "https://dogtime.com/assets/uploads/2016/08/corgi-puppy-6-e1573588370274.jpg",
                index: 99
            }
        ]
        res.send(jobs);
    } catch (error) {
        res.status(400).send('Error while getting list of jobs.Try again later.');
    }
});


// Madness required for client side react router
app.get('/*', (req, res) => {
    console.log("No route found, attempting to return index.html")
    let url = path.join(__dirname, '../build', 'index.html');
    console.log('URL:'+url);
    if (!url.startsWith('/app/')) // we're on local windows
        url = url.substring(1);
    res.sendFile(url);
});

const server = app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});
app.post("/message", (request, response) => {
    io.emit('chat message', 'hello hello')
    response.send('message emitted')
})




io.on('connection', (socket) => {
    console.log('a user connected');
});


