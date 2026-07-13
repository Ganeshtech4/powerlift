# SSH Key Setup Guide for GitHub Actions Deployment

This guide will help you set up SSH key authentication for automated deployments from GitHub Actions to your production server.

## Why SSH Keys Instead of Passwords?

- **More Reliable**: SSH keys work better with automated systems
- **More Secure**: No password stored in secrets
- **Better Error Handling**: Faster connection failures instead of timeouts
- **Industry Standard**: Recommended by GitHub and security experts

## Step 1: Generate SSH Key Pair

On your **local machine** or any computer with SSH:

```bash
# Generate a new SSH key pair specifically for GitHub Actions
ssh-keygen -t rsa -b 4096 -f github-actions-deploy -C "github-actions@powerlift"

# This creates two files:
# - github-actions-deploy (private key - keep this secret!)
# - github-actions-deploy.pub (public key - goes on server)
```

When prompted:
- **Enter passphrase**: Leave empty (press Enter twice) - GitHub Actions needs passwordless access

## Step 2: Add Public Key to Your Server

Copy the **public key** to your production server:

```bash
# Display the public key
cat github-actions-deploy.pub

# SSH into your server
ssh root@your-server-ip

# Add the public key to authorized_keys
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "YOUR_PUBLIC_KEY_CONTENT_HERE" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

**OR** use ssh-copy-id (easier):
```bash
ssh-copy-id -i github-actions-deploy.pub root@your-server-ip
```

## Step 3: Add Private Key to GitHub Secrets

1. Go to your GitHub repository: https://github.com/Ganeshtech4/powerlift
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secret:

### Required Secret:

**Name**: `SSH_PRIVATE_KEY`
**Value**: Copy the entire contents of the **private key** file:
```bash
cat github-actions-deploy
```
Copy everything including:
```
-----BEGIN OPENSSH PRIVATE KEY-----
...entire key content...
-----END OPENSSH PRIVATE KEY-----
```

### Keep Existing Secrets:

Make sure these secrets are still configured:
- `SERVER_HOST` - Your server IP or domain (e.g., `rekhapowerlift.com` or `123.456.789.0`)
- `SERVER_USER` - SSH username (usually `root` or your username)
- `DEPLOY_PATH` - Deployment directory (e.g., `/var/www/rekhapowerlift/frontend`)

**Note**: You can now **remove** `SERVER_PASSWORD` secret as it's no longer needed!

## Step 4: Test the SSH Connection

From your local machine, test the connection using the new key:

```bash
ssh -i github-actions-deploy root@your-server-ip
```

If successful, you should log in without a password!

## Step 5: Verify Server Accessibility

Make sure your server allows SSH connections from GitHub Actions:

### Check SSH is Running:
```bash
sudo systemctl status ssh
# or
sudo systemctl status sshd
```

### Check Firewall Rules:
```bash
# Ubuntu/Debian
sudo ufw status
sudo ufw allow 22/tcp  # If SSH is blocked

# CentOS/RHEL
sudo firewall-cmd --list-all
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --reload
```

### GitHub Actions IP Ranges (Optional - For Restricted Firewalls):

If your server firewall only allows specific IPs, you'll need to allow GitHub Actions IP ranges:
- **Meta API**: https://api.github.com/meta
- Download the IP ranges and add them to your firewall whitelist

**Note**: GitHub's IPs change frequently, so this approach requires maintenance.

## Step 6: Commit and Push

After updating the secrets, commit and push your changes:

```bash
git add .github/workflows/deploy.yml
git commit -m "Update deployment to use SSH keys instead of password"
git push origin main
```

The deployment should now work automatically!

## Troubleshooting

### Still Getting "Connection Timed Out"?

1. **Verify server is accessible**:
   ```bash
   ping your-server-ip
   telnet your-server-ip 22
   ```

2. **Check if SSH is listening on port 22**:
   ```bash
   ssh root@your-server-ip -v  # Verbose mode shows connection details
   ```

3. **Verify the private key format**:
   - Make sure you copied the ENTIRE key including BEGIN/END lines
   - No extra spaces or line breaks

4. **Check GitHub Actions logs**:
   - Go to Actions tab in your repo
   - Click on the failed run
   - Check "Test SSH Connection" step for detailed error

### Alternative: Use Different Deployment Method

If SSH continues to fail, consider these alternatives:

1. **FTP/SFTP Deployment** using GitHub Actions
2. **Deploy via GitHub Pages** (if static site)
3. **Use a CI/CD service** like Vercel, Netlify, or Render
4. **Manual deployment** using GitHub releases

## Security Best Practices

✅ **Do**:
- Use SSH keys instead of passwords
- Restrict the deploy key to only the necessary directories
- Regularly rotate SSH keys
- Use a dedicated deployment user (not root)

❌ **Don't**:
- Never commit private keys to the repository
- Don't share the private key
- Don't use the same key for multiple purposes

## Need Help?

If you're still experiencing issues:
1. Check the GitHub Actions logs for specific errors
2. Verify all secrets are correctly configured
3. Test SSH connection manually from your local machine
4. Check server logs: `sudo tail -f /var/log/auth.log`
