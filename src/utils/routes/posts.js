const postRouter = require('express').Router()
const Post = require('../models/postModel') // allow mongoose functionality

postRouter.get('/posts', (request, response) => {
    Post.find({}).then(posts => {
      response.json(posts.map(post => post.toJSON()))
    })
  })
  
  postRouter.get('/posts/:id', (request, response, next) => {
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
  
  postRouter.post('/posts', (request, response, next) => {
    const body = request.body
  
    const post = new Post({
      content: body.content,
      date: new Date(),
    })
  
    post.save()
      .then(savedPost => {
        response.json(savedPost.toJSON())
      })
      .catch(error => next(error))
  })
  
  postRouter.delete('/posts/:id', (request, response, next) => {
    Post.findByIdAndRemove(request.params.id)
      .then(() => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })
  
  postRouter.put('/posts/:id', (request, response, next) => {
    const body = request.body
  
    const note = {
      content: body.content,
      important: body.important,
    }
  
    Post.findByIdAndUpdate(request.params.id, note, { new: true })
      .then(updatedNote => {
        response.json(updatedNote.toJSON())
      })
      .catch(error => next(error))
  })

module.exports = postRouter