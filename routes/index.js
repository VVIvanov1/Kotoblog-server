const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const res = require('express/lib/response');
const { Schema } = mongoose;


let connectionString = process.env.MONGOOSE_CONNECTION;
mongoose.connect(connectionString)



function checkCookie(req, res, next) {
  let expiration = new Date()
  expiration.setDate(expiration.getDate() + 365 * 3)
  let id = uuidv4()
  if (req.cookies.kblg_usr == null) {
    res.cookie(`kblg_usr`, id, {

      expires: expiration,
      secure: true,
      httpOnly: true,
      sameSite: 'lax'
    });

  }
  next()
}


function renderLike(req, res, next) {
  res.render('index', { title: 'Liker tool' })
}



router.get('/art-about-cats', checkCookie, renderLike)

router.get('/art-about-cats-2', checkCookie, renderLike)




module.exports = router;
