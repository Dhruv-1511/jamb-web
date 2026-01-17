# Jamb Page Implementation Guide

## ✅ What's Already Built

Your Sanity project already has **all the components** needed to recreate the Jamb page! The structure matches perfectly:

### Components Ready to Use:

1. **Hero Block** ✅ - Full-width banner image (modified to match Jamb style)
2. **Split Feature Block** ✅ - Two-column layout for Fireplaces, Lighting, Furniture sections
3. **Product Grid Block** ✅ - Grid display for product listings
4. **Story Cards Block** ✅ - Story/article cards grid
5. **Subscribe Newsletter Block** ✅ - Newsletter signup section
6. **Navbar** ✅ - Header with logo and buttons (modified to match Jamb style)
7. **Footer** ✅ - Multi-column footer with links

### Components You DON'T Need (Can Remove Later):

- ❌ **CTA Block** - Not used in Jamb design
- ❌ **FAQ Accordion** - Not used in Jamb design
- ❌ **Feature Cards With Icon** - Not used in Jamb design
- ❌ **Image Link Cards** - Not used in Jamb design

---

## 📋 Step-by-Step: Adding Content in Sanity Studio

### Step 1: Start Your Development Server

```bash
pnpm run dev
```

This starts:

- **Web app**: http://localhost:3000
- **Sanity Studio**: http://localhost:3333

### Step 2: Open Sanity Studio

1. Go to http://localhost:3333
2. Sign in with your Sanity account

### Step 3: Configure Settings (One-Time Setup)

1. Click **"Settings"** in the sidebar
2. Add your **Site Title**: "Jamb" (or "Jamb.")
3. Upload your **Logo** image (the "Jamb." logo)
4. Save and publish

### Step 4: Configure Navbar

1. Click **"Site Navigation"** (or "Navbar") in the sidebar
2. In the **"Buttons"** section, add 3 icon buttons:
   - **Button 1**:
     - Text: "Search" (or leave empty if using icon-only)
     - URL: `/search` (or wherever search should go)
     - Variant: "link" or "outline"
   - **Button 2**:
     - Text: "Email" (or leave empty)
     - URL: `mailto:info@jamb.com` (replace with your email)
     - Variant: "link" or "outline"
   - **Button 3**:
     - Text: "Menu" (or leave empty)
     - URL: `#` (menu will be handled by JavaScript)
     - Variant: "link" or "outline"
