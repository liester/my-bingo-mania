const path = require('path');
const axios = require('axios');
const cors = require('cors');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
app.use(cors());

app.get('/jobs', async (req, res) => {
  try {
    // let { description = '', full_time, location = '', page = 1 } = req.query;

    // description = description ? encodeURIComponent(description) : '';
    // location = location ? encodeURIComponent(location) : '';
    // full_time = full_time === 'true' ? '&full_time=true' : '';
    // if (page) {
    //   page = parseInt(page);
    //   page = isNaN(page) ? '' : `&page=${page}`;
    // }
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

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
