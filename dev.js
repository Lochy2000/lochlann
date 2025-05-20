import { spawn } from 'child_process';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('Starting backend and frontend servers...');

// Start the backend server
const backendProcess = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname,
});

// Start the frontend server
const frontendProcess = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true,
  cwd: resolve(__dirname, 'blog'),
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down servers...');
  backendProcess.kill();
  frontendProcess.kill();
  process.exit();
});

backendProcess.on('close', (code) => {
  console.log(`Backend server exited with code ${code}`);
  frontendProcess.kill();
  process.exit(code);
});

frontendProcess.on('close', (code) => {
  console.log(`Frontend server exited with code ${code}`);
  backendProcess.kill();
  process.exit(code);
});
