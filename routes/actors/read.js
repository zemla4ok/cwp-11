const express = require('express');
const router = express.Router();
let actors = require('../../actors.json');

router.get('/', (req, res) => {
    res.send(actors.find(actor => actor.id == req.query.id));
  })

module.exports = router;