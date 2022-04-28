const express = require("express");
const router = express.Router();

const normaliasasiController = require("../controllers/normaliasiController");

router.get("/get/rangking/:id", normaliasasiController.getRangking);
router.get("/get/normalisasi/:id", normaliasasiController.getNormalisasi);
router.get("/get/terpilih/:lowonganId", normaliasasiController.getKontraktorTerpilih);
router.post("/pilih/calon-kontraktor/:lowonganId", normaliasasiController.piliihKontraktor);
router.post("/create", normaliasasiController.createNormalisasi);
router.post("/update/:id", normaliasasiController.updateLowongan);

module.exports = router;
