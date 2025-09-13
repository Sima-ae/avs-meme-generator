const { sql } = require('@vercel/postgres');
const bcrypt = require('bcryptjs');

async function testLogin() {
  try {
    console.log('Testing login for admin user...');
    
    // Get the admin user
    const { rows } = await sql`
      SELECT id, email, name, password_hash, role, is_active 
      FROM users 
      WHERE email = 'info@000-it.com' AND is_active = true
    `;

    if (rows.length === 0) {
      console.log('Admin user not found');
      return;
    }

    const user = rows[0];
    console.log('Admin user found:', user.email, user.name, user.role);
    
    // Test password
    const testPassword = 'Admin123!';
    const isPasswordValid = await bcrypt.compare(testPassword, user.password_hash);
    
    console.log('Password test result:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('Password is invalid. Generating new hash...');
      const newHash = await bcrypt.hash(testPassword, 12);
      console.log('New hash:', newHash);
      
      // Update the password
      await sql`
        UPDATE users 
        SET password_hash = ${newHash}
        WHERE id = ${user.id}
      `;
      
      console.log('Password updated successfully');
    }
    
  } catch (error) {
    console.error('Error testing login:', error);
  }
}

testLogin();
