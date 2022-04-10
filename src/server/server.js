const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

const download = require("../robots/download");

// Config
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// Routes
// Home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "public", "index.html"));
});
app.get("/es", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "public", "index.html"));
});
app.get("/fr", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "public", "fr.html"));
});
app.get("/en", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "public", "en.html"));
});
// Download
app
  .get("/download/:name", (req, res) => {
    const fileName = req.params.name;
    const directoryPath = path.resolve("public/video");
    res.download(directoryPath + "/" + fileName, fileName, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
  })
  .post("/download", async (req, res) => {
    console.log("starting new download");
    require("../robots/clearFolder").clearFolder("public/video");
    try {
      const { inputVideo, inputIn, inputOut } = req.body;
      const filename = String(Date.now()).replace(".", "").trim();
      const data = {
        url: inputVideo,
        from: inputIn,
        to: inputOut,
        filename: filename,
      };

      await download(data);
      res.json(filename + ".mp4");
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  });

// Run
app.listen(process.env || 3000, () => console.log("server is running"));
