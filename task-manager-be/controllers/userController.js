const pool = require("./../config/db");

exports.getUsers = async (req, res) => {
  const [users] = await pool.query("SELECT * FROM user");
  res.status(200).json(users);
};

exports.getUsers = async (req, res) => {
  try {
    let users;
    if (req.user.roleId == 1) {
      [users] = await pool.query(
        "SELECT id,email,name,lastname,department,role FROM user where id != ?",
        [req.user.userId]
      );
    } else {
      res.status(403).json({ message: "user unauthorized to fetch all users" });
    }

    res.status(200).json(users);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
