const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
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