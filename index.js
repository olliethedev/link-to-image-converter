const express = require("express");
const { getScreenshot } = require("./screenshotHelper");
const app = express();
const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
  const {url} = req.query;
  console.log({url});
  getScreenshot(url).then(imageBuffer => {
    res.set('Content-Type', 'image/jpeg');
    res.send(imageBuffer);
}).catch(err => {
    console.log(err);
    res.status(500).send(err);
})
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
