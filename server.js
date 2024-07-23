const express = require("express");
const ShortUrl = require("./models/short");
const app = express();
const connect = require("./Db/db");

connect()
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.render('index', { shortUrls: shortUrls })
})

app.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});

app.get('/:shortUrl', async (req,res) => {
  const url = req.params.shortUrl
  const shortUrl = await ShortUrl.findOne({short: url})

  if(shortUrl == null) return res.status(404).json({message:'Url Not found'})
    shortUrl.clicks++
    shortUrl.save()
    res.redirect(shortUrl.full)
})

const port = 5000;
app.listen(port, () => {
  console.log("connected to the server");
});
