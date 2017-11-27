const express = require('express');
const router = express.Router();

router.get('*', function (req, res, next) {
     res.sendFile('nophoto.jpg', { root: './public/images'}, function (err) {
        if (err) {
            res.redirect(400,'/');
        }
    });
});

module.exports = router;