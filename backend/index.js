const http = require("http");
const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const kontraktorGalleryRoute = require("./routes/kontraktorGallery");
const landingPageRoute = require("./routes/landingPage");
const kinerjaKontraktorRoute = require("./routes/kinerjaKontraktor");
const penilaianKontraktorRoute = require("./routes/penilaianKontraktor");
const kriteriaRoute = require("./routes/kriteria");
const lowonganProyekRoute = require("./routes/lowonganProyek");
const calonKontraktorRoute = require("./routes/calonKontraktor");
const formInputRoute = require('./routes/formInput')
const normalisasiRoute = require('./routes/normalisasi')

const port = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);

// mengatur penyimpanan file dan nama file
const fileStorage = multer.diskStorage({
  // tempat menyimpan fle
  destination: (req, file, cb) => {
    cb(null, "public/files");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

// filter file yang diupload
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ urlencoded: true, limit: "30MB" }));
app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single("image")
);

app.post("/upload", (req, res) => {
  res.status(200).json({ message: "ok", file: req.file });
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/kontraktor-gallery", kontraktorGalleryRoute);
app.use("/api/landing-page", landingPageRoute);
app.use("/api/kinerja-kontraktor", kinerjaKontraktorRoute);
app.use("/api/penilaian-kontraktor", penilaianKontraktorRoute);
app.use("/api/kriteria", kriteriaRoute);
app.use("/api/lowongan", lowonganProyekRoute)
app.use("/api/calon-kontraktor", calonKontraktorRoute)
app.use("/api/form-input", formInputRoute)
app.use("/api/normalisasi", normalisasiRoute)

mongoose.connect("mongodb://localhost:27017/aplikasi-skripsi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  server.listen(port, () => {
    console.log(`server running at port ${port} and database connected`);
  });
});

module.exports = app;
