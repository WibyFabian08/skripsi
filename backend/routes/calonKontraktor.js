const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");

const calonKontraktorController = require("../controllers/calonKontraktorController");

router.get("/", isAuth, calonKontraktorController.getAll);
router.get("/find/:id", isAuth, calonKontraktorController.getById);
router.get(
  "/find/kontraktor/:kontraktorId",
  isAuth,
  calonKontraktorController.getByKontraktorId
);
router.post("/create", isAuth, calonKontraktorController.create);
router.put("/update/:kontraktorId/:lowonganId", calonKontraktorController.updatePenilaian);
router.delete("/delete/:id", isAuth, calonKontraktorController.delete);

module.exports = router;
