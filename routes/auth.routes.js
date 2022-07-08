const router = require('express').Router();
const User = require('../models/User.model');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const fileUploader = require('../config/cloudinary.config');
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');
const Comment = require('../models/Comment.model');
const axios = require('axios');

router.get('/signup', isLoggedOut, (req, res, next) => {
  axios
    .get('https://wger.de/api/v2/exerciseimage/?limit=19')
    .then((api) => {
      console.log(api.data.results);
      res.render('auth/signup', { api });
    })
    .catch((err) => console.log(err));
});

router.post(
  '/signup',
  isLoggedOut,
  fileUploader.single('profile-image'),
  (req, res, next) => {
    const { email, password, name, time } = req.body;
    console.log(req.body);

    if (!email || !password) {
      const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
      if (!regex.test(password)) {
        res.status(500).render('auth/signup', {
          errorMessage:
            'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.',
        });
        return;
      }

      // reloads the hbs and passes an object on top of that that will display the error message
      res.render('auth/signup', {
        errorMessage:
          ' All fields are mandatory. Please provide an email and password',
      });
      return;
    }

    // hash the pw

    // password then add salty
    bcryptjs.hash(password, 10).then((hashedPassword) => {
      User.create({
        email,
        password: hashedPassword,
        name,
        time,
        image:
          req.file === undefined
            ? 'https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg'
            : req.file.path,
      })
        .then((userInfo) => {
          // console.log('new user', userInfo);
          res.redirect('signup');
        })
        .catch((error) => {
          console.log(error);
          // built in errors from mongoose, then we pass an errormessage containing the error message from mongoose and then handlerbars takes it.
          if (error instanceof mongoose.Error.ValidationError) {
            res
              .status(500)
              .render('auth/signup', { errorMessage: error.message });
            // mongoose db built in errors
          } else if (error.code === 11000) {
            res.status(500).render('auth/signup', {
              errorMessage: 'Email has already been used',
            });
          } else {
            next(error);
          }
        });
    });
  }
);

router.get('/login', isLoggedOut, (req, res, next) => {
  axios
    .get('https://wger.de/api/v2/exerciseimage/?limit=19')
    .then((api) => {
      console.log(api.data.results);
      res.render('auth/login', { api });
    })
    .catch((err) => console.log(err));
});