3. **Important**: Leave the "Navigation Structure" section empty (we're using a simple icon-based navbar)
4. Save and publish

**Note**: For icon-only buttons, you may need to style them in the frontend. The current setup will show text, but you can hide it with CSS if needed.

### Step 5: Create/Edit Home Page

1. Click **"Home Page"** in the sidebar
2. If it exists, open it. If not, click **"+ Create"** → **"Home Page"**

### Step 6: Add Basic Page Info

1. **Title**: "Jamb" (or leave empty if you don't want a visible title)
2. **Description**: Brief description for SEO
   - Example: "Jamb offers exquisite fireplaces, lighting, and furniture. Explore our collection of antique and reproduction pieces."
3. **Slug**: Should auto-populate as "home" - leave as is
4. Click **"Save"** (don't publish yet)

### Step 7: Build the Page with Page Builder

Scroll to the **"Page Builder"** section. Now add blocks in this exact order:

#### Block 1: Hero (Top Banner)

1. Click **"+ Add item"** in Page Builder
2. Select **"Hero"**
3. **Image**: Upload your hero image (the mantelpiece with mirror and chandelier)
4. Leave Title, Badge, Description, and Buttons **empty** (we only want the image)
5. Click outside to save

#### Block 2: Split Feature (Fireplaces Section)

1. Click **"+ Add item"**
2. Select **"Split Feature"**
3. Fill in:
   - **Title**: "Fireplaces"
   - **Content** (Rich Text): Your description text (or Lorem ipsum placeholder)
   - **Image**: Upload fireplace image (white marble fireplace with fire)
   - **Image Position**: "Right" (image on right, text on left)
   - **Layout Style**: "Standard (Split)"
   - **Buttons**: Add 2 buttons:
     - Button 1: Text: "Explore our Fireplaces", URL: `/fireplaces`
     - Button 2: Text: "Sell us Antique Chimneypieces", URL: `/sell`
4. Click outside to save

#### Block 3: Product Grid (Our Latest Chimneypieces)

1. Click **"+ Add item"**
2. Select **"Product Grid"**
3. Fill in:
   - **Title**: "Our latest chimneypieces"
   - **Columns**: "4" (4 columns)
   - **Products**: Click **"+ Add item"** for each product (add 4 products):
     - Product 1:
       - **Product Title**: "Lorem ipsum"
       - **Subtitle**: "Subtitle"
       - **Image**: Upload product image
       - **Link**: Optional product URL
     - Repeat for Products 2, 3, 4
4. Click outside to save

#### Block 4: Split Feature (Lighting Section)

1. Click **"+ Add item"**
2. Select **"Split Feature"**
3. Fill in:
   - **Title**: "Lighting"
   - **Content**: Your description text
   - **Image**: Upload lighting image (chandelier in staircase room)
   - **Image Position**: "Right"
   - **Layout Style**: "Standard (Split)"
   - **Buttons**: Add 1 button:
     - Text: "Explore our Lighting", URL: `/lighting`
4. Click outside to save

#### Block 5: Product Grid (Our Latest Lighting)

1. Click **"+ Add item"**
2. Select **"Product Grid"**
3. Fill in:
   - **Title**: "Our latest lighting"
   - **Columns**: "4"
   - **Products**: Add 4 lighting products (same structure as Block 3)
4. Click outside to save

#### Block 6: Split Feature (Furniture Section)

1. Click **"+ Add item"**
2. Select **"Split Feature"**
3. Fill in:
   - **Title**: "Furniture"
   - **Content**: Your description text
   - **Image**: Upload furniture image (cream sofa with green walls)
   - **Image Position**: "Right"
   - **Layout Style**: "Standard (Split)"
   - **Buttons**: Add 1 button:
     - Text: "Explore our Furniture", URL: `/furniture`
4. Click outside to save

#### Block 7: Product Grid (Our Latest Furniture)

1. Click **"+ Add item"**
2. Select **"Product Grid"**
3. Fill in:
   - **Title**: "Our latest furniture"
   - **Columns**: "6" (since you have 5 items, use 6-column grid)
   - **Products**: Add 5 furniture products:
     - White wooden chair with striped cushion
     - Wooden bench with woven seat
     - Dark wooden console table
     - Round dark-framed mirror
     - Light blue upholstered armchair
4. Click outside to save

#### Block 8: Split Feature (The Grand Collection)

1. Click **"+ Add item"**
2. Select **"Split Feature"**
3. Fill in:
   - **Eyebrow**: "JOURNAL" (optional small text above title)
   - **Title**: "The Grand Collection"
   - **Content**: Your description text
   - **Image**: Upload journal image (window with columns and chandelier)
   - **Image Position**: "Right"
   - **Layout Style**: "Standard (Split)"
   - **Buttons**: Add 1 button:
     - Text: "Discover more", URL: `/journal`
4. Click outside to save

#### Block 9: Story Cards (See More of Our Latest Stories)

1. Click **"+ Add item"**
2. Select **"Story Cards"**
3. Fill in:
   - **Title**: "See more of our latest stories"
   - **Stories**: Click **"+ Add item"** for each story (add 5 stories):
     - Story 1:
       - **Story Title**: "Lorem ipsum"
       - **Subtitle**: "Subtitle"
       - **Image**: Upload story image (marble bust on pedestal)
       - **Link**: Optional story URL
     - Repeat for Stories 2, 3, 4, 5
4. Click outside to save

#### Block 10: Split Feature OR Subscribe Newsletter (Subscribe to Jamb Journal)

**Option A: Using Split Feature (matches Jamb design)**

1. Click **"+ Add item"**
2. Select **"Split Feature"**
3. Fill in:
   - **Title**: "Subscribe to the Jamb Journal"
   - **Content**: Your description text
   - **Image**: Upload journal cover image (stone sculpture with JAMB logo)
   - **Image Position**: "Right"
   - **Layout Style**: "Standard (Split)"
   - **Buttons**: Add 1 button:
     - Text: "Discover more", URL: `/subscribe`

**Option B: Using Subscribe Newsletter Block**

1. Click **"+ Add item"**
2. Select **"Subscribe Newsletter"**
3. Fill in:
   - **Title**: "Subscribe to the Jamb Journal"
   - **SubTitle**: Your description text
   - **Helper Text**: Privacy policy or terms text (optional)

### Step 8: Configure Footer

1. Click **"Footer"** in the sidebar
2. Add **Subtitle**: Optional footer description
3. In **"Columns"**, add multiple columns:
   - **Column 1**: Title: "Reproduction Chimneypieces", then add links
   - **Column 2**: Title: "Reproduction Lighting", then add links
   - **Column 3**: Title: "Reproduction Furniture", then add links
   - **Column 4**: Title: "Antique Furniture", then add links
   - **Column 5**: Title: "Journal", then add links
   - **Column 6**: Title: "About", then add links
4. Add links under each column (click **"+ Add item"** under each column's "Links" section)
5. Save and publish

### Step 9: Publish Your Home Page

1. Go back to your **"Home Page"**
2. Click the **"Publish"** button at the top
3. Your page is now live!

### Step 10: View Your Page

1. Go to http://localhost:3000
2. You should see your Jamb page with all sections!

---

## 🎨 Design Details That Match Jamb

The components have been styled to match Jamb's design:

- **Colors**: Using `jamb-charcoal` and `jamb-beige` colors (already configured)
- **Typography**: Using serif font for headings (`font-serif`)
- **Spacing**: Proper spacing between sections
- **Images**: Full-width hero, proper aspect ratios for products
- **Layout**: Two-column split features, grid layouts for products

---

## 🗑️ Removing Extra Components (Optional)

If you want to clean up unused components from Sanity Studio:

1. **Don't remove them from the code** - they're already built and won't cause issues
2. **Simply don't use them** in your Page Builder
3. They won't appear if you don't add them as blocks

**If you really want to hide them** (advanced):

- Edit `apps/studio/schemaTypes/blocks/index.ts`
- Comment out unused block types
- Restart your dev server

---

## 📝 Quick Reference: Block Order

Your Page Builder should have blocks in this order:

1. Hero
2. Split Feature (Fireplaces)
3. Product Grid (Chimneypieces - 4 items)
4. Split Feature (Lighting)
5. Product Grid (Lighting - 4 items)
6. Split Feature (Furniture)
7. Product Grid (Furniture - 5 items)
8. Split Feature (The Grand Collection)
9. Story Cards (Stories - 5 items)
10. Split Feature OR Subscribe Newsletter (Jamb Journal)

---

## 🆘 Troubleshooting

### Images not showing?

- Make sure images are uploaded and saved in Sanity
- Check that image fields are filled in each block

### Buttons not working?

- Verify URLs are set correctly (internal pages need to exist, external URLs need `http://` or `https://`)

### Page looks different?

- Make sure you selected the correct layout options (e.g., "Standard (Split)" for Split Features)
- Check that Image Position is set correctly ("Right" for text-left, image-right sections)

### Navbar showing text instead of icons?

- The current setup shows button text. For icon-only buttons, you may need to:
  1. Use icon font classes
  2. Or modify the SanityButtons component to support icon-only mode
  3. Or add icons via CSS based on button text

---

## ✅ Checklist

Before going live, make sure:

- [ ] Settings configured (logo, site title)
- [ ] Navbar has 3 buttons (search, email, menu)
- [ ] Home page has all 10 blocks in correct order
- [ ] All images uploaded and displaying correctly
- [ ] All buttons have proper URLs
- [ ] Footer has all columns and links
- [ ] Home page is published
- [ ] Test all links and buttons
- [ ] Check page on mobile (responsive design)

---

**Need help?** Check the component files in `apps/web/src/components/sections/` to see how each block works.
