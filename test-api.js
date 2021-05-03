const { spawn } = require('child_process');

function run(script) {
  const proc = spawn('npm', ['run', script], {
    stdio: 'inherit',
    shell: true,
  });
  process.on('SIGTERM', () => proc.kill('SIGTERM'));
  process.on('SIGINT', () => proc.kill('SIGINT'));
  process.on('SIGBREAK', () => proc.kill('SIGBREAK'));
  process.on('SIGHUP', () => proc.kill('SIGHUP'));
  proc.on('exit', (code, signal) => {
    process.exit(code ? code : signal === 'SIGINT' ? 0 : 1);
  });
}

run('start:server');
run('test:server');
