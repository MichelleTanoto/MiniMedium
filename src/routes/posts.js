const postRouter = require('express').Router()
const User = require('../models/userModel');
const Post = require('../models/postModel'); // allow mongoose functionality

postRouter.get('/', async (request, response) => {
  const post = await Post.find({});
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
  
  postRouter.post('/add', async (request, response, next) => {
    const body = request.body

    const post = new Post({
      username: body.username,
      title: body.title,
      content: body.content,
      category: body.category,
      date: body.date,
    })
    // error handling
    try{
    const savedPost = await post.save();
    response.json(savedPost.toJSON());
    } catch(exception){
      next(exception);
    }
    // post.save()
    //   .then(savedPost => {
    //     response.json(savedPost.toJSON())
    //   })
    //   .catch(error => next(error))
  })
  
  postRouter.delete('/:id', async (request, response, next) => {
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
      username: body.username,
      title: body.title,
      content: body.content,
      category: body.category,
      date: new Date()
    }
  
    Post.findByIdAndUpdate(request.params.id, post, { new: true })
      .then(updatedPost => {
        response.json(updatedPost.toJSON())
      })
      .catch(error => next(error))
  })

module.exports = postRouter