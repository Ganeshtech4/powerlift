module.exports = {
  apps: [
    {
      name: 'rekhapowerlift-backend',
      script: './server/server.js',
      cwd: '/root/Rekhapowerlift',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_file: './server/.env',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
        AWS_ACCESS_KEY_ID: 'YOUR_AWS_ACCESS_KEY_ID',
        AWS_SECRET_ACCESS_KEY: 'YOUR_AWS_SECRET_ACCESS_KEY',
        AWS_REGION: 'ap-south-2',
        AWS_S3_BUCKET_NAME: 'rekhawpc'
      },
      error_file: './logs/backend-error.log',
      out_file: './logs/backend-out.log',
      log_file: './logs/backend-combined.log',
      time: true
    },
    {
      name: 'rekhapowerlift-blog-api',
      script: 'venv/bin/python',
      args: '-m uvicorn main:app --host 0.0.0.0 --port 8000',
      cwd: '/root/Rekhapowerlift/blog-backend',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      interpreter: 'none',
      env: {
        PYTHONUNBUFFERED: '1'
      },
      error_file: './logs/blog-api-error.log',
      out_file: './logs/blog-api-out.log',
      log_file: './logs/blog-api-combined.log',
      time: true
    },
    {
      name: 'rekhapowerlift-frontend',
      script: 'npx',
      args: 'serve -s build -l 3000',
      cwd: '/root/Rekhapowerlift',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: './logs/frontend-error.log',
      out_file: './logs/frontend-out.log',
      log_file: './logs/frontend-combined.log',
      time: true
    }
  ]
};
