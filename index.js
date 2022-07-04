const express = require("express");
const { getScreenshot } = require("./screenshotHelper");
const app = express();
const port = process.env.PORT || 5001;

app.get("/", async (req, res) => {
  console.log("get /");
  const {url} = req.query;
  try {
    const buffer = await getScreenshot(url);
    res.set("Content-Type", "image");
    res.send(buffer);
  } catch (error) {
    console.log(error);
    res.code(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
