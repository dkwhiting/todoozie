
const router = require('express').Router();
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

// POST /api/users/login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body
  try {
    res.send()
  } catch (error) {
    next(error)
  }
});

module.exports = router;