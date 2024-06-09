import express from "express";
import multer from "multer";
import { getArtikels, getArtikelById, saveArtikel, updateArtikel, deleteArtikel } from "../controllers/ArtikelController.js";

import path from "path";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});
const upload = multer({ storage });

const routerArtikel = express.Router();
routerArtikel.get("/artikels", getArtikels);
routerArtikel.get("/artikels/:id", getArtikelById);
routerArtikel.post("/artikels", upload.single("file"), saveArtikel);
routerArtikel.patch("/artikels/:id", upload.single("file"), updateArtikel);
routerArtikel.delete("/artikels/:id", deleteArtikel);

export default routerArtikel;
