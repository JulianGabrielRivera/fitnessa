const router = require('express').Router();
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');
const nodemailer = require('nodemailer');

router.get('/contact', (req, res, next) => {
  res.render('contact');
});

router.post('/contact', (req, res, next) => {
  let { userEmail, userSubject, message } = req.body;
  console.log(req.body);

  let transporter = nodemailer.createTransport('SMTP', {
    service: 'hotmail',
    auth: {
      user: 'juliangabrielriveradev@hotmail.com',
      pass: 'Yesyes123',
    },
  });

  // let transporter = nodemailer.createTransport({
  //   service: 'hotmail',
  //   auth: {
  //     user: 'juliangabrielriveradev@hotmail.com',
  //     pass: 'Yesyes123',
  //   },
  // });

  transporter
    .sendMail({
      from: userEmail,
      to: 'fitnessathegymapp@gmail.com',
      subject: userSubject,
      text: message,
      html: `<b>${message}</b>`,
    })
    .then((info) => {
      res.redirect('/home');
    })
    .catch((error) => console.log(error));
});
module.exports = router;
