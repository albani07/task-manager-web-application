const bcrypt = require("bcryptjs");
const pool = require("./../config/db");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const [userExists] = await pool.query(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );

    if (userExists.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    let [result] = await pool.query(
      "insert into user (email, password, name, role) values (?, ?, ?, 2)",
      [email, passwordHash, name]
    );

    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await pool.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user[0].id, roleId: user[0].role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Send the token to the client
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.signout = (req, res) => {
  res.json({ message: "Signout successful" });
};
