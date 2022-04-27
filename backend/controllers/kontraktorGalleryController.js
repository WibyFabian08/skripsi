const KontraktorGallery = require("../models/KontraktorGallery");
const fs = require("fs");

exports.getAllImages = async (req, res) => {
  try {
    const perPage = req.query.perPage || 10;
    const currentPage = req.query.currentPage || 1;

    const totalImages = await KontraktorGallery.find().countDocuments();

    const galleries = await KontraktorGallery.find()
      .populate({ path: "mandorId", select: "image fullname phone email" })
      .skip((parseInt(currentPage) - 1) * parseInt(perPage))
      .limit(parseInt(perPage))
      .sort({ createdAt: -1 });

    if (galleries.length < 0) {
      return res.status(200).json({
        success: true,
        message: "galleries empty",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "get galleries success",
      data: galleries,
      currentPage: parseInt(currentPage),
      totalPage: Math.ceil(totalImages / perPage),
      totalImages: totalImages,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const galleries = await KontraktorGallery.find({
      mandorId: req.params.id,
    }).select("image");

    if (galleries.length < 1) {
      return res.status(200).json({
        success: true,
        message: "galleries not found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "get galleries success",
      data: galleries,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const galleries = await KontraktorGallery.find({
      mandorId: req.user._id,
    }).select("image");

    if (galleries.length < 1) {
      return res.status(200).json({
        success: true,
        message: "galleries not found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "get galleries success",
      data: galleries,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.create = async (req, res) => {
  try {
    const gallery = new KontraktorGallery({
      image: req.file.filename,
      mandorId: req.user._id,
    });

    await gallery.save();

    return res.status(200).json({
      success: true,
      message: "add image success",
      data: gallery,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const gallery = await KontraktorGallery.findOne({ _id: req.params.id });

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "gallery not found",
        data: [],
      });
    }

    const path = `public/files/${gallery.image}`;
    fs.unlink(path, (err) => console.log(err));

    await gallery.delete();

    return res.status(200).json({
      success: true,
      message: "delete success",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.stack,
    });
  }
};
