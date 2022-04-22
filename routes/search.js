const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {
  res.render ('search');
});


router.post ('/', (req, res) => {
  console.log (req.body);
  res.send ('responding with a resource');
});


module.exports = router;
