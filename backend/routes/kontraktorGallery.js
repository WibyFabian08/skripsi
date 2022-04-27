const express = require("express");
const router = express.Router();

const kontraktorGalleryController = require("../controllers/kontraktorGalleryController");
const isAuth = require("../middlewares/isAuth");

router.get("/", isAuth, kontraktorGalleryController.getAll);
router.get("/get", isAuth, kontraktorGalleryController.getAllImages);
router.get("/find/:id", isAuth, kontraktorGalleryController.getById);
router.post("/create", isAuth, kontraktorGalleryController.create);
router.delete("/delete/:id", isAuth, kontraktorGalleryController.delete);

module.exports = router;
