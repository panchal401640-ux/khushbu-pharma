const { execSync } = require('child_process');
try {
  execSync('cd C:\\Users\\DHRUV\\Documents\\Default\\ Project && node .\\node_modules\\next\\dist\\bin\\next build', { stdio: 'inherit' });
} catch (e) {
  console.error('Build error:', e.message);
}