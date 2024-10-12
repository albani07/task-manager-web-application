const pool = require("./../config/db");

exports.getMyProfile = async (req, res) => {
  let user;
  try {
    [user] = await pool.query(
      "SELECT email,name,lastname,department FROM user WHERE id = ?",
      [req.user.userId]
    );
  } catch {
    return res.status(500).json({ message: "Error fetching user data" });
  }

  res.status(200).json(user[0]);
};

exports.updateProfile = async (req, res) => {
  const { name, lastname, department } = req.body;

  if (!name) {
    return res.status(400).json({ message: "name is not provided" });
  }

  try {
    const [result] = await pool.query(
      "UPDATE user SET name = ?, lastname = ?, department = ? WHERE id = ?",
      [name, lastname, department, req.user.userId]
    );

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updatePassword = async (req, res) => {
  const { oldPassword, password, confirmPassword } = req.body;

  if (
    !oldPassword ||
    !password ||
    !confirmPassword ||
    password != confirmPassword
  ) {
    return res.status(400).json({ message: "input data is not valid" });
  }

  try {
    const [user] = await pool.query("SELECT * FROM user WHERE id = ?", [
      req.user.userId,
    ]);

    if (user[0].password != oldPassword) {
      return res.status(400).json({ message: "old password is wrong" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "UPDATE user SET password = ? WHERE id = ?",
      [passwordHash, req.user.userId]
    );

    res.status(200).json({ message: "password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
