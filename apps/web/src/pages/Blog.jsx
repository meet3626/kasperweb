import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OptimizedImage from '../components/OptimizedImage';

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const saved = localStorage.getItem('adminBlogs');
        if (saved) {
          setBlogs(JSON.parse(saved));
        } else {
          setBlogs([]);
        }
      } catch (err) {
        setError('Error loading blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen text-white pt-24 pb-12">
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-block px-4 py-1.5 border border-black/20 dark:border-white/20 rounded-full text-xs font-bold tracking-widest text-gray-900 dark:text-white mb-6 uppercase">
              Our Blog
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-[800] uppercase tracking-wider mb-6 leading-tight">
              Latest Insights <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple">& News</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Stay updated with the latest trends, regulatory changes, and expert advice on running a successful Forex brokerage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="py-12 transition-colors duration-500">
        <div className="container mx-auto px-6 max-w-7xl">
          {loading ? (
             <div className="text-center py-20 text-gray-500">Loading insights...</div>
          ) : error ? (
             <div className="text-center py-20 text-red-500">{error}</div>
          ) : blogs.length === 0 ? (
             <div className="text-center py-20 text-gray-500">No blog posts found.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((post, index) => (
                <motion.div
                  key={post.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-accent-cyan/30 hover:shadow-[0_0_30px_rgba(0,229,255,0.15)] transition-all duration-500 group flex flex-col h-full cursor-pointer shadow-none"
                >
                  {/* Image Container with Zoom effect */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <OptimizedImage 
                      src={post.coverImage} 
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 left-4 bg-accent-cyan text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {post.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-gray-500 font-semibold uppercase tracking-wider mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{post.author.name}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-accent-cyan transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>

                    <button className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white group-hover:text-accent-cyan transition-colors mt-auto w-fit">
                      READ MORE <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {!loading && blogs.length > 0 && (
            <div className="mt-16 text-center">
              <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-bold uppercase tracking-widest text-sm transition-colors text-white">
                Load More Posts
              </button>
            </div>
          )}

        </div>
      </section>

    </div>
  );
};

export default Blog;
