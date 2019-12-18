const postRouter = require('express').Router()
const User = require('../models/userModel');
const Post = require('../models/postModel'); // allow mongoose functionality
const jwt = require('jsonwebtoken');

postRouter.get('/', async (request, response) => {
  const post = await Post.find({}).populate('user', {username: 1});
  response.json(post);
    // Post.find({})
    //   .then(posts => {
    //   response.json(posts.map(post => post.toJSON()))
    // })
  })
  
  postRouter.get('/:id', async (request, response, next) => {
    try{
    const post = await Post.findById(request.params.id)
    if(post){
      response.json(post.toJSON());
    } else {
      response.status(404).end();
    }
    } catch(exception) {
      next(exception);
    }
  })

//   const getTokenFrom = req => {
//     const authorisation = req.get('authorization')
//     if(authorisation && authorisation.toLowerCase().startsWith('bearer ')){
//       return authorisation.substring(7);
//   }
//     return null;
// }
  
  postRouter.post('/add', async (request, response, next) => {
    const body = request.body

    // const token = getTokenFrom(request);

    try {
      console.log(request.token);
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if(!request.token || !decodedToken.id){
        return response.status(401).json({ error: 'token missing or invalid'})
      }

    // has to be findOne
    const user = await User.findById(decodedToken.id)

    const post = new Post({
      title: body.title,
      content: body.content,
      category: body.category,
      date: body.date,
      user: user._id,
    })

    // error handling
    const savedPost = await post.save();
    user.posts = await user.posts.concat(savedPost._id);
    await user.save()
    response.json(savedPost.toJSON());
    } catch(exception){
      next(exception);
    }
  })
  
  postRouter.delete('/:id', async (request, response, next) => {
    // delete jsonwebtoken
    try{
    await Post.findByIdAndRemove(request.params.id);
    response.status(204).end();
    } catch(exception){
      next(exception);
    }
    // Post.findByIdAndRemove(request.params.id)
    //   .then(() => {
    //     response.status(204).end()
    //   })
    //   .catch(error => next(error))
  })
  
  postRouter.put('/update/:id', (request, response, next) => {
    const body = request.body
  
    const post = {
      title: body.title,
      content: body.content,
      category: body.category,
      date: new Date(),
      likes: body.likes
    }
  
    Post.findByIdAndUpdate(request.params.id, post, { new: true })
      .then(updatedPost => {
        response.json(updatedPost.toJSON())
      })
      .catch(error => next(error))
  })


module.exports = postRouter