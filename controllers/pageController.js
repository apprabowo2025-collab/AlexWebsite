// controllers/pageController.js

const musicModel = require("../models/musicModel");

exports.getHomePage = (req, res) => {
  const music = musicModel.getAllMusic();

  res.render("index", {
    title: "Home",
    music
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