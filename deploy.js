const { execSync } = require('child_process');
const path = require('path');

const projectDir = path.join('C:', 'Users', 'DHRUV', 'Documents', 'Default Project');

try {
  console.log('Installing vercel CLI globally...');
  execSync('npm install -g vercel@latest', { 
    stdio: 'inherit', 
    timeout: 300000 
  });
  console.log('Vercel CLI installed successfully!');
} catch(e) {
  console.error('Install error:', e.message);
}

try {
  console.log('Running vercel deploy...');
  execSync('vercel --yes --prod', { 
    stdio: 'inherit', 
    timeout: 300000,
    cwd: projectDir
  });
  console.log('Deploy complete!');
} catch(e) {
  console.error('Deploy error:', e.message);
}
