import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const filePath = 'import.txt';

const packages = readFileSync(filePath, 'utf-8').split('\n').filter(line => line.trim() !== '');

for (const pkg of packages) {
  console.log(`Installing ${pkg}...`);
  try {
    execSync(`npm install ${pkg}`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to install ${pkg}:`, error.message);
  }
}

console.log('All packages installed.');
