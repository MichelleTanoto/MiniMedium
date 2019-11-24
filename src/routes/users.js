const userRouter = require('express').Router();
let User = require('../models/userModel');

userRouter.route('/').get((req, res,next) => {
  User.find()
    .then(users => res.json(users))
    .catch(error => next(error))
});

userRouter.route('/add').post((req, res, next) => {
  const username = req.body.username;

  const newUser = new User({username});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(error => next(error))
});

module.exports = userRouter;