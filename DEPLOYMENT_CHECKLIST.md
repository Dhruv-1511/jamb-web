# Quick Deployment Checklist

Use this checklist to ensure you have everything ready before deploying.

## Pre-Deployment Checklist

### ✅ Sanity Setup
- [ ] Sanity project created
- [ ] Project ID noted
- [ ] Dataset name noted (usually `production`)
- [ ] Read token created
- [ ] Write token created
- [ ] Deploy token created (for studio deployment)

### ✅ GitHub Setup
- [ ] Repository created on GitHub
- [ ] Code pushed to GitHub
- [ ] GitHub Secrets configured (for studio deployment):
  - [ ] `SANITY_DEPLOY_TOKEN`
  - [ ] `SANITY_STUDIO_PROJECT_ID`
  - [ ] `SANITY_STUDIO_DATASET`
  - [ ] `SANITY_STUDIO_TITLE`
  - [ ] `SANITY_STUDIO_PRESENTATION_URL` (set after Vercel deployment)
  - [ ] `SANITY_STUDIO_PRODUCTION_HOSTNAME`

### ✅ Vercel Setup
- [ ] Vercel account created
- [ ] Project created and connected to GitHub repo
- [ ] Root Directory set to: `apps/web`
- [ ] Environment Variables configured:
  - [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - [ ] `NEXT_PUBLIC_SANITY_DATASET`
  - [ ] `NEXT_PUBLIC_SANITY_API_VERSION` (e.g., `2024-01-01`)
  - [ ] `NEXT_PUBLIC_SANITY_STUDIO_URL` (set after studio deployment)
  - [ ] `SANITY_API_READ_TOKEN`
  - [ ] `SANITY_API_WRITE_TOKEN`

## Deployment Order

1. **Deploy Web App to Vercel** (Part 1)
   - [ ] Project configured
   - [ ] Environment variables added
   - [ ] First deployment successful
   - [ ] Web app URL noted: `https://your-project.vercel.app`

2. **Deploy Sanity Studio** (Part 2)
   - [ ] GitHub Secrets configured
   - [ ] Update `SANITY_STUDIO_PRESENTATION_URL` with Vercel URL
   - [ ] Studio deployed (via GitHub Actions or manual)
   - [ ] Studio URL noted: `https://your-hostname.sanity.studio`

3. **Final Configuration** (Part 3)
   - [ ] Update Vercel `NEXT_PUBLIC_SANITY_STUDIO_URL` with studio URL
   - [ ] Redeploy Vercel project
   - [ ] Test both deployments

## Post-Deployment Testing

- [ ] Web app loads correctly
- [ ] Studio loads correctly
- [ ] Can create content in studio
- [ ] Content appears on web app
- [ ] Preview mode works (if applicable)
- [ ] Images load correctly
- [ ] Navigation works

## Common Issues to Check

- [ ] Root Directory in Vercel is `apps/web` (not root)
- [ ] All environment variables are set (no missing values)
- [ ] GitHub workflow file is in `.github/workflows/` (not `github/workflows/`)
- [ ] Tokens have correct permissions
- [ ] Project IDs match between Vercel and GitHub Secrets

---

**Need help?** See `DEPLOYMENT_GUIDE.md` for detailed instructions.

