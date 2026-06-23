const express = require('express');
const {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');

const router = express.Router();

router
  .route('/')
  .get(getBlogs)
  .post(createBlog);

router
  .route('/:slug')
  .get(getBlogBySlug);

router
  .route('/:id')
  .put(updateBlog)
  .delete(deleteBlog);

module.exports = router;
