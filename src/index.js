const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const port = 3000;

const Film = mongoose.model("Film", {
  title: String,
  description: String,
  image_url: String,
  trailer_url: String,
});

app.get("/", async (req, res) => {
  const film = await Film.find();
  return res.send(film);
});

app.delete('/:id', async (req, res) => {
    const film = await Film.findByIdAndDelete(req.params.id);
    return res.send(film);
})

app.put('/:id', async (req, res) => {
    const film = await Film.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description,
      image_url: req.body.image_url,
      trailer_url: req.body.trailer_url,
    }, {
        new: true,
    });
    return res.send(film);
})

app.post("/", async (req, res) => {
  const film = new Film({
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    trailer_url: req.body.trailer_url,
  });
  await film.save();
  return res.send(film);
});

app.listen(port, () => {
  mongoose.connect(
    "mongodb+srv://ViniciusAlves:vinicius10@starwars-api.rf3dtob.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("app running...");
});