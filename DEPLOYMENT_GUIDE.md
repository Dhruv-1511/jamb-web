# Deployment Guide: Web App & Sanity Studio to Vercel

This guide will walk you through deploying both your Next.js web app and Sanity Studio.

## Prerequisites

- A GitHub account
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- A Sanity account (you should already have one from setup)
- Your project pushed to a GitHub repository

---

## Part 1: Deploy Next.js Web App to Vercel

### Step 1: Push Your Code to GitHub

1. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new repository on GitHub and push:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```

### Step 2: Create Vercel Project

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `apps/web` ⚠️ **IMPORTANT**
   - **Build Command**: Leave default (Vercel will use `vercel.json` config)
   - **Output Directory**: `.next` (default - Vercel will use `vercel.json` config)
   - **Install Command**: Leave default (Vercel will use `vercel.json` config)

**Note**: The `vercel.json` file in your project root is already configured. Vercel will automatically detect it and use the correct build commands for your monorepo setup.

### Step 3: Configure Environment Variables in Vercel

Go to **Settings** → **Environment Variables** and add:

#### Required Client Variables:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SANITY_STUDIO_URL=https://your-studio-hostname.sanity.studio
```

#### Required Server Variables:
```
SANITY_API_READ_TOKEN=your-read-token
SANITY_API_WRITE_TOKEN=your-write-token
```

**How to get your tokens:**
1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Go to **API** → **Tokens**
4. Create tokens with appropriate permissions:
   - **Read token**: For fetching content
   - **Write token**: For mutations (if needed)

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete
3. Your web app will be live at `https://your-project.vercel.app`

**Note**: The `vercel.json` file in the root is already configured for this setup.

---

## Part 2: Deploy Sanity Studio to Vercel

You can deploy Sanity Studio to Vercel alongside your web app. This keeps everything in one place!

### Step 1: Create Second Vercel Project for Studio

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import the **same** GitHub repository
4. Configure the project:
   - **Framework Preset**: Other (or Static Site)
   - **Root Directory**: `apps/studio` ⚠️ **IMPORTANT**
   - **Build Command**: Leave default (Vercel will use `apps/studio/vercel.json` config)
   - **Output Directory**: `dist` (Vercel will use `apps/studio/vercel.json` config)
   - **Install Command**: Leave default (Vercel will use `apps/studio/vercel.json` config)

**Note**: The `apps/studio/vercel.json` file is already configured for this setup.

### Step 2: Configure Environment Variables for Studio

Go to **Settings** → **Environment Variables** and add:

```
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_TITLE=Your Studio Title
SANITY_STUDIO_PRESENTATION_URL=https://your-web-app.vercel.app
```

**Note**: You don't need `SANITY_STUDIO_PRODUCTION_HOSTNAME` when deploying to Vercel - Vercel will provide the URL.

### Step 3: Deploy Studio

1. Click **"Deploy"**
2. Wait for the build to complete
3. Your studio will be live at `https://your-studio-project.vercel.app`

### Step 4: Update Web App Environment Variables

After the studio is deployed, update your web app's environment variables:

1. Go to your **web app** Vercel project
2. Navigate to **Settings** → **Environment Variables**
3. Update `NEXT_PUBLIC_SANITY_STUDIO_URL` to your Vercel studio URL:
   ```
   NEXT_PUBLIC_SANITY_STUDIO_URL=https://your-studio-project.vercel.app
   ```
4. Redeploy your web app

---

## Alternative: Deploy Studio to Sanity Hosting

If you prefer to use Sanity's hosting instead of Vercel for the studio, you can use the GitHub Actions workflow or manual deployment method below.

### Option A: Automatic Deployment via GitHub Actions

#### Step 1: Set Up GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"** and add:

```
SANITY_DEPLOY_TOKEN=your-deploy-token
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_TITLE=Your Studio Title
SANITY_STUDIO_PRESENTATION_URL=https://your-web-app.vercel.app
SANITY_STUDIO_PRODUCTION_HOSTNAME=your-studio-hostname
```

**How to get SANITY_DEPLOY_TOKEN:**
1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Go to **API** → **Tokens**
4. Create a token with **Deploy Studio** permission

**About SANITY_STUDIO_PRODUCTION_HOSTNAME:**
- This will be your studio subdomain
- Example: If you set `my-project`, your studio will be at `https://my-project.sanity.studio`
- For PR previews, it will be `<branch-name>-my-project.sanity.studio`

