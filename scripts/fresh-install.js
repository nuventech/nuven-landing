import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

const isWindows = os.platform() === 'win32';

try {
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');
  if (fs.existsSync(nodeModulesPath)) {
    console.log('🗑️  Eliminando node_modules...');
    if (isWindows) {
      execSync(`rmdir /s /q "${nodeModulesPath}"`, {
        stdio: 'inherit',
        shell: true,
      });
    } else {
      execSync(`rm -rf "${nodeModulesPath}"`, { stdio: 'inherit' });
    }
    console.log('✅ node_modules eliminado');
  } else {
    console.log('ℹ️  No se encontró node_modules');
  }

  const lockFilePath = path.join(process.cwd(), 'bun.yaml');
  if (fs.existsSync(lockFilePath)) {
    console.log('🗑️  Eliminando bun.yaml...');
    if (isWindows) {
      execSync(`del "${lockFilePath}"`, { stdio: 'inherit', shell: true });
    } else {
      fs.unlinkSync(lockFilePath);
    }
    console.log('✅ bun.yaml eliminado');
  } else {
    console.log('ℹ️  No se encontró bun.yaml');
  }

  console.log('📦 Instalando dependencias...');
  execSync('bun install', { stdio: 'inherit', shell: isWindows });

  console.log('✨ ¡Proceso completado con éxito!');
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
