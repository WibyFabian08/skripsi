const User = require("../models/User");
const KontraktorGallery = require("../models/KontraktorGallery");
const fs = require("fs");

const bcrypt = require("bcryptjs");

exports.getUsers = async (req, res) => {
  try {
    const currentPage = req.query.currentPage || 1;
    const perPage = req.query.perPage || 10;

    const totalUsers = await User.find({ role: { $ne: 1 } }).countDocuments();
    const users = await User.find({
      role: { $ne: 1 },
    })
      .skip((parseInt(currentPage) - 1) * parseInt(perPage))
      .limit(parseInt(perPage))
      .sort({ createdAt: -1 });

    if (users.length > 0) {
      return res.status(200).json({
        success: true,
        message: "success",
        data: users,
        currentPage: parseInt(currentPage),
        totalPage: Math.ceil(totalUsers / perPage),
        totalUsers: totalUsers,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "users not found",
        data: [],
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
      data: [],
    });
  }
};

exports.searchMandor = async (req, res) => {
  try {
    const address = new RegExp(req.query.address, "i");

    const mandor = await User.find({ role: 3, address: address });

    if (mandor.length < 0) {
      return res.status(200).json({
        success: false,
        message: "mandor not found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "search mandor success",
      data: mandor,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
      data: [],
    });
  }
};

exports.getKontraktor = async (req, res) => {
  try {
    const currentPage = req.query.currentPage || 1;
    const perPage = req.query.perPage || 10;

    const totalMandor = await User.find({ role: 3 }).countDocuments();
    const mandor = await User.find({ role: 3 })
      .skip((parseInt(currentPage) - 1) * parseInt(perPage))
      .limit(parseInt(perPage))
      .sort({ createdAt: -1 });

    if (mandor.length > 0) {
      return res.status(200).json({
        success: true,
        message: "success",
        data: mandor,
        currentPage: parseInt(currentPage),
        totalPage: Math.ceil(totalMandor / perPage),
        totalMandor: totalMandor,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "users not found",
        data: [],
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.stack,
      data: [],
    });
  }
};

exports.getClient = async (req, res) => {
  try {
    const currentPage = req.query.currentPage || 1;
    const perPage = req.query.perPage || 10;

    const totalClient = await User.find({ role: 2 }).countDocuments();
    const client = await User.find({ role: 2 })
      .skip((parseInt(currentPage) - 1) * parseInt(perPage))
      .limit(parseInt(perPage))
      .sort({ createdAt: -1 });

    if (client.length > 0) {
      return res.status(200).json({
        success: true,
        message: "success",
        data: client,
        currentPage: parseInt(currentPage),
        totalPage: Math.ceil(totalClient / perPage),
        totalClient: totalClient,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "users not found",
        data: [],
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.stack,
      data: [],
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
        data: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: "success",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
      data: {},
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    let dataUser = await User.findOne({ _id: req.params.id });

    if (!dataUser) {
      return res.status(404).json({
        success: false,
        message: "user not found",
        data: {},
      });
    }

    dataUser.fullname = req.body.fullname || dataUser.fullname;
    dataUser.username = req.body.username || dataUser.username;
    dataUser.email = req.body.email || dataUser.email;
    dataUser.gender = req.body.gender || dataUser.gender;
    dataUser.phone = req.body.phone || dataUser.phone;
    dataUser.address = req.body.address || dataUser.address;
    dataUser.profession = req.body.profession || dataUser.profession;
    dataUser.description = req.body.description || dataUser.description;
    dataUser.role = req.body.role || dataUser.role;

    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      dataUser.password = hashedPassword;
    }

    if (req.file) {
      const path = `public/files/${dataUser.image}`;
      fs.unlink(path, (err) => console.log(err));
      dataUser.image = req.file.filename;
    }

    await dataUser.save();

    return res.status(200).json({
      success: true,
      message: "update success",
      data: dataUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
      data: {},
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const dataUser = await User.findOne({ _id: req.params.id });
    const gallery = await KontraktorGallery.find({ mandorId: req.params.id });

    if (!dataUser) {
      return res.status(404).json({
        success: false,
        message: "user not found",
        data: {},
      });
    }

    const path = `public/files/${dataUser.image}`;
    fs.unlink(path, (err) => console.log(err));

    if (gallery.length > 0) {
      gallery.forEach((data) => {
        const path = `public/files/${data.image}`;
        fs.unlink(path, (err) => console.log(err));
      });

      await KontraktorGallery.deleteMany({mandorId: req.params.id})
    }

    await dataUser.delete();

    return res.status(200).json({
      success: true,
      message: "delete success",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
      data: {},
    });
  }
};
