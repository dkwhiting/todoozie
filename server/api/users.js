
const router = require('express').Router();

// POST /api/users/login
router.post("/login", async (req, res, next) => {
  try {
    res.send()
  } catch (error) {
    next(error)
  }
});

module.exports = router;