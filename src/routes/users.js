const userRouter = require('express').Router();
let User = require('../models/userModel');

userRouter.route('/').get((req, res,next) => {
  User.find({})
    .then(users => res.json(users)) 
    // .then(users => res.json(users.map(user => user.toJSON())))
    .catch(error => next(error))
});

userRouter.post('/add',(req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User({username, password});
 
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(error => next(error))
});

userRouter.put('/update/:id', (request, response, next) => {
  const body = request.body

  const user = {
    username: body.username,
    password: body.password
  }

  User.findByIdAndUpdate(request.params.id, user, { new: true })
    .then(updatedUser => {
      response.json(updatedUser.toJSON())
    })
    .catch(error => next(error))
})

module.exports = userRouter;