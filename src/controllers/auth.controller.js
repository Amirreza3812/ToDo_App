const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register
exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({ message: "Missing info given" });
    }

    const newUser = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, 8),
    });

    res.send({ message: "User registered successfully!" });
  } catch (err) {
    next(err);
  }
};

// Get user data (called after verifying token)
exports.getUserData = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId); // Sequelize method
    if (!user) return res.status(404).send({ message: "User not found" });

    res.send({ username: user.username });
  } catch (err) {
    next(err);
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid email and password combination.",
      });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid email and password combination.",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, {
      expiresIn: "24h",
    });

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  } catch (err) {
    next(err);
  }
};
