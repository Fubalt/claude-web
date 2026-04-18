# Setup Guide - Application Management System

## ⚠️ IMPORTANT: Database Configuration

**You MUST configure a database before using the admin panel or Apply feature!**

The default `.env.local` has a placeholder DATABASE_URL that won't work.

## Prerequisites
- Node.js 24+
- npm
- **A PostgreSQL database** (see below)

## 1. Setup Database - Choose ONE option

### Option A: PostgreSQL on Neon (Recommended - Free & Easy) 

1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Copy the connection string from "Quick Start" or "Connection" page
4. It looks like: `postgresql://user:password@something.neon.tech/bareface`
5. Paste it in `.env.local`:
   ```
   DATABASE_URL="postgresql://user:password@something.neon.tech/bareface"
   ```

### Option B: Local PostgreSQL
If you have PostgreSQL installed locally:
```bash
createdb bareface
```

Then edit `.env.local`:
```
DATABASE_URL="postgresql://localhost:5432/bareface?schema=public"
```

Make sure PostgreSQL is running!

## 2. Create Database Tables

After setting DATABASE_URL, run:
```bash
npx prisma migrate deploy
```

Or if you want to create from scratch:
```bash
npx prisma db push
```

## 3. Configuration

Your `.env.local` should now have:
- `DATABASE_URL` - Your actual database connection string (REQUIRED!)
- `ADMIN_PASSWORD` - Password for admin panel (default: `bareface2024`)
- `ADMIN_SECRET` - Secret key (change in production)

## 4. Features

### User Features
- **Apply Page** (`/apply`)
  - Form with all candidate details
  - Photo uploads (up to 4 images)
  - Automatic validation
  - Success message on submission

- **Roster Page** (`/roster`)
  - Gallery of approved candidates
  - Filterable by role
  - Instagram links

### Admin Features
- **Admin Dashboard** (`/admin`)
  - Login with password
  - View all applications
  - Approve/Reject candidates
  - Add notes to applications
  - Status filtering

## 5. API Endpoints

### Apply Submission
- `POST /api/applications`
  - Submit a new application with form data and photos (as base64)
  - Returns: `{ success: true, id: string }`

### Get Applications (Admin)
- `GET /api/applications`
  - Requires: `Authorization: Bearer {admin_password}`
  - Returns: Array of all applications

### Update Application Status (Admin)
- `PATCH /api/applications/{id}`
  - Requires: `Authorization: Bearer {admin_password}`
  - Body: `{ status: "APPROVED" | "REJECTED", adminNotes: string }`
  - Returns: Updated application

### Get Roster
- `GET /api/roster`
  - Returns: Array of approved applications

## 6. Running the Application

```bash
# Development
npm run dev

# Production
npm run build
npm run start
```

Then visit:
- Homepage: http://localhost:3000
- Apply: http://localhost:3000/apply
- Roster: http://localhost:3000/roster
- Admin: http://localhost:3000/admin (password: `bareface2024`)

## 7. Database Schema

### Application Table
- `id` - Unique identifier
- `createdAt` - Submission date
- `email` - Candidate email (unique)
- `firstName`, `lastName` - Name
- `gender` - Gender
- `dateOfBirth` - Birth date
- `nationality` - Nationality
- `ethnicity` - Ethnicity
- `countryOfResidence` - Country of residence
- `currentCountry` - Current location
- `mobile` - WhatsApp number
- `primaryLanguage` - Primary language
- `otherLanguage` - Additional languages
- `role` - Position type (MODEL, LIFESTYLE, CAST, STYLIST, HAIR_MAKEUP, PHOTOGRAPHERS, INFLUENCERS)
- `notes` - Additional notes
- `instagramUrl` - Instagram profile
- `showreelUrl` - Video portfolio
- `photos` - JSON array of base64 images
- `status` - PENDING | APPROVED | REJECTED
- `adminNotes` - Admin review notes
- `reviewedAt` - Review timestamp
- `reviewedBy` - Reviewer name

## 8. Troubleshooting

### "connection refused" error
- Check DATABASE_URL is correct
- Ensure PostgreSQL is running (if local)
- Check Neon project is active

### Images not uploading
- Max 2MB per image, 4 images total
- Check browser console for errors
- Verify base64 conversion is working

### Admin login not working
- Default password is `bareface2024`
- Check ADMIN_PASSWORD in .env.local
- Try with "Bearer " prefix in Authorization header

## Next Steps
- Add email notifications when applications are submitted
- Integrate with CRM system
- Add payment processing for premium listings
- Set up automated photo validation
- Add social media integration
