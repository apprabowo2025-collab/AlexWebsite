// controllers/pageController.js

const musicModel = require("../models/musicModel");
const musicCreditModel = require("../models/creditModel")
const { analyzeFeedback } = require("../services/aiService");


exports.getHomePage = (req, res) => {
  const music = musicModel.getAllMusic();
  const musicCredits = musicCreditModel.getAllMusicCredits();

  res.render("index", {
    title: "Home",
    music,
    musicCredits
  });
};

exports.getMusicPage = (req, res) => {
  const music = musicModel.getAllMusic();

  res.render("music", {
    title: "Music",
    music
  });
};

exports.getCoachingPage = (req, res) => {
  res.render("coaching", {
    title: "Artist Business Coaching"
  });
};

exports.getContactPage = (req, res) => {
  res.render("contact", {
    title: "Contact"
  });
};

exports.analysisanalyzeCustomerFeedback = async (req, res) => {
  const feedback = req.body.feedback;
  const analysis = await analyzeFeedback(feedback);

  res.render("results", { feedback, analysis });
};