router.post('/login', isLoggedOut, (req, res, next) => {
  const { userEmail, password } = req.body;
  console.log(req.body);
  // console.log(req.session);
  // console.log(req.session.currentUser);
  if (userEmail === '' || password === '') {
    res.render('auth/login', {
      errorMessage: 'Please enter both, email and password to login',
    });
    return;
  }
  User.findOne({ userEmail })
    .then((userFound) => {
      if (!userFound) {
        res.render('auth/login', {
          errorMessage: 'Email is not registered. Try with other email.',
        });
        return;
      } else if (bcryptjs.compareSync(password, userFound.password)) {
        // whhere is currentuser coming from?

        // we make a key called currentuser and store all of the users data and this makes it possible to use it later.
        req.session['currentUser'] = userFound;
        console.log(req.session.currentUser);
        res.redirect('/myprofile');
        // res.render('users/my-profile', { emailFound });
      } else {
        res.render('auth/login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch((error) => next(error));
});

router.get('/myprofile', isLoggedIn, (req, res, next) => {
  console.log(req.session);
  res.render('users/my-profile', { userInSession: req.session.currentUser });
  // console.log(req.session.currentUser.name);
});

router.get('/users', isLoggedIn, (req, res, next) => {
  User.find()
    .lean()
    .then((userInfoArray) => {
      // console.log(userInfo);
      let userInfo = userInfoArray.map((user) => {
        //  our personal likes array
        // everything happening in if statement

        let myLikesArray = req.session.currentUser.likes;
        console.log(myLikesArray);
        let myLikesArrayStrings = myLikesArray.map((like) => String(like));
        console.log(myLikesArrayStrings, user._id, String(user._id));
        let matchLike = myLikesArrayStrings.includes(String(user._id));
        console.log(matchLike);

        if (matchLike) {
          // match array of user likes to all users
          // we are returning the users with a property of likedme?
          return { ...user, isLiked: true };
        } else {
          return { ...user, isLiked: false };
        }
      });
      console.log(userInfo);
      userInfo = userInfo.filter(
        (user) => String(req.session.currentUser._id) != String(user._id)
      );

      res.render('users/user-profile', { userInfo });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/users/:id/edit', (req, res) => {
  const { id } = req.params;
  // console.log(id);

  User.findById(id)
    .then((userEdit) => {
      console.log(userEdit);
      res.render('users/edit-profile', userEdit);
    })
    .catch((err) => console.log(err));
});

router.post('/users/:id/edit', isLoggedIn, (req, res) => {
  const { id } = req.params;
  const { name, time } = req.body;

  User.findByIdAndUpdate(id, { name, time }, { new: true })
    .then((updatedUserInfo) => {
      // console.log(name);
      //  overwrites current user data, the user who is logged in
      req.session.currentUser = updatedUserInfo;
      res.redirect('/myprofile');
    })
    .catch((err) => {
      console.log(err);
    });
});

//

router.get('/users/:id/comment', (req, res, next) => {
  const { id } = req.params;
  console.log(id);

  User.findById(id)
    // this lets us use whatever is inside userComments
    .populate('userComments')
    .then((userInfo) => {
      // contains our populate
      console.log(userInfo);
      res.render('users/solo-profile', userInfo);
    });
});

router.post('/users/:id/comment', (req, res, next) => {
  const { id } = req.params;
  const author = req.session.currentUser.id;
  const { content } = req.body;
  Comment.create({ author, content })
    .then((newComment) => {
      User.findByIdAndUpdate(
        id,
        { $push: { userComments: newComment._id } },
        { new: true }
      )

        .then(() => {
          User.findByIdAndUpdate(
            author,
            { $push: { myComments: newComment._id } },
            { new: true }
          )
            .then(() => {
              res.redirect(`/users/${id}/comment`);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/like/:id', (req, res, next) => {
  const { id } = req.params;

  User.findByIdAndUpdate(
    req.session.currentUser._id,
    {
      // instead of pushing find by id and remove it find what index its at and remove.
      $push: { likes: id },
    },
    { new: true }
  )
    .then((updatedUser) => {
      req.session.currentUser = updatedUser;
      User.findByIdAndUpdate(id, { $inc: { likedMe: 1 } }, { new: true })
        .then((likedUser) => {
          res.json({ success: true, likedUser });
        })
        .catch((err) => {
          console.log(err);
          res.json({ success: false });
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false });
    });
});
router.post('/unlike/:id', (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  User.findByIdAndUpdate(
    req.session.currentUser._id,

    {
      $pull: { likes: id },
    },
    { new: true }
  )
    .then((updatedUser) => {
      req.session.currentUser = updatedUser;
      User.findByIdAndUpdate(id, { $inc: { likedMe: -1 } }, { new: true })
        .then((likedUser) => {
          res.json({ success: true, likedUser });
        })
        .catch((err) => {
          console.log(err);
          res.json({ success: false });
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false });
    });
});

router.post('/logout', isLoggedIn, (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect('/');
  });
});

//accessing private API
// router.get('/motivation', (req, res, next) => {
//   axios
//     .get('https://exercisedb.p.rapidapi.com/exercises', {
//       headers: {
//         'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
//         'X-RapidAPI-Key': '4c4811e949msh73a6af0cc320281p105381jsn2d3defd13472',
//       },
//     })
//     .then((api) => {
//       console.log(api);
//       res.render('motivation', { api });
//     })
//     .catch((err) => console.log(err));
// });

router.get('/workouts', (req, res, next) => {
  axios
    .get(`${process.env.EXERCISES_API}/exercises?page_1&_limit=500`)
    .then((api) => {
      console.log(api);

      // console.log(api.data.results);
      res.render('workouts.hbs', { api });
    })
    .catch((err) => console.log(err));
});

//accessing private API with key

module.exports = router;
