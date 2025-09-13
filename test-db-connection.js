const { sql } = require('@vercel/postgres');

async function testDbConnection() {
  console.log('Testing database connection...');
  
  for (let i = 0; i < 5; i++) {
    try {
      console.log(`Test ${i + 1}:`);
      const { rows } = await sql`
        SELECT id, email, name, role, is_active 
        FROM users 
        WHERE email = 'info@000-it.com' AND is_active = true
      `;
      console.log(`  - Query successful, found ${rows.length} users`);
      if (rows.length > 0) {
        console.log(`  - User: ${rows[0].email}, Role: ${rows[0].role}`);
      }
    } catch (error) {
      console.log(`  - Query failed:`, error.message);
    }
    
    // Wait a bit between tests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

testDbConnection();
