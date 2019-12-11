const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
let User = require('../models/userModel');

userRouter.route('/').get( async (req, res, next) => {
  const users = await User.find({})
  res.json(users);
    // .then(users => res.json(users)) 
    // // .then(users => res.json(users.map(user => user.toJSON())))
    // .catch(error => next(error))
});

userRouter.route('/:id').get((req, res, next) => {
  User.findById(req.params.id)
  .then(user => {
    if (user) {
      res.json(user.toJSON());
    }
    else{
      console.log("fyck");
      res.status(404).end()
    }
  })
  .catch(error => next(error))
})

userRouter.post('/add', async (req, res, next) => {
  try {
    const body = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const newUser = new User({
      username: body.username,
      password: passwordHash
    });
 
  const savedUser = newUser.save()

  res.json('User added!')
} catch(exception){
  next(exception)
}
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