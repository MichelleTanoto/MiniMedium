const postRouter = require('express').Router()
const Post = require('../models/postModel') // allow mongoose functionality

postRouter.get('/', (request, response) => {
    Post.find({})
      .then(posts => {
      response.json(posts.map(post => post.toJSON()))
    })
  })
  
  postRouter.get('/:id', (request, response, next) => {
    Post.findById(request.params.id)
      .then(post => {
        if (post) {
          response.json(post.toJSON())
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  })
  
  postRouter.post('/add', (request, response, next) => {
    const body = request.body

    const post = new Post({
      username: body.username,
      content: body.content,
      category: body.category,
      date: body.date,
    })
  
    post.save()
      .then(savedPost => {
        response.json(savedPost.toJSON())
      })
      .catch(error => next(error))
  })
  
  postRouter.delete('/:id', (request, response, next) => {
    Post.findByIdAndRemove(request.params.id)
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })
  
  postRouter.put('/update/:id', (request, response, next) => {
    const body = request.body
  
    const post = {
      username: body.username,
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