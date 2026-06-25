import React, { useEffect, useState } from 'react';
import Admin3DBackground from '@/components/Admin3DBackground';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Users, Settings, Mail, Activity, ArrowUpRight, BarChart as BarChartIcon, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [leads, setLeads] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [maintenanceMode, setMaintenanceMode] = useState('Disable');
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [adminUsers, setAdminUsers] = useState([]);
  const [blogs, setBlogs] = useState(() => {
    const saved = localStorage.getItem('adminBlogs');
    return saved ? JSON.parse(saved) : [];
  });
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogForm, setBlogForm] = useState({ title: '', content: '', coverImage: '' });

  useEffect(() => {
    // Auth check
    const authData = localStorage.getItem('adminAuth');
    if (!authData || authData === 'true') {
      // If no auth or it's the legacy 'true' string, force re-login
      localStorage.removeItem('adminAuth');
      navigate('/admin');
      return;
    }

    try {
      const parsedAdmin = JSON.parse(authData);
      setCurrentAdmin(parsedAdmin);
      
      // Auto-set the first available tab if they don't have dashboard access
      if (!parsedAdmin.permissions.dashboard) {
        if (parsedAdmin.permissions.users) setActiveTab('users');
        else if (parsedAdmin.permissions.newsletter) setActiveTab('newsletter');
        else if (parsedAdmin.permissions.settings) setActiveTab('settings');
        else if (parsedAdmin.permissions.manage_admins) setActiveTab('manage_admins');
      }

    } catch (e) {
      navigate('/admin');
      return;
    }

    // Load admin users
    const users = JSON.parse(localStorage.getItem('adminUsers') || '[]');
    setAdminUsers(users);

    // Load maintenance mode
    const savedMaintenance = localStorage.getItem('maintenanceMode');
    if (savedMaintenance) {
      setMaintenanceMode(savedMaintenance);
    }

    // Load leads and subscribers from localStorage
    let savedLeads = JSON.parse(localStorage.getItem('adminLeads')) || [];
    let savedSubscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];

    // Migration: Move old newsletter leads out of adminLeads
    const oldNewsletterLeads = savedLeads.filter(l => l.interest === 'Newsletter' || l.name === 'Newsletter Subscriber');
    
    if (oldNewsletterLeads.length > 0) {
      // Remove them from leads
      savedLeads = savedLeads.filter(l => l.interest !== 'Newsletter' && l.name !== 'Newsletter Subscriber');
      
      // Add them to subscribers
      const migrated = oldNewsletterLeads.map(l => ({
        id: l.id,
        email: l.email,
        date: l.date
      }));
      
      savedSubscribers = [...migrated, ...savedSubscribers];
      
      // Save changes back to localStorage immediately
      localStorage.setItem('adminLeads', JSON.stringify(savedLeads));
      localStorage.setItem('newsletterSubscribers', JSON.stringify(savedSubscribers));
    }

    // Initialize dates for leads
    const now = new Date();
    const formatDate = (daysAgo) => {
      const d = new Date(now);
      d.setDate(d.getDate() - daysAgo);
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    if (savedLeads && savedLeads.length > 0) {
      // Migration for old relative dates in localStorage
      let updatedDates = false;
      savedLeads = savedLeads.map(l => {
        if (l.date === '2 hours ago') { updatedDates = true; return { ...l, date: formatDate(0) }; }
        if (l.date === '1 day ago') { updatedDates = true; return { ...l, date: formatDate(1) }; }
        if (l.date === '2 days ago') { updatedDates = true; return { ...l, date: formatDate(2) }; }
        if (l.date === '1 week ago') { updatedDates = true; return { ...l, date: formatDate(7) }; }
        if (l.date === '2 weeks ago') { updatedDates = true; return { ...l, date: formatDate(14) }; }
        return l;
      });

      if (updatedDates) {
        localStorage.setItem('adminLeads', JSON.stringify(savedLeads));
      }

      setLeads(savedLeads);
    } else {
      // Initialize with mock leads if empty
      const mockLeads = [
        { id: 1, name: 'Michael Chen', email: 'm.chen@apex-cap.com', phone: '+44 7700 900123', interest: 'White-Label MT5', status: 'New', date: formatDate(0) },
        { id: 2, name: 'Sarah Al-Fayed', email: 'sarah@desert-invest.ae', phone: '+971 50 123 4567', interest: 'Liquidity Provider', status: 'Connected', date: formatDate(1) },
        { id: 3, name: 'David Smith', email: 'd.smith@proptrade.com', phone: '+1 555 019 2834', interest: 'CRM Software', status: 'In Progress', date: formatDate(2) },
        { id: 4, name: 'Elena Rostov', email: 'e.rostov@fintech-eu.net', phone: '+357 22 123 456', interest: 'Business Consulting', status: 'Closed (Won)', date: formatDate(7) },
        { id: 5, name: 'James Wilson', email: 'j.wilson@alphamarkets.com', phone: '+61 4 1234 5678', interest: 'Risk Management', status: 'New', date: formatDate(14) },
      ];
      setLeads(mockLeads);
      localStorage.setItem('adminLeads', JSON.stringify(mockLeads));
    }

    if (savedSubscribers && savedSubscribers.length > 0) {
      setSubscribers(savedSubscribers);
    }

  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  const handleStatusChange = (leadId, newStatus) => {
    const updatedLeads = leads.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    );
    setLeads(updatedLeads);
    localStorage.setItem('adminLeads', JSON.stringify(updatedLeads));
  };

  const handleSaveSettings = () => {
    localStorage.setItem('maintenanceMode', maintenanceMode);
    alert('Settings saved successfully!');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Connected': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'In Progress': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Closed (Won)': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Closed (Lost)': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const [editingLead, setEditingLead] = useState(null);

  const handleEditChange = (field, value) => {
    setEditingLead({ ...editingLead, [field]: value });
  };

  const saveEditedLead = () => {
    const updatedLeads = leads.map(l => l.id === editingLead.id ? editingLead : l);
    setLeads(updatedLeads);
    localStorage.setItem('adminLeads', JSON.stringify(updatedLeads));
    setEditingLead(null);
  };

  const deleteLead = () => {
    if (window.confirm("Are you sure you want to delete this lead? This action cannot be undone.")) {
      const updatedLeads = leads.filter(l => l.id !== editingLead.id);
      setLeads(updatedLeads);
      localStorage.setItem('adminLeads', JSON.stringify(updatedLeads));
      setEditingLead(null);
    }
  };

  const [showLeadsList, setShowLeadsList] = useState(false);
  const [showEmailsList, setShowEmailsList] = useState(false);

  const handleEmailBroadcast = () => {
    const emails = leads.map(l => l.email).filter(Boolean).join(',');
    if (emails) {
      window.location.href = `mailto:?bcc=${emails}&subject=Update from KapserFX`;
    } else {
      alert("No valid email addresses found in your leads.");
    }
  };

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [editingAdminId, setEditingAdminId] = useState(null);
  const [adminForm, setAdminForm] = useState({
    name: '', email: '', password: '', 
    permissions: { dashboard: false, users: false, newsletter: false, settings: false, manage_admins: false }
  });

  const handleSaveAdmin = (e) => {
    e.preventDefault();
    let updatedUsers;
    if (editingAdminId) {
       updatedUsers = adminUsers.map(u => u.id === editingAdminId ? { ...u, name: adminForm.name, email: adminForm.email, permissions: adminForm.permissions, password: adminForm.password ? btoa(adminForm.password) : u.password } : u);
    } else {
       updatedUsers = [...adminUsers, { ...adminForm, id: Date.now(), password: btoa(adminForm.password) }];
    }
    setAdminUsers(updatedUsers);
    localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));
    setShowAdminModal(false);
  };

  const handleDeleteAdmin = (id) => {
    if (id === 1) return alert("Cannot delete the Master Admin!");
    if (id === currentAdmin.id) return alert("Cannot delete yourself!");
    if (window.confirm("Delete this admin?")) {
      const updated = adminUsers.filter(u => u.id !== id);
      setAdminUsers(updated);
      localStorage.setItem('adminUsers', JSON.stringify(updated));
    }
  };

  const openAdminModal = (admin = null) => {
    if (admin) {
      setEditingAdminId(admin.id);
      setAdminForm({ name: admin.name, email: admin.email, password: '', permissions: admin.permissions });
    } else {
      setEditingAdminId(null);
      setAdminForm({ name: '', email: '', password: '', permissions: { dashboard: false, users: false, newsletter: false, settings: false, manage_admins: false } });
    }
    setShowAdminModal(true);
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // In a real implementation, this would send to /api/upload
    // const formData = new FormData();
    // formData.append('image', file);
    // const res = await fetch('/api/upload', { method: 'POST', body: formData, headers: { Authorization: `Bearer ...` } });
    // const data = await res.json();
    // if (data.success) setBlogForm({ ...blogForm, coverImage: data.data.url });
    
    alert('Image upload endpoint is prepared in backend. Cloudinary will process this.');
    setBlogForm({ ...blogForm, coverImage: URL.createObjectURL(file) });
  };

  const handleSaveBlog = (e) => {
    e.preventDefault();
    let updatedBlogs;
    const slug = blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    if (editingBlog) {
      updatedBlogs = blogs.map(b => b.id === editingBlog.id ? { ...b, ...blogForm, slug: slug || b.slug } : b);
    } else {
      updatedBlogs = [{ 
        id: Date.now(), 
        ...blogForm, 
        slug: slug,
        excerpt: blogForm.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...',
        category: 'Forex Insights',
        author: { name: currentAdmin?.name || 'Admin' },
        createdAt: new Date().toISOString(),
        date: new Date().toLocaleDateString() 
      }, ...blogs];
    }
    setBlogs(updatedBlogs);
    localStorage.setItem('adminBlogs', JSON.stringify(updatedBlogs));
    setEditingBlog(null);
    setBlogForm({ title: '', content: '', coverImage: '' });
  };
  
  const handleDeleteBlog = (id) => {
    if (window.confirm("Delete this blog post?")) {
      const updated = blogs.filter(b => b.id !== id);
      setBlogs(updated);
      localStorage.setItem('adminBlogs', JSON.stringify(updated));
    }
  };

  const renderContent = () => {
    if (!currentAdmin) return null;

    if (activeTab === 'users') {
      if (!currentAdmin.permissions.users) return <div className="text-red-400 p-8 font-bold">Access Denied (Leads)</div>;
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Leads & Inquiries</h1>
            <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition-colors">
              Export CSV
            </button>
          </div>

          {editingLead && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
                <h2 className="text-xl font-bold text-white mb-6">Edit Lead</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                    <input 
                      type="text" 
                      value={editingLead.name || ''} 
                      onChange={e => handleEditChange('name', e.target.value)}
                      className="w-full bg-black/20 border border-white/10 backdrop-blur-sm text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                    <input 
                      type="email" 
                      value={editingLead.email || ''} 
                      onChange={e => handleEditChange('email', e.target.value)}
                      className="w-full bg-black/20 border border-white/10 backdrop-blur-sm text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                    <input 
                      type="text" 
                      value={editingLead.phone || ''} 
                      onChange={e => handleEditChange('phone', e.target.value)}
                      className="w-full bg-black/20 border border-white/10 backdrop-blur-sm text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Interest</label>
                    <input 
                      type="text" 
                      value={editingLead.interest || ''} 
                      onChange={e => handleEditChange('interest', e.target.value)}
                      className="w-full bg-black/20 border border-white/10 backdrop-blur-sm text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                    <textarea 
                      value={editingLead.message || ''} 
                      onChange={e => handleEditChange('message', e.target.value)}
                      rows={3}
                      className="w-full bg-black/20 border border-white/10 backdrop-blur-sm text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500 resize-none"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mt-8">
                  <button 
                    onClick={deleteLead}
                    className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg font-medium transition-colors border border-red-500/20"
                  >
                    Delete Lead
                  </button>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setEditingLead(null)}
                      className="px-6 py-2 border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={saveEditedLead}
                      className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-3 px-4 text-gray-400 font-medium">Name</th>
                    <th className="py-3 px-4 text-gray-400 font-medium">Email / Phone</th>
                    <th className="py-3 px-4 text-gray-400 font-medium">Interest / Message</th>
                    <th className="py-3 px-4 text-gray-400 font-medium">Status</th>
                    <th className="py-3 px-4 text-gray-400 font-medium">Date</th>
                    <th className="py-3 px-4 text-gray-400 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-4 text-white font-medium">{lead.name}</td>
                      <td className="py-4 px-4">
                        <div className="text-gray-300">{lead.email}</div>
                        <div className="text-gray-500 text-sm">{lead.phone}</div>
                      </td>
                      <td className="py-4 px-4 text-cyan-400">
                        {lead.interest}
                        {lead.message && <div className="text-gray-400 text-xs mt-1 truncate max-w-xs" title={lead.message}>"{lead.message}"</div>}
                      </td>
                      <td className="py-4 px-4">
                        <select 
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border appearance-none cursor-pointer outline-none ${getStatusColor(lead.status)}`}
                        >
                          <option value="New" className="bg-[#111827] text-white">New</option>
                          <option value="Connected" className="bg-[#111827] text-white">Connected</option>
                          <option value="In Progress" className="bg-[#111827] text-white">In Progress</option>
                          <option value="Closed (Won)" className="bg-[#111827] text-white">Closed (Won)</option>
                          <option value="Closed (Lost)" className="bg-[#111827] text-white">Closed (Lost)</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-gray-500">{lead.date}</td>
                      <td className="py-4 px-4 text-right">
                        <button 
                          onClick={() => setEditingLead(lead)}
                          className="text-cyan-500 hover:text-cyan-400 text-sm font-medium px-3 py-1.5 border border-cyan-500/30 hover:border-cyan-400 rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      );
    }

    if (activeTab === 'newsletter') {
      if (!currentAdmin.permissions.newsletter) return <div className="text-red-400 p-8 font-bold">Access Denied (Newsletter)</div>;
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Newsletter Subscribers</h1>
            <div className="text-sm font-medium text-purple-400 bg-purple-400/10 px-4 py-2 rounded-lg">
              Total: {subscribers.length}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-3 px-4 text-gray-400 font-medium">Email Address</th>
                    <th className="py-3 px-4 text-gray-400 font-medium text-right">Date Subscribed</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.length > 0 ? (
                    subscribers.map((sub) => (
                      <tr key={sub.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                        <td className="py-4 px-4 text-white font-medium">{sub.email}</td>
                        <td className="py-4 px-4 text-gray-500 text-right">{sub.date}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="py-8 text-center text-gray-500">No newsletter subscribers yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      );
    }

    if (activeTab === 'settings') {
      if (!currentAdmin.permissions.settings) return <div className="text-red-400 p-8 font-bold">Access Denied (Settings)</div>;
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-white mb-6">Platform Settings</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl">
            {/* General Settings */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">Admin Profile</h2>
              <form className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Administrator Name</label>
                  <input type="text" defaultValue="Meet Gelani" className="w-full bg-[#1F2937] border-gray-700 text-white rounded-lg focus:ring-cyan-500 focus:border-cyan-500 p-2.5 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Admin Email Address</label>
                  <input type="email" defaultValue="admin@gmail.com" className="w-full bg-[#1F2937] border-gray-700 text-white rounded-lg focus:ring-cyan-500 focus:border-cyan-500 p-2.5 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Change Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-[#1F2937] border-gray-700 text-white rounded-lg focus:ring-cyan-500 focus:border-cyan-500 p-2.5 outline-none" />
                </div>
              </form>
            </div>

            {/* System Preferences */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-white mb-4 border-b border-gray-800 pb-2">System Preferences</h2>
              <form className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Email Notifications</label>
                    <p className="text-xs text-gray-500">Receive alerts for new leads.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                  </label>
                </div>

                <div className="pt-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Maintenance Mode</label>
                  <select 
                    value={maintenanceMode}
                    onChange={(e) => setMaintenanceMode(e.target.value)}
                    className="w-full bg-[#1F2937] border-gray-700 text-white rounded-lg focus:ring-cyan-500 focus:border-cyan-500 p-2.5 outline-none cursor-pointer"
                  >
                    <option value="Disable">Disabled (Live)</option>
                    <option value="Enable">Enabled (Offline)</option>
                  </select>
                </div>
              </form>
            </div>
            
            <div className="col-span-1 lg:col-span-2 flex justify-end">
              <button type="button" onClick={handleSaveSettings} className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-colors shadow-lg">
                Save All Settings
              </button>
            </div>
          </div>
        </motion.div>
      );
    }

    if (activeTab === 'manage_admins') {
      if (!currentAdmin.permissions.manage_admins) return <div className="text-red-400 p-8 font-bold">Access Denied (Manage Admins)</div>;
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Manage Admins</h1>
            <button onClick={() => openAdminModal(null)} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition-colors">
              + Create New Admin
            </button>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-3 px-4 text-gray-400 font-medium">Name / Email</th>
                    <th className="py-3 px-4 text-gray-400 font-medium">Permissions</th>
                    <th className="py-3 px-4 text-gray-400 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminUsers.map((admin) => (
                    <tr key={admin.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-4">
                        <div className="text-white font-medium">{admin.name}</div>
                        <div className="text-gray-500 text-sm">{admin.email}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-2">
                          {Object.keys(admin.permissions).map(key => admin.permissions[key] && (
                            <span key={key} className="px-2 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-md text-[10px] uppercase font-bold tracking-wider">
                              {key.replace('_', ' ')}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        {admin.id !== 1 && (
                          <button onClick={() => openAdminModal(admin)} className="text-cyan-500 hover:text-cyan-400 text-sm font-medium px-3 py-1.5 border border-cyan-500/30 hover:border-cyan-400 rounded-lg transition-colors mr-2">
                            Edit
                          </button>
                        )}
                        {admin.id !== 1 && (
                          <button onClick={() => handleDeleteAdmin(admin.id)} className="text-red-500 hover:text-red-400 text-sm font-medium px-3 py-1.5 border border-red-500/30 hover:border-red-400 rounded-lg transition-colors">
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {showAdminModal && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
                <h2 className="text-xl font-bold text-white mb-6">{editingAdminId ? 'Edit Admin' : 'Create New Admin'}</h2>
                <form onSubmit={handleSaveAdmin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                    <input type="text" required value={adminForm.name} onChange={e => setAdminForm({...adminForm, name: e.target.value})} className="w-full bg-black/20 border border-white/10 backdrop-blur-sm text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                    <input type="email" required value={adminForm.email} onChange={e => setAdminForm({...adminForm, email: e.target.value})} className="w-full bg-black/20 border border-white/10 backdrop-blur-sm text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">{editingAdminId ? 'New Password (leave blank to keep current)' : 'Password'}</label>
                    <input type="password" required={!editingAdminId} value={adminForm.password} onChange={e => setAdminForm({...adminForm, password: e.target.value})} className="w-full bg-black/20 border border-white/10 backdrop-blur-sm text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500" />
                  </div>
                  <div className="pt-4 border-t border-gray-800">
                    <label className="block text-sm font-medium text-gray-300 mb-3">Permissions</label>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.keys(adminForm.permissions).map(key => (
                        <label key={key} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={adminForm.permissions[key]} onChange={e => setAdminForm({...adminForm, permissions: {...adminForm.permissions, [key]: e.target.checked}})} className="rounded border-gray-700 bg-gray-800 text-cyan-500 focus:ring-cyan-500" />
                          <span className="text-sm text-gray-400 capitalize">{key.replace('_', ' ')}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-8">
                    <button type="button" onClick={() => setShowAdminModal(false)} className="px-6 py-2 border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg font-medium transition-colors">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors">Save Admin</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </motion.div>
      );
    }

    if (activeTab === 'dashboard') {
      if (!currentAdmin.permissions.dashboard) return <div className="text-red-400 p-8 font-bold">Access Denied (Dashboard)</div>;
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
        <h1 className="text-2xl font-bold text-white mb-6">Overview Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-gray-400 text-sm font-medium mb-1">Total Leads (This Month)</div>
                <div className="text-3xl font-bold text-white">{leads.length}</div>
              </div>
              <div className="relative">
                <div 
                  className="p-2 bg-cyan-500/10 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
                  onClick={() => setShowLeadsList(!showLeadsList)}
                  title="View Lead Names"
                >
                  <Users className="w-5 h-5 text-cyan-400" />
                </div>
                {showLeadsList && (
                  <div className="absolute right-0 mt-2 w-56 bg-black/20 border border-white/10 backdrop-blur-sm rounded-lg shadow-xl z-50 py-2 max-h-60 overflow-y-auto">
                    <div className="px-4 py-2 border-b border-gray-700 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Recent Leads
                    </div>
                    {leads.length > 0 ? leads.map(lead => (
                      <div 
                        key={lead.id} 
                        className="px-4 py-3 text-white text-sm hover:bg-gray-700 cursor-pointer flex justify-between items-center transition-colors border-b border-gray-700/50 last:border-0" 
                        onClick={() => { setShowLeadsList(false); setActiveTab('users'); }}
                      >
                        <span className="truncate mr-2 font-medium">{lead.name}</span>
                        <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">{lead.status}</span>
                      </div>
                    )) : (
                      <div className="px-4 py-3 text-gray-500 text-sm text-center">No leads available</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="text-green-400 text-sm mt-4 flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" /> New leads arriving
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-gray-400 text-sm font-medium mb-1">Unread Messages</div>
                <div className="text-3xl font-bold text-white">{leads.length}</div>
              </div>
              <div className="relative">
                <div 
                  className="p-2 bg-purple-500/10 rounded-lg cursor-pointer hover:bg-purple-500/20 transition-colors"
                  onClick={() => setShowEmailsList(!showEmailsList)}
                  title="View Lead Emails"
                >
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                {showEmailsList && (
                  <div className="absolute right-0 mt-2 w-64 bg-black/20 border border-white/10 backdrop-blur-sm rounded-lg shadow-xl z-50 py-2 max-h-60 overflow-y-auto">
                    <div className="px-4 py-2 border-b border-gray-700 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Recent Emails
                    </div>
                    {leads.length > 0 ? leads.map(lead => (
                      <div 
                        key={lead.id} 
                        className="px-4 py-3 text-white text-sm hover:bg-gray-700 cursor-pointer flex justify-between items-center transition-colors border-b border-gray-700/50 last:border-0" 
                        onClick={() => { setShowEmailsList(false); setActiveTab('users'); }}
                      >
                        <span className="truncate mr-2 text-purple-300 font-medium">{lead.email}</span>
                      </div>
                    )) : (
                      <div className="px-4 py-3 text-gray-500 text-sm text-center">No emails available</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="text-red-400 text-sm mt-4 flex items-center gap-1">
              Requires attention
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-gray-400 text-sm font-medium mb-1">Conversion Rate</div>
                <div className="text-3xl font-bold text-white">
                  {leads.length > 0 
                    ? ((leads.filter(l => l.status === 'Closed (Won)').length / leads.length) * 100).toFixed(1) + '%' 
                    : '0%'}
                </div>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-lg"><Activity className="w-5 h-5 text-blue-400" /></div>
            </div>
            <div className="text-green-400 text-sm mt-4 flex items-center gap-1">
              Based on Closed (Won) leads
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-gray-400 text-sm font-medium mb-1">New Leads</div>
                <div className="text-3xl font-bold text-white">
                  {leads.filter(l => l.status === 'New').length}
                </div>
              </div>
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />
              </div>
            </div>
            <div className="text-yellow-400/80 text-sm mt-4">
              Awaiting your response
            </div>
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4">Leads by Status</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'New', count: leads.filter(l => l.status === 'New').length },
                    { name: 'Connected', count: leads.filter(l => l.status === 'Connected').length },
                    { name: 'In Progress', count: leads.filter(l => l.status === 'In Progress').length },
                    { name: 'Won', count: leads.filter(l => l.status === 'Closed (Won)').length },
                    { name: 'Lost', count: leads.filter(l => l.status === 'Closed (Lost)').length },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                  <Bar dataKey="count" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4">Lead Interests</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'White-Label MT5', value: leads.filter(l => l.interest === 'White-Label MT5').length },
                      { name: 'Liquidity Provider', value: leads.filter(l => l.interest === 'Liquidity Provider').length },
                      { name: 'CRM Software', value: leads.filter(l => l.interest === 'CRM Software').length },
                      { name: 'Risk Management', value: leads.filter(l => l.interest === 'Risk Management').length },
                      { name: 'Business Consulting', value: leads.filter(l => l.interest === 'Business Consulting').length },
                    ].filter(d => d.value > 0)}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {[
                      { name: 'White-Label MT5', value: leads.filter(l => l.interest === 'White-Label MT5').length },
                      { name: 'Liquidity Provider', value: leads.filter(l => l.interest === 'Liquidity Provider').length },
                      { name: 'CRM Software', value: leads.filter(l => l.interest === 'CRM Software').length },
                      { name: 'Risk Management', value: leads.filter(l => l.interest === 'Risk Management').length },
                      { name: 'Business Consulting', value: leads.filter(l => l.interest === 'Business Consulting').length },
                    ].filter(d => d.value > 0).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#06b6d4', '#a855f7', '#3b82f6', '#10b981', '#f59e0b'][index % 5]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4">Recent Contact Requests</h3>
            <div className="space-y-4">
              {leads.slice(0, 3).map((lead) => (
                <div key={lead.id} className="flex items-center justify-between py-3 border-b border-gray-800/50 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold uppercase">
                      {lead.name ? lead.name.charAt(0) : '?'}
                    </div>
                    <div>
                      <div className="text-white font-medium">{lead.name}</div>
                      <div className="text-cyan-500 text-sm">Requested: {lead.interest}</div>
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm">{lead.date}</div>
                </div>
              ))}
              {leads.length === 0 && (
                <div className="text-gray-500 text-sm text-center py-4">No recent requests</div>
              )}
            </div>
            <button onClick={() => setActiveTab('users')} className="w-full mt-4 py-2 border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-sm font-medium">
              View All Leads
            </button>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={handleEmailBroadcast} className="flex flex-col items-center justify-center p-6 bg-gray-800/30 border border-gray-800 hover:border-cyan-500/50 hover:bg-cyan-500/5 rounded-xl transition-all group">
                <Mail className="w-8 h-8 text-gray-400 group-hover:text-cyan-400 mb-3" />
                <span className="text-gray-300 font-medium text-sm text-center">Compose Email Broadcast</span>
              </button>
              <button onClick={() => setActiveTab('settings')} className="flex flex-col items-center justify-center p-6 bg-gray-800/30 border border-gray-800 hover:border-purple-500/50 hover:bg-purple-500/5 rounded-xl transition-all group">
                <Settings className="w-8 h-8 text-gray-400 group-hover:text-purple-400 mb-3" />
                <span className="text-gray-300 font-medium text-sm text-center">Update Contact Info</span>
              </button>
              <button onClick={() => window.open('/', '_blank')} className="flex flex-col items-center justify-center p-6 bg-gray-800/30 border border-gray-800 hover:border-blue-500/50 hover:bg-blue-500/5 rounded-xl transition-all group">
                <LayoutDashboard className="w-8 h-8 text-gray-400 group-hover:text-blue-400 mb-3" />
                <span className="text-gray-300 font-medium text-sm text-center">View Live Site</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
    }

    if (activeTab === 'blogs') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Manage Blogs</h1>
            <button onClick={() => { setEditingBlog(false); setBlogForm({ title: '', content: '', coverImage: '' }); }} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition-colors">
              + Create New Blog
            </button>
          </div>

          {editingBlog !== null && (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg mb-8">
              <h2 className="text-xl font-bold text-white mb-6">{editingBlog ? 'Edit Blog' : 'Create New Blog'}</h2>
              <form onSubmit={handleSaveBlog} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                  <input type="text" required value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} className="w-full bg-black/20 border border-white/10 backdrop-blur-sm text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Cover Image</label>
                  <input type="file" accept="image/*" onChange={handleUploadImage} className="w-full bg-black/20 border border-white/10 backdrop-blur-sm text-white rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500" />
                  {blogForm.coverImage && <img src={blogForm.coverImage} alt="Cover" className="mt-2 h-32 object-cover rounded-lg" />}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Content (Rich Text)</label>
                  <div className="bg-white rounded-lg text-black mb-12">
                    <ReactQuill 
                      theme="snow" 
                      value={blogForm.content} 
                      onChange={(content) => setBlogForm({...blogForm, content})} 
                      style={{ height: '300px' }}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-8">
                  <button type="button" onClick={() => setEditingBlog(null)} className="px-6 py-2 border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg font-medium transition-colors">Cancel</button>
                  <button type="submit" className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors">Save Blog</button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-3 px-4 text-gray-400 font-medium">Title</th>
                    <th className="py-3 px-4 text-gray-400 font-medium text-right">Date</th>
                    <th className="py-3 px-4 text-gray-400 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.length > 0 ? blogs.map((blog) => (
                    <tr key={blog.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                      <td className="py-4 px-4 text-white font-medium">{blog.title}</td>
                      <td className="py-4 px-4 text-gray-500 text-right">{blog.date}</td>
                      <td className="py-4 px-4 text-right">
                        <button onClick={() => { setEditingBlog(blog); setBlogForm(blog); }} className="text-cyan-500 hover:text-cyan-400 text-sm font-medium px-3 py-1.5 border border-cyan-500/30 hover:border-cyan-400 rounded-lg transition-colors mr-2">Edit</button>
                        <button onClick={() => handleDeleteBlog(blog.id)} className="text-red-500 hover:text-red-400 text-sm font-medium px-3 py-1.5 border border-red-500/30 hover:border-red-400 rounded-lg transition-colors">Delete</button>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan="3" className="py-8 text-center text-gray-500">No blogs created yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      );
    }
    
    return <div className="p-8 text-center text-gray-500">Please select an option from the menu.</div>;
  };

  return (
    <div className="relative min-h-screen flex overflow-hidden bg-[#030610]">
      <Admin3DBackground />
      <div className="relative z-10 flex w-full">
      {/* Sidebar */}
      <div className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-800">
          <h2 
            onClick={() => { setActiveTab('dashboard'); navigate('/admin/dashboard'); }}
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 cursor-pointer hover:opacity-80 transition-opacity"
          >
            Admin Panel
          </h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {currentAdmin?.permissions?.dashboard && (
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-cyan-500/10 text-cyan-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </button>
          )}
          
          {currentAdmin?.permissions?.users && (
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'users'
                  ? 'bg-cyan-500/10 text-cyan-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">Leads & Inquiries</span>
            </button>
          )}

          {currentAdmin?.permissions?.newsletter && (
            <button
              onClick={() => setActiveTab('newsletter')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'newsletter'
                  ? 'bg-cyan-500/10 text-cyan-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Mail className="w-5 h-5" />
              <span className="font-medium">Newsletter</span>
            </button>
          )}

          {currentAdmin?.permissions?.settings && (
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'settings'
                  ? 'bg-cyan-500/10 text-cyan-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('blogs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'blogs'
                ? 'bg-cyan-500/10 text-cyan-400'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Blogs</span>
          </button>

          {currentAdmin?.permissions?.manage_admins && (
            <button
              onClick={() => setActiveTab('manage_admins')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'manage_admins'
                  ? 'bg-cyan-500/10 text-cyan-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Manage Admins</span>
            </button>
          )}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Mobile Header */}
        <div className="md:hidden bg-white/5 backdrop-blur-xl border-b border-white/10 p-4 flex justify-between items-center z-20">
          <h2 
            onClick={() => { setActiveTab('dashboard'); navigate('/admin/dashboard'); }}
            className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 cursor-pointer hover:opacity-80 transition-opacity"
          >
            Admin Panel
          </h2>
          <button onClick={handleLogout} className="text-red-400 p-2">
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto pb-24 md:pb-8">
          {renderContent()}
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/5 backdrop-blur-xl border-t border-white/10 z-50 px-2 py-3 flex justify-around items-center">
          {currentAdmin?.permissions?.dashboard && (
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                activeTab === 'dashboard' ? 'text-cyan-400' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="text-[10px] font-medium">Dashboard</span>
            </button>
          )}
          {currentAdmin?.permissions?.users && (
            <button
              onClick={() => setActiveTab('users')}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                activeTab === 'users' ? 'text-cyan-400' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="text-[10px] font-medium">Leads</span>
            </button>
          )}
          {currentAdmin?.permissions?.newsletter && (
            <button
              onClick={() => setActiveTab('newsletter')}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                activeTab === 'newsletter' ? 'text-cyan-400' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Mail className="w-5 h-5" />
              <span className="text-[10px] font-medium">Newsletter</span>
            </button>
          )}
          {currentAdmin?.permissions?.settings && (
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                activeTab === 'settings' ? 'text-cyan-400' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span className="text-[10px] font-medium">Settings</span>
            </button>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
