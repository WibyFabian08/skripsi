const express = require("express");
const router = express.Router();

const kinerjaKontraktorController = require("../controllers/kinerjaKontraktorController");
const isAuth = require("../middlewares/isAuth");

router.get("/", isAuth, kinerjaKontraktorController.get);
router.get("/get/:id", isAuth, kinerjaKontraktorController.getById);
router.post("/create", isAuth, kinerjaKontraktorController.create);
router.put("/update", isAuth, kinerjaKontraktorController.update);
router.delete("/delete", isAuth, kinerjaKontraktorController.delete);

module.exports = router;
