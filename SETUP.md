# AVS Meme Generator - Setup Instructions

## Database Setup

1. **Import the database schema:**
   ```bash
   # Connect to your Neon database and run:
   psql "postgresql://neondb_owner:npg_fSF3olPsu6zk@ep-weathered-field-ag3d4hz5-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" -f database-schema.sql
   ```

2. **Verify the admin user was created:**
   - Check the database for the admin user with role `admin`
   - Contact the system administrator for login credentials

## Environment Variables

Create a `.env.local` file in the root directory with:

```env
# Database
POSTGRES_URL="postgresql://neondb_owner:npg_fSF3olPsu6zk@ep-weathered-field-ag3d4hz5-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"

# Vercel Postgres
POSTGRES_PRISMA_URL="postgresql://neondb_owner:npg_fSF3olPsu6zk@ep-weathered-field-ag3d4hz5-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
POSTGRES_URL_NON_POOLING="postgresql://neondb_owner:npg_fSF3olPsu6zk@ep-weathered-field-ag3d4hz5-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

## User Roles

### Admin (`admin`)
- Full access to all features
- Can manage users (create, read, update, delete)
- Can manage all prikbord memes
- Access to admin dashboard at `/admin`

### Lid (`lid`) - Editor/Manager
- Can create, read, update, and delete prikbord memes
- Can read user information
- No access to admin dashboard

### User (`user`) - Regular user
- Can create and read prikbord memes
- Cannot update or delete memes (except their own)
- No access to admin dashboard

## Features

### Authentication
- Login page at `/auth/signin`
- Session management with NextAuth
- Role-based access control

### Prikbord (`/prikbord`)
- View uploaded meme images
- Drag and drop to reposition images
- Upload images via URL or file upload
- Full-size image popup on click
- Role-based delete permissions
- Database persistence

### Admin Dashboard (`/admin`)
- User management (view, activate/deactivate, delete)
- Meme management (view, delete)
- Only accessible to admin users

## Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Access the application:**
   - Main app: `http://localhost:3000`
   - Prikbord: `http://localhost:3000/prikbord`
   - Admin: `http://localhost:3000/admin`
   - Login: `http://localhost:3000/auth/signin`

## Production Deployment

1. **Set environment variables in Vercel:**
   - `POSTGRES_URL`
   - `NEXTAUTH_URL` (your production URL)
   - `NEXTAUTH_SECRET` (generate a secure secret)

2. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

## Database Tables

- `users` - User accounts and authentication
- `roles` - User roles and permissions
- `prikbord_memes` - Uploaded meme images and positions
- `sessions` - NextAuth session management
- `accounts` - NextAuth account linking

## Security Notes

- Passwords are hashed with bcrypt (12 salt rounds)
- Role-based access control implemented
- Database queries use parameterized statements
- Session management handled by NextAuth
