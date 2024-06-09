import path from "path";
import Artikel from "../models/ArtikelModel.js";
import fs from "fs";
import express from 'express';
import fileUpload from 'express-fileupload';

export const getArtikels = async (req, res) => {
  try {
    const response = await Artikel.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getArtikelById = async (req, res) => {
  try {
    const response = await Artikel.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const saveArtikel = async (req, res) => {
  console.log(req);
  //   if (req.files === null) return res.status(400).json({ msg: "No file uploaded" });
  const name = req.body.title;
  //   console.log(req.files);
  const file = req.file;
  const fileSize = file.size;
  //   const ext = path.extname(file.name);
  const fileName = file.filename;
  const url = `${req.protocol}://${req.get("host")}/image/${fileName}`;
  const allowedType = [".png", ".jpeg", ".jpg"];

  //   if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "invalid image" });
  if (fileSize > 5000000) return res.status(422).json({ msg: "image must be less than 5MB" });

  await Artikel.create({ name: name, img: url, url: url });
  res.status(201).json({ msg: "Artikel berhasil dibuat" });
};
export const updateArtikel = async (req, res) => {
  const artikel = await Artikel.findOne({
    where: {
        id: req.params.id
    }
  });

  if (!artikel) return res.status(404).json({ msg: "No Data Found" });

  let fileName = "";
  if (!req.files || Object.keys(req.files).length === 0) {
    fileName = artikel.img; 
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${artikel.img}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
        if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const name = req.body.title;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Artikel.update({ name: name, img: fileName, url: url }, { 
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ msg: "Artikel Updated Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};



export const deleteArtikel = async (req, res) => {
  const artikel = await Artikel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!artikel) return res.status(404).json({ msg: "No Data Found" });
  try {
    // const filepath = `./public/images/${artikel.image}`;
    // fs.unlinkSync(filepath);
    await Artikel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Artikel berhasil dihapus!" });
  } catch (error) {
    console.log(error.message);
  }
};
