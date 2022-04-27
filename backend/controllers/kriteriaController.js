const Kriteria = require("../models/Kriteria");
const FormInput = require("../models/FormInput");

exports.getAll = async (req, res) => {
  try {
    const kriteria = await Kriteria.find()
      .select("kriteria bobot isBenefit persentaseBobot code")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "get data success",
      data: kriteria,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the serve",
    });
  }
};

exports.create = async (req, res) => {
  try {
    const kriteria = new Kriteria(req.body);
    kriteria.persentaseBobot = kriteria.bobot / 100;
    kriteria.code = kriteria.kriteria.toLowerCase();
    kriteria.code = kriteria.code.replace(/\s/g, "");

    if (req.body.inputType == "input") {
      const formInput = new FormInput({
        kriteriaId: kriteria._id,
        inputName: kriteria.code,
        inputType: req.body.inputType,
        inputDetail: {
          placeholder: req.body.placeholder,
          label: req.body.label,
          type: req.body.type,
        },
        isForAdmin: req.body.isForAdmin,
      });
      await formInput.save();
    } else {
      const values = [
        {
          value: 1,
          string: "Sangat Buruk",
        },
        {
          value: 2,
          string: "Buruk",
        },
        {
          value: 3,
          string: "Agak Baik",
        },
        {
          value: 4,
          string: "Baik",
        },
        {
          value: 5,
          string: "Sangat Baik",
        },
      ];
      const formInput = new FormInput({
        kriteriaId: kriteria._id,
        inputName: kriteria.code,
        inputType: req.body.inputType,
        inputDetail: {
          label: req.body.label,
          option: values,
        },
        isForAdmin: req.body.isForAdmin,
      });
      await formInput.save();
    }

    await kriteria.save();

    return res.status(200).json({
      success: true,
      message: "create kriteria success",
      data: kriteria,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the serve",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const kriteria = await Kriteria.findOne({ _id: req.params.id });
    const formInput = await FormInput.findOne({ kriteriaId: kriteria._id });

    kriteria.kriteria = req.body.kriteria || kriteria.kriteria;
    kriteria.bobot = req.body.bobot || kriteria.bobot;
    kriteria.isBenefit = req.body.isBenefit || kriteria.isBenefit;
    kriteria.persentaseBobot = kriteria.bobot / 100;

    kriteria.code = kriteria.kriteria.toLowerCase();
    kriteria.code = kriteria.code.replace(/\s/g, "");

    console.log(req.body);

    if (req.body.inputType == "input") {
      formInput.inputName = kriteria.code;
      formInput.inputType = req.body.inputType;
      formInput.inputDetail = {
        placeholder: req.body.placeholder,
        label: req.body.label,
        type: req.body.type,
      };
      formInput.isForAdmin = req.body.isForAdmin;

      await formInput.save();
    } else {
      const values = [
        {
          value: 1,
          string: "Sangat Buruk",
        },
        {
          value: 2,
          string: "Buruk",
        },
        {
          value: 3,
          string: "Agak Baik",
        },
        {
          value: 4,
          string: "Baik",
        },
        {
          value: 5,
          string: "Sangat Baik",
        },
      ];

      formInput.inputName = kriteria.code;
      formInput.inputType = req.body.inputType || formInput.inputType;
      formInput.inputDetail = {
        option: values,
        label: req.body.label,
      };
      formInput.isForAdmin = req.body.isForAdmin;

      await formInput.save();
    }

    await kriteria.save();

    return res.status(200).json({
      success: true,
      message: "update kriteria success",
      data: kriteria,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.stack,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const kriteria = await Kriteria.findOne({ _id: req.params.id });
    const formInput = await FormInput.findOne({ kriteriaId: kriteria._id });

    await kriteria.delete();
    await formInput.delete();

    return res.status(200).json({
      success: true,
      message: "delete kriteria success",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the serve",
    });
  }
};
