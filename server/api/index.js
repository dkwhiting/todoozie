const { client } = require('../db');
const router = require('express').Router();

router.use('/', async (req, res, next) => {
  try {

  } catch (error) {
    next(error)
  }
})


router.get('/health', async (req, res, next) => {
  try {
    const uptime = process.uptime();

    const {
      rows: [dbConnection],
    } = await client.query(`SELECT NOW();`);

    const currentTime = new Date();

    const lastRestart = new Intl.DateTimeFormat('en', {
      timestyle: 'long',
      dateStyle: 'long',
      timeZone: 'America/New_York',
    }).format(currentTime - uptime * 1000);

    res.send({
      message: 'The api is healthy!',
      uptime,
      dbConnection,
      currentTime,
      lastRestart,
    });
  } catch (error) {
    next(error);
  }
});

//api/users
router.use('/users', require('./users'));

router.use("/*", (error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message,
    error: error.error
  })
})

module.exports = router;