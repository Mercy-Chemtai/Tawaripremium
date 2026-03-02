// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const { register } = useAuth();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.name.trim()) { setError('Name is required'); setLoading(false); return; }
    if (!formData.email.trim()) { setError('Email is required'); setLoading(false); return; }
    if (formData.password.length < 6) { setError('Password must be at least 6 characters'); setLoading(false); return; }
    if (formData.password !== formData.confirmPassword) { setError('Passwords do not match'); setLoading(false); return; }

    try {
      const success = await register(formData.name, formData.email, formData.password, formData.confirmPassword);
      if (success) navigate(redirect);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1.5 bg-gradient-to-r from-gray-400 via-black to-gray-600" />

          <div className="p-8 sm:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-black rounded-2xl mb-4 shadow-lg">
                <UserPlus className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                Create Account
              </h1>
              <p className="text-gray-500 text-sm">Sign up to get started today</p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg text-red-700 text-sm flex items-start gap-2">
                <span className="font-semibold">Error:</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400 group-focus-within:text-black transition-colors" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm"
                    placeholder="John Doe"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400 group-focus-within:text-black transition-colors" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm"
                    placeholder="you@example.com"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400 group-focus-within:text-black transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1.5 ml-1">Minimum 6 characters</p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400 group-focus-within:text-black transition-colors" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm shadow-lg shadow-black/20 mt-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  <>Create Account <ArrowRight className="h-4 w-4" /></>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{' '}
                <Link
                  to={`/login?redirect=${redirect}`}
                  className="text-black font-semibold hover:underline underline-offset-2"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}