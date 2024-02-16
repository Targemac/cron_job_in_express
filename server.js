const express = require("express");
const app = express();
const axios = require("axios");
const cron = require("node-cron");

const PORT = process.env.PORT || 5000;

let tempDB = [];

async function getWeatherData(lat, long) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}`;
    const response = await axios.get(url);
    const data = response?.data;
    console.log(data);
    tempDB.push(data);
  } catch (error) {
    console.log(error);
  }
}

// run job after every 5min
cron.schedule(`*/5 * * * * *`, async () => {
  // Get weather data for Berlin and store it in the DB
  //   console.log("cron job");
  //   await getWeatherData(52.52437, 13.41053);
});


app.get("/weather", (req, res) => {
  res.status(200).send(tempDB);
});

app.get("/today-event", (req, res) => {
  res.status(200).send(tempDB);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
