const API_URL = process.env.REACT_APP_GSHEETS_API_URL;
const APPROVED_COLUMN = 'Approved';

const mapRow = (row) => ({
  quote: row.Quote || '',
  author: row.Author || '',
  role: row[' Role'] || '',
  company: row.Company || '',
  linkedin: row['LinkedIn URL'] || '',
  relationship: row[' Relationship'] || '',
});

export const fetchTestimonials = async () => {
  if (!API_URL) return [];
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return (Array.isArray(data) ? data : [])
      .filter((row) => String(row[APPROVED_COLUMN]).toUpperCase() === 'TRUE')
      .map(mapRow);
  } catch {
    return [];
  }
};

export const submitTestimonial = async (formData) => {
  if (!API_URL) return { success: false, error: 'API not configured' };
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {
          Timestamp: new Date().toLocaleString('en-CA', { timeZone: 'America/Edmonton' }),
          Quote: formData.quote,
          Author: formData.author,
          ' Role': formData.role || '',
          Company: formData.company || '',
          'LinkedIn URL': formData.linkedin || '',
          ' Relationship': formData.relationship || '',
          Approved: 'FALSE',
        },
      }),
    });
    const text = await res.text();
    const json = JSON.parse(text);
    return { success: true, data: json };
  } catch {
    return { success: false, error: 'Network error' };
  }
};
