# How to Verify and Fix Root Directory in Render

## Step-by-Step Verification

### Step 1: Check Current Root Directory Setting

1. Go to: https://dashboard.render.com
2. Click on your **Frontend Service** (exec-connect-frontend)
3. Click on **"Settings"** tab (left sidebar)
4. Scroll down to **"Build & Deploy"** section
5. Look for the **"Root Directory"** field

**What you should see:**

- Field should contain: `frontend`
- **NOT**: empty, `/frontend`, `./frontend`, or anything else
- Just exactly: `frontend`

### Step 2: Fix Root Directory (if incorrect)

If the Root Directory is NOT set to `frontend`:

1. Click inside the **"Root Directory"** field
2. **Select all text** (Ctrl+A or Cmd+A) and delete it
3. Type exactly: `frontend` (lowercase, no quotes, no slashes)
4. Scroll to the bottom of the Settings page
5. Click **"Save Changes"** button
6. Wait for the save confirmation

### Step 3: Redeploy

After saving:

1. Go back to your service dashboard (click service name at top)
2. Look for **"Manual Deploy"** dropdown button
3. Click it → Select **"Deploy latest commit"**
4. Watch the build logs

### Step 4: Verify Build Logs

In the build logs, you should see:

```
==> Running build command 'npm install && npm run build'...
==> cd frontend  <-- This confirms Root Directory is working
```

If you DON'T see `cd frontend` in the logs, the Root Directory isn't being applied.

## Alternative: Use Render Blueprint

If manual setting doesn't work, use the blueprint approach:

1. **Commit and push the `render.yaml` file**:

   ```bash
   git add render.yaml
   git commit -m "Add render.yaml blueprint"
   git push
   ```

2. Go to Render Dashboard
3. Click **"New +"** → **"Blueprint"**
4. Select your repository
5. Render will read `render.yaml` and create services with correct settings
6. If you already have services, you can delete them and let the blueprint recreate them

## Troubleshooting

### "Root Directory field doesn't exist"

- You might be looking at the wrong service
- Make sure you're on the **Frontend** service, not Backend or Database
- The field is in Settings → Build & Deploy section

### "I set it but it's still failing"

- Clear any build cache if available
- Try deleting and recreating the service
- Double-check there are no hidden characters in the field

### "Build still can't find components"

- Verify files are in git: `git ls-files | grep components/layout`
- Try the Blueprint method instead
- Check build logs to see which directory it's building from

## Quick Test

After setting Root Directory, check the build log. You should see the build running from the frontend directory, and files should be found.
