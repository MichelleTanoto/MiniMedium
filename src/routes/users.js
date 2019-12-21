const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
let User = require('../models/userModel');
let chatkit = require('../models/chatKitModel')

userRouter.route('/').get( async (req, res, next) => {
  const users = await User.find({}).populate('posts', {title: 1, content: 1, category: 1})
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

userRouter.get('/:id/posts', async (request, response, next) =>{
  try{
    const user = await User.findById(request.params.id).populate('posts', {title: 1, content: 1, category: 1})
    console.log(user);
    if(user){
      // response.json(JSON.stringify(user.posts));
      response.json(user.posts);
    } else {
      response.status(404).end();
    }
    } catch(exception) {
      next(exception);
    }
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
 
  const savedUser = await newUser.save()

  // const chatkitUser = await chatkit
  // .createUser({
  //   id: req.body,
  //   name: req.body
  // })

  // if(chatkitUser){
  //   console.log('chatkit succesful.')
  //   res.json('User added!')
  // } 
} catch(exception){
  if(exception.error === 'services/chatkit/user_already_exists'){
    console.log(`User already exists`)
  } else {
  next(exception)
  }
}
});

userRouter.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({
    userId: req.query.user_id,
  });
  res.status(authData.status).send(authData.body);
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