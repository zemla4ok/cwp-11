const express = require('express');
const router = express.Router();
let actors = require('../../actors.json');

const errCreate = {code: 400, message: 'error in creating '}
const validErr = {code: 400, message: 'validating error '}
const idErr = {code: 400, message: 'Where is id?'}
const invId = {code: 400, message: 'invalid id'}
const invBirth = {code: 400, message: 'invalid birth'}

router.post('/', (req, res) => {
    let r = req.body;
    let obj = {};
    obj.id = Date.now();
    if(!r.name || ! r.birth || !r.films || !r.liked || !r.photo){
      res.json(errCreate);
      return;
    }
    let flag = true;
    obj.name = r.name;
    obj.budget = parseInt(r.budget) <= 0 ? flag = false : r.budget;
    obj.liked = parseInt(r.liked) < 0 ? flag = false : r.liked;
    obj.photo = r.photo;
    if(!validDate(r.birth)){
      res.json(invBirth);
      return;
    }
    obj.birth = r.birth;
    if(!flag){
      res.json(validErr);
      return;
    }
    actors.push(obj);
    res.json(obj);
  })

  function validDate(date){
    let d = date.split('.');
    if(parseInt(d[0]) > 31)
      return false;
    if(parseInt(d[1]) > 12)
      return false;
    if(d[2].length > 4 || parseInt(d[2]) > 2017)
      return false;
    return true;
  }

module.exports = router;