import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// ============================================
// NexaFlow — Supabase Connection
// ============================================

// Replace with your Supabase project credentials
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================
// Submit Contact Form
// ============================================
async function submitLead(email, message) {
  const { data, error } = await supabase
    .from('leads')
    .insert([
      {
        email,
        message,
        status: 'new',
        source: 'landing_page'
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error submitting lead:', error);
    throw error;
  }

  return data;
}

// ============================================
// Fetch Services (for dynamic rendering)
// ============================================
async function fetchServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching services:', error);
    throw error;
  }

  return data;
}

// ============================================
// Fetch Site Stats
// ============================================
async function fetchSiteStats() {
  const { data, error } = await supabase
    .from('site_stats')
    .select('*');

  if (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }

  return data;
}

// ============================================
// Form Handler
// ============================================
async function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const email = form.querySelector('input[type="email"]').value;
  const message = form.querySelector('textarea').value;
  const btn = form.querySelector('button[type="submit"]');

  // Disable button during submission
  btn.disabled = true;
  btn.textContent = 'Sending...';

  try {
    await submitLead(email, message);
    alert('Thanks! We\'ll be in touch within 24 hours.');
    form.reset();
  } catch (err) {
    alert('Something went wrong. Please try again or email us directly.');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Send Message';
  }
}

// ============================================
// Initialize
// ============================================
// Attach form handler
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }

  // Optionally load dynamic services
  // fetchServices().then(services => console.log(services));
  // fetchSiteStats().then(stats => console.log(stats));
});

// Export for use in other modules
export { submitLead, fetchServices, fetchSiteStats };
