const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");

const LowonganProyekController = require("../controllers/lowonganProyekController");

router.get("/", isAuth, LowonganProyekController.getLowongan);
router.get("/find/:id", isAuth, LowonganProyekController.getLowonganById);
router.get("/check", isAuth, LowonganProyekController.checkLowongan);
router.post("/create", isAuth, LowonganProyekController.createLowongan);
router.put("/update/:id", isAuth, LowonganProyekController.editLowongan);
router.delete("/delete/:id", isAuth, LowonganProyekController.deleteLowongan);

module.exports = router;
