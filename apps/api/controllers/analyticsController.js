const Lead = require('../models/Lead');
const Blog = require('../models/Blog');

// @desc    Get dashboard analytics
// @route   GET /api/analytics
// @access  Private/Admin
const getAnalytics = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const leadsByStatus = await Lead.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const totalBlogs = await Blog.countDocuments();
    const blogViewsResult = await Blog.aggregate([
      { $group: { _id: null, totalViews: { $sum: '$views' } } }
    ]);
    const totalBlogViews = blogViewsResult.length > 0 ? blogViewsResult[0].totalViews : 0;

    const recentLeads = await Lead.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      success: true,
      data: {
        totalLeads,
        leadsByStatus,
        totalBlogs,
        totalBlogViews,
        recentLeads
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving analytics' });
  }
};

module.exports = {
  getAnalytics
};
