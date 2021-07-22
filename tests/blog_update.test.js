const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

test('an individual blog can be modified', async () => {
  const blog = await Blog.find({})
  const id = blog[0].id
    
  const updatedBlog = {
    title: 'Velveeta Mac and Cheese',
    author: 'Cecili',
    url: 'www.boogle.com',
    likes: 12
  }
  
  console.log('original item = ', blog[0].author)
  await api
    .put(`/api/blogs/${id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  console.log('changed item =', response.body[0].author)
})


afterAll(() => {
  mongoose.connection.close()
})