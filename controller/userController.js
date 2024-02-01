/* ============== Admin Login ==============*/
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  let isAdmin = false;

  try {
    const aemail = await process.env.ADMIN_EMAIL;
    const apassword = await process.env.ADMIN_PASSWORD;

    if (email === aemail && password === apassword) {
      isAdmin = true;
    } else {
      throw Error("You are not an admin!");
    }

    res.status(200).json({
      message: "Admin login successfully",
      isAdmin,
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
    });
  }
};
