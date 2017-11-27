const express = require('express');
const router = express.Router();
let actors = require('../../actors.json');

const errCreate = {code: 400, message: 'error in creating '}
const validErr = {code: 400, message: 'validating error '}
const idErr = {code: 400, message: 'Where is id?'}
const invId = {code: 400, message: 'invalid id'}
const invBirth = {code: 400, message: 'invalid birth'}

router.post('/', (req, res) => {
    let r= req.body;
    if(!r.id){
      res.json(idErr);
      return;
    }
    let id = parseInt(r.id);
    let index = actors.findIndex(i => i.id == id);
    if(index < 0){
      res.json(invId);
      return;
    }
    actors.splice(index, 1);
    res.json(actors);
  })
  
module.exports = router;