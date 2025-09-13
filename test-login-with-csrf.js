const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testLoginWithCSRF() {
  try {
    console.log('Testing login with CSRF token...');
    
    // First, get the CSRF token
    const csrfResponse = await fetch('http://localhost:3000/api/auth/csrf');
    const csrfData = await csrfResponse.json();
    console.log('CSRF token:', csrfData.csrfToken);
    
    // Now test the login
    const loginResponse = await fetch('http://localhost:3000/api/auth/callback/credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email: 'info@000-it.com',
        password: 'Admin123!',
        csrfToken: csrfData.csrfToken,
        redirect: 'false'
      })
    });
    
    console.log('Login response status:', loginResponse.status);
    const loginData = await loginResponse.text();
    console.log('Login response:', loginData);
    
  } catch (error) {
    console.error('Error testing login with CSRF:', error);
  }
}

testLoginWithCSRF();
