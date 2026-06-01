// routes/pageRoutes.js

const express = require("express");
const router = express.Router();

const pageController = require("../controllers/pageController");

router.get("/", pageController.getHomePage);
router.get("/music", pageController.getMusicPage);
router.get("/coaching", pageController.getCoachingPage);
router.get("/contact", pageController.getContactPage);

module.exports = router;