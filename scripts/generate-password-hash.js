const bcrypt = require('bcryptjs');

async function generatePasswordHash() {
  const password = 'Admin123!';
  const saltRounds = 12;
  
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log('Password:', password);
    console.log('Hash:', hash);
    console.log('\nCopy this hash to your database schema file.');
  } catch (error) {
    console.error('Error generating hash:', error);
  }
}

generatePasswordHash();
