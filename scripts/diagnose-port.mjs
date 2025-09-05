#!/usr/bin/env node
import { execSync } from 'node:child_process';

const port = process.argv[2] || '5173';
console.log('检查端口:', port);
try {
  const lsof = execSync(`lsof -nP -iTCP:${port} -sTCP:LISTEN || true`).toString();
  console.log('监听进程:\n', lsof || '(无)');
} catch {}
try {
  const curl = execSync(`curl -I --max-time 2 http://localhost:${port}/ || true`).toString();
  console.log('curl 结果:\n', curl);
} catch {}
console.log('完成');
