const { User } = require("../models/user");
const bcrypt = require("bcrypt");

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    delete user["password"];
    delete user["_id"];
    res.status(200).send({ data: user, message: "Szczegóły konta" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.user._id });
    console.log("User deleted");
    res.status(200).send({ message: "Użytkownik usunięty" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.addIdToDatabase = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    user.ids.push(req.params.id);
    await user.save();

    res.status(200).send({ message: "ID zostało dodane do tablicy" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.removeIdFromDatabase = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: req.user._id });

    user.ids = user.ids.filter((itemId) => itemId !== id);
    await user.save();

    res.status(200).send({ message: "ID zostało usunięte z tablicy" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getSelectedIds = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    const selectedIds = user.ids;

    res.status(200).send({ ids: selectedIds });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};