# Quick Guide: Deploy Both Apps to Vercel

This guide will help you deploy both your Next.js web app and Sanity Studio to Vercel.

## Overview

You'll create **two separate Vercel projects** from the same GitHub repository:
1. **Web App** - Your Next.js frontend (`apps/web`)
2. **Sanity Studio** - Your content management interface (`apps/studio`)

---

## Step 1: Deploy Web App to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Root Directory**: `apps/web`
   - **Framework Preset**: Next.js (auto-detected)
   - Build settings will be auto-detected from `vercel.json`

5. Add Environment Variables:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   SANITY_API_READ_TOKEN=your-read-token
   SANITY_API_WRITE_TOKEN=your-write-token
   ```
   ⚠️ **Note**: Set `NEXT_PUBLIC_SANITY_STUDIO_URL` after deploying the studio (Step 2)

6. Click **"Deploy"**
7. Your web app will be live at `https://your-web-project.vercel.app`

---

## Step 2: Deploy Sanity Studio to Vercel

1. In Vercel, click **"Add New..."** → **"Project"** again
2. Import the **same** GitHub repository
3. Configure:
   - **Root Directory**: `apps/studio`
   - **Framework Preset**: Other (or Static Site)
   - Build settings will be auto-detected from `apps/studio/vercel.json`

4. Add Environment Variables:
   ```
   SANITY_STUDIO_PROJECT_ID=your-project-id
   SANITY_STUDIO_DATASET=production
   SANITY_STUDIO_TITLE=Your Studio Title
   SANITY_STUDIO_PRESENTATION_URL=https://your-web-project.vercel.app
   ```

5. Click **"Deploy"**
6. Your studio will be live at `https://your-studio-project.vercel.app`

---

## Step 3: Link Them Together

1. Go back to your **Web App** project in Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add/Update:
   ```
   NEXT_PUBLIC_SANITY_STUDIO_URL=https://your-studio-project.vercel.app
   ```
4. Redeploy your web app (or wait for next deployment)

---

## Result

✅ **Web App**: `https://your-web-project.vercel.app`  
✅ **Sanity Studio**: `https://your-studio-project.vercel.app`

Both apps will automatically deploy when you push changes to GitHub!

---

## Custom Domains

You can add custom domains to either project:
- Go to **Settings** → **Domains** in each Vercel project
- Add your domain and follow DNS setup instructions

---

## Troubleshooting

**Studio shows blank page:**
- Check that `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` are set correctly
- Verify the build completed successfully in Vercel logs

**Preview mode not working:**
- Ensure `SANITY_STUDIO_PRESENTATION_URL` points to your web app URL
- Ensure `NEXT_PUBLIC_SANITY_STUDIO_URL` points to your studio URL
- Check that your browser allows third-party cookies

**Build fails:**
- Verify Root Directory is set correctly (`apps/web` or `apps/studio`)
- Check that all environment variables are set
- Review build logs in Vercel dashboard

---

For more detailed information, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

