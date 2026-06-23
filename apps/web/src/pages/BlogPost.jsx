import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { Helmet } from 'react-helmet';
import OptimizedImage from '../components/OptimizedImage';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${slug}`);
        const data = await response.json();
        if (data.success) {
          setPost(data.data);
        } else {
          setError('Failed to fetch blog post');
        }
      } catch (err) {
        setError('Server error while fetching blog post');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#080B10] text-gray-900 dark:text-white flex flex-col items-center justify-center transition-colors duration-500">
        <h1 className="text-4xl font-bold mb-4">Loading Post...</h1>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#080B10] text-gray-900 dark:text-white flex flex-col items-center justify-center transition-colors duration-500">
        <h1 className="text-4xl font-bold mb-4">{error || 'Post Not Found'}</h1>
        <button onClick={() => navigate('/blog')} className="text-accent-cyan hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#080B10] text-gray-900 dark:text-white pt-24 pb-16 font-sans transition-colors duration-500">
      <Helmet>
        <title>{post.title} | KAPSERFX IT SOLUTIONS EST</title>
      </Helmet>

      <div className="container mx-auto px-6 max-w-4xl">
        <button 
          onClick={() => navigate('/blog')} 
          className="mb-8 flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group text-sm font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 flex flex-wrap gap-4 items-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
            <span className="flex items-center gap-1.5 text-accent-cyan bg-accent-cyan/10 px-3 py-1 rounded-full">
              <Tag size={14} /> {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} /> {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <User size={14} /> {post.author.name}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-black/10 dark:border-white/10 relative">
            <OptimizedImage 
              src={post.coverImage} 
              alt={post.title} 
              width={800}
              height={450}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#080B10] to-transparent opacity-60"></div>
          </div>

          <div 
            className="prose prose-lg dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-accent-cyan prose-a:no-underline hover:prose-a:underline max-w-none prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-white"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-16 pt-8 border-t border-black/10 dark:border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-accent-purple to-accent-cyan flex items-center justify-center">
                  <User size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest">Written By</p>
                  <p className="font-bold text-lg text-gray-900 dark:text-white">{post.author.name}</p>
                </div>
              </div>
              <button className="px-6 py-2 border border-black/20 dark:border-white/20 rounded-full hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors font-bold uppercase tracking-widest text-sm text-gray-900 dark:text-white">
                Share Article
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;
