
const router = require('express').Router()

const Note = require('../models/note')
const User = require('../models/user')
const Blog = require('../models/blog')

router.post('/reset', async (req, res) => {
  console.log('RESET START')

  await Note.deleteMany({})
  console.log('NOTES DELETED')

  await Blog.deleteMany({})
  console.log('BLOGS DELETED')

  await User.deleteMany({})
  console.log('USERS DELETED')

  res.status(204).end()

  console.log('RESPONSE SENT')
})

module.exports = router