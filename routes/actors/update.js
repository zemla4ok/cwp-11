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
    if(!r.id){
      res.json(idErr);
      return;
    }
    let id = parseInt(r.id);
    let ind = actors.findIndex(i => i.id == id);
    if(ind < 0){
      res.json(invId);
      return;
    }
    if(!validDate(r.birth) && r.birth){
      res.json(invBirth);
      return;
    }
    r.name ? actors[ind].name = r.name : null;
    r.birth ? actors[ind].birth = r.birth : null;
    r.films ? actors[ind].films = r.films : null;
    r.liked ? actors[ind].liked = r.liked : null;
    r.photo ? actors[ind].photo = r.photo : null;
    res.json(actors[ind]);
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