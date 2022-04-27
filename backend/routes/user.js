const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const isAuth = require("../middlewares/isAuth");

router.get("/", isAuth, userController.getUsers);
router.get("/find/:id", isAuth, userController.getById);
router.get("/find/kontraktor/:id", isAuth, userController.getKontraktor);
router.get("/find/client/all", isAuth, userController.getClient);
router.get("/search/mandor", isAuth, userController.searchMandor);
router.put('/update/:id', isAuth, userController.updateUser);
router.delete('/delete/:id', isAuth, userController.delete);

module.exports = router;
