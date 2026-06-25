const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Please add a slug'],
    unique: true,
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Please add content']
  },
  excerpt: {
    type: String,
    required: [true, 'Please add an excerpt'],
    maxlength: [500, 'Excerpt cannot be more than 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Market Analysis', 'Company News', 'Education', 'Technology', 'Regulation']
  },
  author: {
    name: {
      type: String,
      required: true,
      default: 'KAPSERFX Team'
    },
    role: String,
    avatar: String
  },
  coverImage: {
    type: String,
    required: [true, 'Please add a cover image']
  },
  tags: {
    type: [String],
    default: []
  },
  readTime: {
    type: Number,
    required: true,
    default: 5
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);
