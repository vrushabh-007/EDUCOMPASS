import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existingSubscriber, error: checkError } = await supabase
      .from('Newsletter')
      .select('email')
      .eq('email', email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is the "not found" error code
      console.error('Error checking existing subscriber:', checkError);
      return NextResponse.json(
        { error: 'Failed to check subscription status' },
        { status: 500 }
      );
    }

    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      );
    }

    // Insert new subscriber
    const { data, error: insertError } = await supabase
      .from('Newsletter')
      .insert([
        {
          email,
          subscribed_at: new Date().toISOString(),
          is_active: true
        }
      ])
      .select();

    if (insertError) {
      console.error('Error inserting new subscriber:', insertError);
      
      // Check for specific error types
      if (insertError.code === '23505') { // Unique violation
        return NextResponse.json(
          { error: 'Email already subscribed' },
          { status: 400 }
        );
      }
      
      if (insertError.code === '42P01') { // Undefined table
        return NextResponse.json(
          { error: 'Newsletter system is temporarily unavailable' },
          { status: 503 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Successfully subscribed to newsletter',
      data
    });
  } catch (err) {
    console.error('API route error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 