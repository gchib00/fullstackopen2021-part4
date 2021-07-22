const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
}) 

blogsRouter.delete('/:id/', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
}) 

// eslint-disable-next-line no-unused-vars
blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body
  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  await Blog.findByIdAndUpdate(id, updatedBlog, { new: true })
  response.json(updatedBlog)
  response.status(200).end()
  
})
  
blogsRouter.post('/', (request, response) => {
  logger.error(`request is equal to: ${request}`)
  const blog = new Blog ({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  })
  if (blog.likes == undefined) {
    blog.likes = 0
  }
  if (blog.title == undefined) {
    response.status(400).end('Title was empty')
  } else {
    const addBlog = async () => {
      const result = await blog.save()
      response.status(201).json(result)
    }
    addBlog()
  }
})



module.exports = blogsRouter