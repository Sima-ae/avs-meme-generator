const { sql } = require('@vercel/postgres');

async function checkUsers() {
  try {
    console.log('Checking users in database...');
    const { rows } = await sql`SELECT id, email, name, role, is_active FROM users ORDER BY id`;
    
    if (rows.length === 0) {
      console.log('No users found in database');
    } else {
      console.log('Users found:');
      rows.forEach(user => {
        console.log(`- ID: ${user.id}, Email: ${user.email}, Name: ${user.name}, Role: ${user.role}, Active: ${user.is_active}`);
      });
    }
  } catch (error) {
    console.error('Error checking users:', error);
  }
}

checkUsers();
