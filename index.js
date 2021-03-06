require('dotenv').config()
const express = require("express");
const { getScreenshot } = require("./screenshotHelper");
const app = express();
const port = process.env.PORT || 5001;
console.log(process.env)

app.get("/", (req, res) => {
  const { url } = req.query;
  console.log({ url });
  getScreenshot(url)
    .then((imageBuffer) => {
      res.set("Content-Type", "image/jpeg");
      res.status(200).send(imageBuffer);
    })
    .catch((err) => {
      console.log({ err });
      res.status(500).send(err);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
