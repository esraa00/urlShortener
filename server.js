const express = require("express");
const ShortUrl = require("./models/shortUrl");
const app = express();

require("./database/connectToDatabase");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const shortUrls = await ShortUrl.find();
    res.render("index", { shortUrls });
  } catch (error) {
    res.status(500).send({ status: "failure", response: error });
  }
});

app.post("/shortUrl", async (req, res) => {
  const fullUrl = req.body.fullUrl;
  try {
    const createdShortUrl = await ShortUrl.create({ full: fullUrl });
    res.redirect("/");
  } catch (error) {
    res.status(500).send({ status: "failure", response: error });
  }
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = req.params.shortUrl;
  try {
    const foundShortUrl = await ShortUrl.findOne({ short: shortUrl });
    if (!foundShortUrl)
      res
        .status(404)
        .send({ status: "failure", respose: "short url was not found" });

    foundShortUrl.clicks++;
    foundShortUrl.save();
    res.redirect(foundShortUrl.full);
  } catch (error) {
    res.status(500).send({ status: "failure", response: error });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("server is listening on port 5000");
});
