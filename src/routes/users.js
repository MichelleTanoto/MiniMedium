const userRouter = require('express').Router();
let User = require('../models/userModel');

userRouter.route('/').get((req, res) => {
  User.find({})
    .then(users => users.map(user => user.toJSON()))
});

userRouter.route('/:id').get((request, response, next) => {
    User.findById(request.params.id)
      .then(user => {
        if (user) {
          response.json(post.toJSON())
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  })

//   router.route('/:id').get((req, res) => {
//     Exercise.findById(req.params.id)
//       .then(exercise => res.json(exercise))
//       .catch(err => res.status(400).json('Error: ' + err));
//   });
  
userRouter.route('/add').post((req, res, next) => {
  const username = req.body.username;
  const date = Date.parse(req.body.date);

  const newUser = new User({
    username,
    date
  });

  newUser.save()
  .then(() => res.json('Username added'))
  .catch(error => next(error))
});

userRouter.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('Users deleted.').status(204).end())
    .catch(error => next(error))
});

userRouter.route('/update/:id').post((req, res,next) => {
  User.findById(req.params.id)
    .then(user => {
      user.username = req.body.username;
      user.date = Date.parse(req.body.date);

      user.save()
        .then(() => res.json(user.toJSON()))
        .catch(error => next(error))
    })
    .catch(error => next(error))
});

module.exports = userRouter;