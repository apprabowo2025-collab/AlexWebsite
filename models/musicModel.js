// models/musicModel.js

const music = require("../data/music.json");

exports.getAllMusic = () => {
  return music;
};