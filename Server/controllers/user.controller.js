const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const bcrypt = require('bcrypt')

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = async (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send("ID unknown: " + id);
  }

  try {
    const user = await UserModel.findById(id).select("-password");
    
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.getRandomCollaborator = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");

    const randomIndex = Math.floor(Math.random() * users.length);

    const randomCollaborator = users[randomIndex];

    res.status(200).json(randomCollaborator);
  } catch (error) {
    console.error("Erreur lors de la récupération d'un collaborateur au hasard : ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const { gender, firstname, lastname, email, password, phone, birthdate, city, country, photo, category, isAdmin } = req.body;

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new UserModel({
      gender,
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phone,
      birthdate,
      city,
      country,
      photo,
      category,
      isAdmin
    });

    await user.save();

    const userResponse = { ...user._doc };
    delete userResponse.password;
    res.status(201).json(userResponse);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.updateUser = async (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send("ID unknown: " + id);
  }

  try {
    const { gender, firstname, lastname, email, password, phone, birthdate, city, country, photo, category, isAdmin } = req.body;
    
    let updatedData = { gender, firstname, lastname, email, phone, birthdate, city, country, photo, category, isAdmin };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, { $set: updatedData }, { new: true });

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  // Check if the ID is valid
  if (!ObjectID.isValid(id)) {
    return res.status(400).send("ID unknown: " + id);
  }

  try {
    const deletionResult = await UserModel.findByIdAndDelete(id);

    if (!deletionResult) {
      return res.status(404).send("User not found");
    }

    // Respond with a success message
    res.status(200).json({ message: "User successfully deleted." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("Internal Server Error");
  }
};

