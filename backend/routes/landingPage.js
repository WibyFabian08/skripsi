const express = require('express');
const router = express.Router();

const landingPageCcntroller = require('../controllers/landingPageController');

router.get('/', landingPageCcntroller.getLandingPageData)

module.exports = router;