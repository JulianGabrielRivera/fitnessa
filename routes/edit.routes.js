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
      req.session.currentUser = updatedUserInfo;
      res.redirect('/myprofile');
    })
    .catch((err) => {
      console.log(err);
    });
});
