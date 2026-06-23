const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('./models/Blog');

dotenv.config();

const blogs = [
  {
    title: 'The Future of Forex Trading in 2024',
    slug: 'future-of-forex-trading-2024',
    content: '<p>The Forex market is evolving rapidly. With the integration of AI and machine learning, traders are finding new ways to analyze data and predict market movements.</p>',
    excerpt: 'Explore the key trends shaping the Forex market in 2024, from AI integration to regulatory changes.',
    category: 'Market Analysis',
    author: { name: 'KAPSERFX Team' },
    coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
    tags: ['Forex', 'Trading', '2024'],
    readTime: 5
  },
  {
    title: 'How to Launch a Forex Brokerage in 3 Days',
    slug: 'launch-forex-brokerage-in-3-days',
    content: '<p>Launching a brokerage doesn’t have to take months. With turnkey solutions, you can go live in just a few days.</p>',
    excerpt: 'Discover how turnkey solutions are revolutionizing the way new Forex brokerages are launched.',
    category: 'Education',
    author: { name: 'KAPSERFX Team' },
    coverImage: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&auto=format&fit=crop&q=80',
    tags: ['Brokerage', 'Turnkey'],
    readTime: 4
  }
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('MongoDB Connected');
  await Blog.deleteMany();
  await Blog.insertMany(blogs);
  console.log('Blogs Seeded');
  process.exit();
}).catch(err => {
  console.log(err);
  process.exit(1);
});
