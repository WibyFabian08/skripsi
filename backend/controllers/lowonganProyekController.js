const LowonganProyek = require("../models/LowonganProyek");
const fs = require("fs");

exports.getLowongan = async (req, res) => {
  try {
    const list = await LowonganProyek.find();

    if (list.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Get lowongan pekerjaan success",
        data: list,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "data not found",
        data: [],
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.getLowonganById = async (req, res) => {
  try {
    const lowongan = await LowonganProyek.findOne({ _id: req.params.id });

    if (lowongan !== null) {
      return res.status(200).json({
        success: true,
        message: "Get lowongan pekerjaan success",
        data: lowongan,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "data not found",
        data: {},
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.checkLowongan = async (req, res) => {
  try {
    const data = await LowonganProyek.find({ isAvail: true });

    if (data.length > 0) {
      return res.status(200).json({
        success: true,
        isAllowed: false,
        message:
          "Update kriteria belum bisa dilakukan, karena masih ada proyek yang belum dilakukan perhitungan, segera lakukan perhitungan untuk bisa melakukan update kriteria",
      });
    } else {
      return res.status(200).json({
        success: true,
        isAllowed: true,
        message: "Update kriteria boleh dilakukan",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.createLowongan = async (req, res) => {
  try {
    let newLowonganProyek = new LowonganProyek(req.body);

    if (req.file) {
      newLowonganProyek.gambar = req.file.filename;
    }

    if (req.body.itemPekerjaan) {
      let itemArray = req.body.itemPekerjaan;
      if (itemArray.includes(",")) {
        let buffer = itemArray.split(",");
        let itemPost = [];
        buffer.forEach((data) => {
          let item = data.trim();
          itemPost.push(item);
        });
        newLowonganProyek.itemPekerjaan = itemPost;
      } else {
        newLowonganProyek.itemPekerjaan = itemArray;
      }
    }

    await newLowonganProyek.save();

    return res.status(200).json({
      success: true,
      message: "create lowongan success",
      data: newLowonganProyek,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.stack,
    });
  }
};

exports.editLowongan = async (req, res) => {
  try {
    const dataLowongan = await LowonganProyek.findOne({ _id: req.params.id });

    dataLowongan.name = req.body.name || dataLowongan.name;
    dataLowongan.deskripsi = req.body.deskripsi || dataLowongan.deskripsi;
    dataLowongan.lokasi = req.body.lokasi || dataLowongan.lokasi;
    dataLowongan.waktuMulai = req.body.waktuMulai || dataLowongan.waktuMulai;
    dataLowongan.waktuBeres = req.body.waktuBeres || dataLowongan.waktuBeres;
    dataLowongan.volumePekerjaan =
      req.body.volumePekerjaan || dataLowongan.volumePekerjaan;
    dataLowongan.pemilik = req.body.pemilik || dataLowongan.pemilik;
    dataLowongan.isAvail = req.body.isAvail || dataLowongan.isAvail;

    if (req.file) {
      const path = `public/files/${dataLowongan.gambar}`;
      fs.unlink(path, (err) => console.log(err));

      dataLowongan.gambar = req.file.filename;
    }

    if (req.body.itemPekerjaan) {
      let itemArray = req.body.itemPekerjaan;
      if (itemArray.includes(",")) {
        let buffer = itemArray.split(",");
        let itemPost = [];
        buffer.forEach((data) => {
          let item = data.trim();
          itemPost.push(item);
        });
        dataLowongan.itemPekerjaan = itemPost;
      } else {
        dataLowongan.itemPekerjaan = itemArray;
      }
    }

    await dataLowongan.save();

    return res.status(200).json({
      success: true,
      message: "edit lowongan success",
      data: dataLowongan,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.deleteLowongan = async (req, res) => {
  try {
    const data = await LowonganProyek.findOne({ _id: req.params.id });

    const path = `public/files/${data.gambar}`;
    fs.unlink(path, (err) => console.log(err));

    await data.delete();

    return res.status(200).json({
      success: true,
      message: "delete success",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};
