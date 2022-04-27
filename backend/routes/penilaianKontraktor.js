const express = require("express");
const router = express.Router();

const penilaianKontraktorController = require("../controllers/penilaianKontraktorController");
const isAuth = require("../middlewares/isAuth");

router.post('/create', penilaianKontraktorController.createPenilaian)
router.get('/find/:id', penilaianKontraktorController.getPenilaianByLowonganId)
router.get("/:id", isAuth, penilaianKontraktorController.get);
router.get("/result/final", isAuth, penilaianKontraktorController.getResult);
router.post("/penilaian", isAuth, penilaianKontraktorController.penilaian);
router.delete("/penilaian/delete", isAuth, penilaianKontraktorController.resetResult);

module.exports = router;
