const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client
const supabaseUrl = 'https://bbxmsfmikhbvbweaderx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJieG1zZm1pa2hidmJ3ZWFkZXJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3NDA5ODYsImV4cCI6MjA2MTMxNjk4Nn0.JkxEJlqeorYo8BLYvL8U_W9F0HE3ar_DMVV3Nx654IU';
const supabase = createClient(supabaseUrl, supabaseKey);

// List of universities and their logo filenames
const universities = [
  { name: 'Harvard University', filename: 'harvard-university.png' },
  { name: 'Massachusetts Institute of Technology', filename: 'mit.png' },
  { name: 'Stanford University', filename: 'stanford.png' },
  { name: 'University of Cambridge', filename: 'cambridge.png' },
  { name: 'University of Oxford', filename: 'oxford.png' },
  { name: 'California Institute of Technology', filename: 'caltech.png' },
  { name: 'University of Chicago', filename: 'chicago.png' },
  { name: 'Princeton University', filename: 'princeton.png' },
  { name: 'Yale University', filename: 'yale.png' },
  { name: 'Columbia University', filename: 'columbia.png' },
  { name: 'University of California, Berkeley', filename: 'berkeley.png' },
  { name: 'National University of Singapore', filename: 'nus.png' }
];

async function uploadLogos() {
  console.log('Starting logo upload process...');
  
  for (const uni of universities) {
    try {
      const logoPath = path.join(__dirname, '..', 'public', 'logos', uni.filename);
      
      if (!fs.existsSync(logoPath)) {
        console.log(`Logo file not found for ${uni.name}: ${logoPath}`);
        continue;
      }

      const fileBuffer = fs.readFileSync(logoPath);
      const storagePath = `logos/${uni.filename}`;

      console.log(`Uploading logo for ${uni.name}...`);
      
      const { data, error } = await supabase.storage
        .from('universitylogos')
        .upload(storagePath, fileBuffer, {
          contentType: 'image/png',
          upsert: true
        });

      if (error) {
        console.error(`Error uploading logo for ${uni.name}:`, error.message);
      } else {
        console.log(`Successfully uploaded logo for ${uni.name}`);
      }
    } catch (error) {
      console.error(`Error processing ${uni.name}:`, error.message);
    }
  }

  console.log('Logo upload process completed.');
}

uploadLogos().catch(console.error); 