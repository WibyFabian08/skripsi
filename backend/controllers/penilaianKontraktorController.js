const PenilaianKontraktor = require("../models/PenilaianKontraktor");
const PendukungKeputusan = require("../models/PendukungKeputusan");
const CalonKontraktor = require("../models/CalonKontraktor");
const Kriteria = require("../models/Kriteria");

exports.createPenilaian = async (req, res) => {
  try {
    const dataKontraktor = await CalonKontraktor.find({
      lowonganId: req.body.lowonganId,
    });

    let dataKriteria = {};

    dataKontraktor.forEach((data) => {
      dataKriteria = {
        ...data.lampiran,
      };
    });

    for (key in dataKriteria) {
      dataKriteria[key] = [];

      dataKontraktor.forEach((data) => {
        dataKriteria[key].push(data.lampiran[key]);
      });
    }

    const median = (arr) => {
      const mid = Math.floor(arr.length / 2),
        nums = [...arr].sort((a, b) => a - b);
      return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    };

    for (key in dataKriteria) {
      let bufferMax = 0;
      let bufferMin = 0;

      let bufferMedian = median(dataKriteria[key]);
      bufferMax = Math.max(...dataKriteria[key]);
      bufferMin = Math.min(...dataKriteria[key]);

      dataKriteria[key] = {
        max: bufferMax,
        min: bufferMin,
        median: bufferMedian,
      };
    }

    dataKontraktor.forEach((data) => {
      for (key in data.lampiran) {
        if (data.lampiran[key] === dataKriteria[key].max) {
          data.lampiran[key] = 5;
        } else if (data.lampiran[key] === dataKriteria[key].min) {
          data.lampiran[key] = 1;
        } else if (
          data.lampiran[key] > dataKriteria[key].min &&
          data.lampiran[key] < dataKriteria[key].median
        ) {
          data.lampiran[key] = 2;
        } else if (
          data.lampiran[key] < dataKriteria[key].max &&
          data.lampiran[key] > dataKriteria[key].median
        ) {
          data.lampiran[key] = 4;
        } else if (data.lampiran[key] === dataKriteria[key].median) {
          data.lampiran[key] = 3;
        }
      }
    });

    let dataPenilaian = [];

    dataKontraktor.forEach((data) => {
      dataPenilaian.push({
        lowonganId: data.lowonganId,
        kontraktorId: data.kontraktorId,
        penilaian: data.lampiran,
      });
    });

    await PenilaianKontraktor.insertMany(dataPenilaian);

    return res.status(200).json({
      success: true,
      message: "Create Penilaian Success",
      // dataKontraktor
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.getPenilaianByLowonganId = async (req, res) => {
  try {
    const data = await PenilaianKontraktor.find({
      lowonganId: req.params.id,
    }).populate({
      path: "kontraktorId",
      select: "fullname",
    });

    return res.status(200).json({
      success: true,
      message: "get data success",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.get = async (req, res) => {
  try {
    const penilaian = await PenilaianKontraktor.findOne({
      mandorId: req.params.id,
    }).populate({ path: "mandorId", select: "fullname" });

    if (!penilaian) {
      return res.status(200).json({
        success: true,
        message: "data not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "get data success",
      data: penilaian,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.penilaian = async (req, res) => {
  try {
    const alternatifKriteria = req.body;
    const kriteria = await Kriteria.find().sort({ createdAt: -1 });
    // const kriteria = [
    //   {
    //     name: "Harga Per Meter",
    //     bobot: 3,
    //     isBenefit: false,
    //     code: "C1",
    //   },
    //   {
    //     name: "Pengalaman",
    //     bobot: 5,
    //     isBenefit: true,
    //     code: "C2",
    //   },
    //   {
    //     name: "Jumlah Project",
    //     bobot: 3,
    //     isBenefit: true,
    //     code: "C3",
    //   },
    //   {
    //     name: "Jumlah Pekerja",
    //     bobot: 2,
    //     isBenefit: true,
    //     code: "C4",
    //   },
    //   {
    //     name: "Sertifikat",
    //     bobot: 3,
    //     isBenefit: true,
    //     code: "C5",
    //   },
    //   {
    //     name: "Peralatan",
    //     bobot: 4,
    //     isBenefit: true,
    //     code: "C6",
    //   },
    //   {
    //     name: "Baca Gambar",
    //     bobot: 4,
    //     isBenefit: true,
    //     code: "C7",
    //   },
    // ];

    let jumlahKriteria = 0;
    kriteria.forEach((data) => {
      return (jumlahKriteria += data.bobot);
    });

    let pangkat = [];
    kriteria.forEach((data) => {
      pangkat.push({
        kriteria: data.kriteria,
        pangkat: (data.bobot / jumlahKriteria) * (data.isBenefit ? 1 : -1),
      });
    });

    let arrayBuffer = [];
    alternatifKriteria.forEach((data) => {
      let buffer = [];
      buffer.push(data.hargaPerMeter);
      buffer.push(data.pengalaman);
      buffer.push(data.jumlahProject);
      buffer.push(data.jumlahPekerja);
      buffer.push(data.sertifikat);
      buffer.push(data.tools);
      buffer.push(data.bacaGambar);

      arrayBuffer.push(buffer);
    });

    let countS = [];
    arrayBuffer.forEach((data, index) => {
      let buffer = 1;
      let name = "";
      for (let i = 0; i < pangkat.length; i++) {
        buffer *= Math.pow(data[i], pangkat[i].pangkat);
      }

      name = alternatifKriteria[index].mandorId.fullname;

      countS.push({
        mandorName: name,
        s: buffer,
      });
    });

    let wj = 0;
    pangkat.forEach((data) => {
      return (wj += data.pangkat);
    });

    let sumS = 0;
    countS.forEach((data) => {
      return (sumS += data.s);
    });

    let countV = [];
    countS.forEach((data, index) => {
      let name = "";
      name = alternatifKriteria[index].mandorId.fullname;
      countV.push({
        mandorName: name,
        v: data.s / sumS,
      });
    });

    let sumV = 0;
    countV.forEach((data) => {
      return (sumV += data.v);
    });

    countV.forEach(async (data) => {
      await PendukungKeputusan.create({
        userId: req.user._id,
        mandorName: data.mandorName,
        nilai: data.v,
      });
    });

    // const dataRekomendasi = await PendukungKeputusan.find({
    //   userId: req.user._id,
    // }).sort({ nilai: -1 });

    console.log("Jumlah kriteria : \n", jumlahKriteria);
    console.log("kriteria : \n", kriteria);
    console.log("Tabel alternatife kriteria : \n", alternatifKriteria);
    console.log("Jumlah bobot kepentingan : \n", wj);
    console.log("array buffer : \n", arrayBuffer);
    console.log("pangkat : \n", pangkat);
    console.log("menghitung S : \n", countS);
    console.log("Total S : \n", sumS);
    console.log("Menghitung V : \n", countV);
    console.log("Total V : \n", sumV);

    return res.status(200).json({
      success: true,
      message: "calculating success",
      // data: dataRekomendasi,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.stack,
    });
  }
};

exports.getResult = async (req, res) => {
  try {
    const dataRekomendasi = await PendukungKeputusan.find({
      userId: req.user._id,
    }).sort({ nilai: -1 });

    return res.status(200).json({
      success: true,
      message: "get data success",
      data: dataRekomendasi,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.stack,
    });
  }
};

exports.resetResult = async (req, res) => {
  try {
    await PendukungKeputusan.deleteMany({
      userId: req.user._id,
    });

    return res.status(200).json({
      success: true,
      message: "deleted",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.stack,
    });
  }
};
