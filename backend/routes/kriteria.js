const express = require("express");
const router = express.Router();

const kriteriaContoller = require("../controllers/kriteriaController");
const isAuth = require("../middlewares/isAuth");

router.get("/", isAuth, kriteriaContoller.getAll);
router.post("/create", isAuth, kriteriaContoller.create);
router.put("/update/:id", isAuth, kriteriaContoller.update);
router.delete("/delete/:id", isAuth, kriteriaContoller.delete);

module.exports = router;
