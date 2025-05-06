import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const studyLevel = searchParams.get('studyLevel');
    const country = searchParams.get('country');
    const subject = searchParams.get('subject');
    const minCGPA = searchParams.get('minCGPA');
    const scholarships = searchParams.get('scholarships');
    const keyword = searchParams.get('keyword');
    const sortBy = searchParams.get('sortBy') || 'worldranking';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const perPage = parseInt(searchParams.get('perPage') || '12', 10);
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    let query = supabase.from('University').select('*');

    if (studyLevel) {
      query = query.contains('studylevels', [studyLevel.toLowerCase()]);
    }
    if (country) {
      query = query.eq('country', country);
    }
    if (subject) {
      query = query.contains('subjects', [subject]);
    }
    if (minCGPA) {
      query = query.gte('mincgpa', parseFloat(minCGPA));
    }
    if (scholarships) {
      query = query.eq('scholarships', scholarships === 'true');
    }
    if (keyword) {
      query = query.or(`name.ilike.%${keyword}%, country.ilike.%${keyword}%, subjects.cs.{${keyword}}`);
    }

    // Handle sorting
    if (sortBy === 'worldranking') {
      query = query.order('worldranking', { ascending: true });
    } else if (sortBy === 'name') {
      query = query.order('name', { ascending: true });
    } else if (sortBy === 'mincgpa') {
      query = query.order('mincgpa', { ascending: false });
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error('API route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 