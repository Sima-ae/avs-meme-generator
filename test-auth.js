const { sql } = require('@vercel/postgres');
const bcrypt = require('bcryptjs');

async function testAuth() {
  try {
    console.log('Testing authentication flow...');
    
    // Test the exact query from auth.ts
    const { rows } = await sql`
      SELECT id, email, name, password_hash, role, is_active 
      FROM users 
      WHERE email = 'info@000-it.com' AND is_active = true
    `;

    if (rows.length === 0) {
      console.log('❌ User not found');
      return;
    }

    const user = rows[0];
    console.log('✅ User found:', user.email, user.name, user.role);
    
    // Test password
    const testPassword = 'Admin123!';
    const isPasswordValid = await bcrypt.compare(testPassword, user.password_hash);
    
    if (isPasswordValid) {
      console.log('✅ Password is valid');
      
      // Test the return object format
      const authResult = {
        id: user.id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
      };
      
      console.log('✅ Auth result object:', authResult);
    } else {
      console.log('❌ Password is invalid');
    }
    
  } catch (error) {
    console.error('❌ Error in auth test:', error);
  }
}

testAuth();
