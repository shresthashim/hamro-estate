const test = (req, res) => {
  try {
    res.json({
      message: "Hello sexy",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { test };
