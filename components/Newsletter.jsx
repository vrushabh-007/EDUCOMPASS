'use client';

// src/components/Newsletter.jsx
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    if (!isChecked) {
      setStatus('error');
      setMessage('Please accept the terms and conditions');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    try {
      setStatus('loading');
      setMessage('');

      // Insert directly using Supabase client
      const { data, error } = await supabase
        .from('Newsletter')
        .insert([
          {
            email,
            subscribed_at: new Date().toISOString(),
            is_active: true
          }
        ])
        .select();

      if (error) {
        if (error.code === '23505') { // Unique violation error code
          throw new Error('This email is already subscribed to our newsletter');
        }
        throw new Error('Failed to subscribe. Please try again later.');
      }

      // Success
      setStatus('success');
      setMessage('Thank you for subscribing to our newsletter!');
      setEmail('');
      setIsChecked(false);
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-white text-center">
        <h2 className="text-2xl font-semibold mb-4">Subscribe to our newsletter</h2>
        <p className="mb-8">
          Get expert advice for your journey to university delivered to your inbox each month. It's short, and worthwhile - we promise!
        </p>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Email address"
            className="w-full mb-4 px-4 py-2 rounded-lg text-gray-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
          />
          <div className="flex items-center justify-center mb-4">
            <input
              type="checkbox"
              id="terms"
              className="mr-2"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              disabled={status === 'loading'}
            />
            <label htmlFor="terms" className="text-sm">
              I confirm I am over 16 and I agree to the Terms and Conditions and Privacy Notice.
            </label>
          </div>
          
          {message && (
            <div 
              className={`mb-4 py-2 px-4 rounded-lg ${
                status === 'error' 
                  ? 'bg-red-500/10 text-red-100 border border-red-200/20' 
                  : status === 'success'
                  ? 'bg-green-500/10 text-green-100 border border-green-200/20'
                  : ''
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className={`
              w-full bg-black text-white px-8 py-2 rounded-lg 
              transition duration-300
              ${status === 'loading'
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gray-800'
              }
            `}
          >
            {status === 'loading' ? 'SUBSCRIBING...' : 'SUBSCRIBE NOW'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Newsletter;