#### Step 2: Move GitHub Workflow (if needed)

The workflow file is in `github/workflows/deploy-sanity.yml`. For GitHub Actions to work, it needs to be in `.github/workflows/`:

1. Create `.github` folder in root (if it doesn't exist):
   ```bash
   mkdir -p .github/workflows
   ```

2. Copy the workflow file:
   ```bash
   cp github/workflows/deploy-sanity.yml .github/workflows/deploy-sanity.yml
   ```

3. Commit and push:
   ```bash
   git add .github
   git commit -m "Add GitHub Actions workflow for Sanity Studio deployment"
   git push
   ```

#### Step 3: Trigger Deployment

The workflow will automatically deploy when:
- You push changes to `apps/studio/**`
- You manually trigger it from **Actions** tab in GitHub

Your studio will be live at: `https://<SANITY_STUDIO_PRODUCTION_HOSTNAME>.sanity.studio`

---

### Option B: Manual Deployment to Sanity

#### Step 1: Set Environment Variables Locally

Create a `.env.local` file in `apps/studio/`:

```env
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_TITLE=Your Studio Title
SANITY_STUDIO_PRESENTATION_URL=https://your-web-app.vercel.app
```

#### Step 2: Deploy

1. Navigate to the studio directory:
   ```bash
   cd apps/studio
   ```

2. Authenticate with Sanity (if not already):
   ```bash
   npx sanity login
   ```

3. Deploy:
   ```bash
   npx sanity deploy
   ```

4. Follow the prompts:
   - Choose a hostname (e.g., `my-project`)
   - Your studio will be at `https://my-project.sanity.studio`

---

## Part 3: Summary - Both Apps on Vercel

After deploying both apps to Vercel, you'll have:

- **Web App**: `https://your-web-project.vercel.app`
- **Sanity Studio**: `https://your-studio-project.vercel.app`

Both are now hosted on Vercel and will automatically deploy when you push changes to your GitHub repository!

---

## Troubleshooting

### Web App Issues

**Build fails:**
- Check that `Root Directory` is set to `apps/web` in Vercel
- Verify all environment variables are set
- Check build logs in Vercel dashboard

**Can't connect to Sanity:**
- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` are correct
- Check that your Sanity tokens have the right permissions

### Studio Deployment Issues

**GitHub Actions fails:**
- Verify all secrets are set correctly
- Check that the workflow file is in `.github/workflows/` (not `github/workflows/`)
- Ensure `SANITY_DEPLOY_TOKEN` has deploy permissions

**Manual deploy fails:**
- Make sure you're logged in: `npx sanity login`
- Verify environment variables in `apps/studio/.env.local`
- Check that your project ID is correct

### Preview Mode Not Working

- Ensure `NEXT_PUBLIC_SANITY_STUDIO_URL` points to your deployed studio
- Check that your browser allows third-party cookies (required for live preview)
- Verify the preview URL in Sanity Studio settings matches your Vercel URL

---

## Quick Reference

### Vercel Configuration

**Web App Project:**
- **Root Directory**: `apps/web`
- **Build Command**: `cd ../.. && pnpm turbo build --filter=web`
- **Output Directory**: `.next`

**Studio Project:**
- **Root Directory**: `apps/studio`
- **Build Command**: `cd ../.. && pnpm turbo build --filter=studio`
- **Output Directory**: `dist`

### Required Environment Variables

**Vercel (Web App):**
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `NEXT_PUBLIC_SANITY_STUDIO_URL` (set to your Vercel studio URL)
- `SANITY_API_READ_TOKEN`
- `SANITY_API_WRITE_TOKEN`

**Vercel (Studio):**
- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`
- `SANITY_STUDIO_TITLE`
- `SANITY_STUDIO_PRESENTATION_URL` (set to your Vercel web app URL)

**GitHub Secrets (if using Sanity hosting for Studio):**
- `SANITY_DEPLOY_TOKEN`
- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`
- `SANITY_STUDIO_TITLE`
- `SANITY_STUDIO_PRESENTATION_URL`
- `SANITY_STUDIO_PRODUCTION_HOSTNAME`

---

## Next Steps

1. ✅ Test your deployed web app
2. ✅ Test your deployed studio
3. ✅ Try creating content in the studio and see it appear on the web app
4. ✅ Set up custom domain (optional) in Vercel settings
5. ✅ Invite team members to your Sanity project

---

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Deploy Guide](https://www.sanity.io/docs/deployment)

