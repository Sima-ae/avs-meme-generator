const { sql } = require('@vercel/postgres');
const bcrypt = require('bcryptjs');

async function debugAuth() {
  try {
    console.log('=== Debugging Authentication ===');
    
    // Check if user exists
    const { rows } = await sql`
      SELECT id, email, name, password_hash, role, is_active 
      FROM users 
      WHERE email = 'info@000-it.com'
    `;
    
    console.log('Users found:', rows.length);
    
    if (rows.length > 0) {
      const user = rows[0];
      console.log('User details:', {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        is_active: user.is_active,
        password_hash_length: user.password_hash?.length
      });
      
      // Test password
      const testPassword = 'Admin123!';
      const isPasswordValid = await bcrypt.compare(testPassword, user.password_hash);
      console.log('Password test result:', isPasswordValid);
      
      // Test with different password
      const wrongPassword = 'wrongpassword';
      const isWrongPasswordValid = await bcrypt.compare(wrongPassword, user.password_hash);
      console.log('Wrong password test result:', isWrongPasswordValid);
    } else {
      console.log('No user found with email: info@000-it.com');
    }
    
  } catch (error) {
    console.error('Debug error:', error);
  }
}

debugAuth();
