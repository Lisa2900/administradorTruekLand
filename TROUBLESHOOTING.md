# 🔧 Troubleshooting Guide - Environment Variables

## ❌ Common Error: "Missing required environment variable"

### Quick Fix Steps:

1. **Restart the Development Server**
   ```bash
   # Stop the current server (Ctrl+C)
   pnpm dev
   ```

2. **Check Environment Files**
   - Ensure `.env` file exists with all required variables
   - Ensure `.env.local` file exists (if using local overrides)
   - Variables must start with `NEXT_PUBLIC_` for client-side access

3. **Verify Variable Names**
   ```env
   # ✅ Correct format
   NEXT_PUBLIC_FIREBASE_API_KEY=your_key_here
   
   # ❌ Wrong format
   FIREBASE_API_KEY=your_key_here
   ```

4. **Check File Location**
   - Environment files should be in the project root
   - Same level as `package.json` and `next.config.js`

5. **Verify File Content**
   - No spaces around the `=` sign
   - No quotes around values (unless the value contains spaces)
   - No comments on the same line as variables

### Required Environment Variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Environment File Priority (Next.js):

1. `.env.local` (highest priority, ignored by git)
2. `.env.development` (when NODE_ENV=development)
3. `.env.production` (when NODE_ENV=production)
4. `.env` (lowest priority, can be committed)

### Debug Commands:

```bash
# Check if environment variables are loaded
echo $NEXT_PUBLIC_FIREBASE_API_KEY  # Linux/Mac
echo $env:NEXT_PUBLIC_FIREBASE_API_KEY  # Windows PowerShell

# Check Next.js environment loading
pnpm dev --debug
```

### 🔍 Debug Tips:

1. **Check Browser Console**: Environment variables are logged on app start
2. **Verify Port**: Development server might start on different port if 3000 is busy
3. **Clear Cache**: Delete `.next` folder and restart
4. **Check Syntax**: Use environment checker in `lib/env-check.ts`

### 🚨 Security Note:

- Never commit `.env.local` to version control
- Only `NEXT_PUBLIC_*` variables are exposed to the browser
- Keep sensitive keys in server-only variables (without `NEXT_PUBLIC_`)

### ✅ Resolution Checklist:

- [ ] Environment files exist in project root
- [ ] All required variables are defined
- [ ] Variable names start with `NEXT_PUBLIC_`
- [ ] Development server restarted after changes
- [ ] No syntax errors in environment files
- [ ] Files are not ignored by `.gitignore`
