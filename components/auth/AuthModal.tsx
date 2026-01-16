
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Mail, Lock, User, Github, Chrome, Apple, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialView = 'login' }) => {
  const [view, setView] = useState<'login' | 'register' | 'forgot'>(initialView);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(view === 'login' ? loginSchema : registerSchema)
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      if (view === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
        if (error) throw error;
        onClose();
      } else if (view === 'register') {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: { full_name: data.fullName }
          }
        });
        if (error) throw error;
        setSuccess('Registration successful! Please check your email for verification.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'github' | 'apple') => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: window.location.origin }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="p-8 md:p-12">
          <header className="mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight mb-2">
              {view === 'login' ? 'Welcome back' : view === 'register' ? 'Join YogaX' : 'Reset password'}
            </h2>
            <p className="text-gray-500 font-light">
              {view === 'login' ? 'Continue your journey to mastery.' : view === 'register' ? 'Start your biofeedback-powered practice.' : 'We\'ll send you a recovery link.'}
            </p>
          </header>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-2xl border border-red-100 animate-shake">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 text-green-600 text-sm rounded-2xl border border-green-100">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {view === 'register' && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register('fullName')}
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 transition-all outline-none"
                />
                {errors.fullName && <p className="mt-1 ml-2 text-xs text-red-500">{errors.fullName.message as string}</p>}
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                {...register('email')}
                type="email"
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 transition-all outline-none"
              />
              {errors.email && <p className="mt-1 ml-2 text-xs text-red-500">{errors.email.message as string}</p>}
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                {...register('password')}
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 transition-all outline-none"
              />
              {errors.password && <p className="mt-1 ml-2 text-xs text-red-500">{errors.password.message as string}</p>}
            </div>

            {view === 'login' && (
              <div className="text-right">
                <button 
                  type="button" 
                  onClick={() => setView('forgot')}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              disabled={isLoading}
              className="w-full py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-xl"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  {view === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="my-8 flex items-center gap-4 text-gray-300">
            <div className="h-px flex-1 bg-gray-100"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Or continue with</span>
            <div className="h-px flex-1 bg-gray-100"></div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <button 
              onClick={() => handleOAuth('google')}
              className="flex items-center justify-center py-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
            >
              <Chrome className="w-5 h-5" />
            </button>
            <button 
              onClick={() => handleOAuth('github')}
              className="flex items-center justify-center py-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
            >
              <Github className="w-5 h-5" />
            </button>
            <button 
              onClick={() => handleOAuth('apple')}
              className="flex items-center justify-center py-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
            >
              <Apple className="w-5 h-5" />
            </button>
          </div>

          <footer className="mt-10 text-center">
            <p className="text-sm text-gray-500">
              {view === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
              <button 
                onClick={() => setView(view === 'login' ? 'register' : 'login')}
                className="font-bold text-black hover:underline"
              >
                {view === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </footer>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthModal;
