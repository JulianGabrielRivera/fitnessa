const router = require('express').Router();
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');
const nodemailer = require('nodemailer');

// careful naming these, they cant be the same, if you want to use calculators for both you must use .hbs on the render
router.get('/calculators', (req, res, next) => {
  res.render('calculators.hbs');
});

// router.post('/contact', (req, res, next) => {
//   let { userEmail, userSubject, message } = req.body;
//   console.log(req.body);
//   let transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: 'juliangabrielriveradev@gmail.com',
//       pass: 'fjemoeeqcxhcanjq',
//     },
//   });

//   transporter
//     .sendMail({
//       from: `"${userEmail} " <myawesome@project.com>`,
//       to: userEmail,
//       subject: userSubject,
//       text: message,
//       html: `<b>${message}</b>`,
//     })
//     .then((info) => {
//       res.redirect('/home');
//     })
//     .catch((error) => console.log(error));
// });
module.exports = router;
