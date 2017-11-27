const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
  res.render('index', {title : 'Express'});
})

module.exports = router;
/*
const errCreate = {code: 400, message: 'error in creating '}
const validErr = {code: 400, message: 'validating error '}
const idErr = {code: 400, message: 'Where is id?'}
const invId = {code: 400, message: 'invalid id'}
const invBirth = {code: 400, message: 'invalid birth'}
*/






