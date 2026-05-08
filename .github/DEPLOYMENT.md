# GitHub Actions Deployment Setup

This project uses GitHub Actions to automatically deploy the React frontend to the production server when changes are pushed to the `main` branch.

## 🔐 Required GitHub Secrets

You need to configure the following secrets in your GitHub repository:

### How to Add Secrets:
1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each of the following secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `SERVER_HOST` | `72.61.226.238` | Production server IP address |
| `SERVER_USER` | `root` | SSH username for the server |
| `SERVER_PASSWORD` | `Rekhawpc@2023` | SSH password for the server |
| `DEPLOY_PATH` | `/var/www/rekhapowerlift/frontend` | Deployment directory path |

## 🚀 How It Works

### Automatic Deployment
When you push code to the `main` branch:
1. GitHub Actions automatically triggers
2. Builds the React production bundle
3. Deploys files to the production server via SCP
4. Cleans up old bundle files (keeps only latest)
5. Verifies the deployment

### Manual Deployment
You can also trigger deployment manually:
1. Go to **Actions** tab in GitHub
2. Select **Deploy to Production Server** workflow
3. Click **Run workflow** → **Run workflow**

## 📋 Workflow Steps

1. **Checkout code** - Clones the repository
2. **Setup Node.js** - Installs Node.js 18 with npm cache
3. **Install dependencies** - Runs `npm ci` for clean install
4. **Build** - Creates production build with `npm run build`
5. **Deploy** - Uploads files to server using SCP
6. **Cleanup** - Removes old bundle files, keeps only latest
7. **Verify** - Checks deployment was successful

## 📊 Monitoring Deployments

- View deployment status in the **Actions** tab
- Each deployment shows detailed logs
- Successful deployments show a summary with server info

## 🔧 Local Deployment (Fallback)

If you need to deploy manually from your local machine:

```powershell
# Build the project
npm run build

# Deploy to server
scp -r build\* root@72.61.226.238:/var/www/rekhapowerlift/frontend/

# Clean up old bundles
ssh root@72.61.226.238 "cd /var/www/rekhapowerlift/frontend/static/js && ls -t main.*.js | tail -n +2 | xargs -r rm -f"
ssh root@72.61.226.238 "cd /var/www/rekhapowerlift/frontend/static/css && ls -t main.*.css | tail -n +2 | xargs -r rm -f"
```

## 🛡️ Security Notes

- GitHub secrets are encrypted and not visible in logs
- SSH password authentication is used (consider switching to SSH keys for better security)
- `StrictHostKeyChecking=no` is used to bypass host key verification (acceptable for CI/CD)

## 🔄 Alternative: SSH Key Authentication (Recommended)

For better security, consider using SSH keys instead of passwords:

1. Generate SSH key on your local machine:
   ```bash
   ssh-keygen -t ed25519 -C "github-actions-deploy"
   ```

2. Add public key to server's `~/.ssh/authorized_keys`

3. Add private key as GitHub secret `SSH_PRIVATE_KEY`

4. Update workflow to use key-based auth instead of sshpass

## 📝 Files Deployed

- `build/index.html` - Main HTML file
- `build/static/js/` - JavaScript bundles
- `build/static/css/` - CSS bundles
- `build/static/media/` - Images and media files
- `build/manifest.json` - PWA manifest
- `build/robots.txt` - SEO robots file
- `build/*.png, *.ico` - Favicons and icons

## ⚡ Performance

- Uses `npm ci` for faster, reproducible builds
- Caches npm dependencies between runs
- Only uploads changed files
- Automatic cleanup prevents disk space buildup

## 🐛 Troubleshooting

### Deployment Fails
- Check GitHub Actions logs for errors
- Verify server credentials in secrets
- Ensure server has enough disk space
- Check server SSH access is working

### Build Fails
- Check for TypeScript/ESLint errors locally
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

### Files Not Updating
- Clear browser cache (Ctrl+F5)
- Check deployed bundle names match index.html
- Verify file permissions on server
