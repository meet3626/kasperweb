import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Admin3DBackground from '@/components/Admin3DBackground';
import { motion } from 'framer-motion';
import { Lock, Mail, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [requiresMfa, setRequiresMfa] = useState(false);
  const [setupMfaRequired, setSetupMfaRequired] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [adminId, setAdminId] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Seed master admin if adminUsers doesn't exist
    const users = localStorage.getItem('adminUsers');
    if (!users) {
      const masterAdmin = [{
        id: 1,
        name: 'Master Admin',
        email: 'admin@gmail.com',
        password: btoa('Admin123'),
        permissions: {
          dashboard: true,
          users: true,
          newsletter: true,
          settings: true,
          manage_admins: true
        }
      }];
      localStorage.setItem('adminUsers', JSON.stringify(masterAdmin));
    }
    
    // Auto-redirect if already logged in (optional, but good)
    if (localStorage.getItem('adminAuth')) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Check against legacy 'true' string to force re-login if needed
    if (localStorage.getItem('adminAuth') === 'true') {
        localStorage.removeItem('adminAuth');
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrUsername: email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.requiresMfa) {
          setRequiresMfa(true);
          setAdminId(data.adminId);
          setError('');
        } else if (data.setupMfaRequired) {
          setSetupMfaRequired(true);
          setQrCode(data.qrCode);
          setAdminId(data.adminId);
          setError('');
        } else {
          localStorage.setItem('adminAuth', JSON.stringify(data));
          navigate('/admin/dashboard');
        }
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('Could not connect to the server. Please ensure backend is running.');
    }
  };

  const handleMfaSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/auth/login-mfa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminId, mfaToken: mfaCode }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminAuth', JSON.stringify(data));
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid 2FA code');
      }
    } catch (err) {
      setError('Could not connect to the server. Please ensure backend is running.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden bg-[#030610]">
      <Admin3DBackground />
      {/* Background elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Admin Portal
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Sign in to access the dashboard
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="bg-[#111827] py-8 px-4 shadow-2xl shadow-cyan-500/5 sm:rounded-2xl sm:px-10 border border-gray-800">
          {!requiresMfa && !setupMfaRequired ? (
            <form className="space-y-6" onSubmit={handleLogin}>
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Email or Username
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="username"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 bg-[#1F2937] border-gray-700 text-white rounded-lg focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm py-2.5"
                    placeholder="Enter your email or username"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 bg-[#1F2937] border-gray-700 text-white rounded-lg focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm py-2.5"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900 transition-all duration-200"
                >
                  Sign in
                </button>
              </div>
            </form>
          ) : setupMfaRequired ? (
            <form className="space-y-6" onSubmit={handleMfaSubmit}>
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div className="text-center">
                <h3 className="text-lg font-bold text-white mb-2">Setup Required</h3>
                <p className="text-sm text-gray-400 mb-4">You must configure 2FA before accessing the dashboard.</p>
                {qrCode && (
                  <div className="bg-white p-3 rounded-xl inline-block mb-4">
                    <img src={qrCode} alt="Setup QR Code" className="w-40 h-40" />
                  </div>
                )}
                <p className="text-xs text-gray-400 mb-2">Scan with Google Authenticator or Authy, then enter the code.</p>
              </div>

              <div>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="mfaCodeSetup"
                    name="mfaCodeSetup"
                    type="text"
                    required
                    maxLength="6"
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                    className="block w-full pl-10 bg-[#1F2937] border-gray-700 text-white rounded-lg focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm py-2.5 tracking-widest text-center text-lg"
                    placeholder="000000"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => { setSetupMfaRequired(false); setError(''); setMfaCode(''); }}
                  className="w-full flex justify-center py-2.5 px-4 border border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-900 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900 transition-all duration-200"
                >
                  Enable & Login
                </button>
              </div>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleMfaSubmit}>
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="mfaCode"
                  className="block text-sm font-medium text-gray-300"
                >
                  Authenticator Code
                </label>
                <p className="text-xs text-gray-400 mt-1 mb-2">Enter the 6-digit code from your authenticator app.</p>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="mfaCode"
                    name="mfaCode"
                    type="text"
                    required
                    maxLength="6"
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ''))}
                    className="block w-full pl-10 bg-[#1F2937] border-gray-700 text-white rounded-lg focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm py-2.5 tracking-widest text-center text-lg"
                    placeholder="000000"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => { setRequiresMfa(false); setError(''); setMfaCode(''); }}
                  className="w-full flex justify-center py-2.5 px-4 border border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-900 transition-all duration-200"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900 transition-all duration-200"
                >
                  Verify
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
