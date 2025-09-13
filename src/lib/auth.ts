import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Auth: Missing credentials');
          return null;
        }

        console.log('Auth: Attempting login for:', credentials.email);

        // Retry mechanism for database connection issues
        let retries = 3;
        while (retries > 0) {
          try {
            const { rows } = await sql`
              SELECT id, email, name, password_hash, role, is_active 
              FROM users 
              WHERE email = ${credentials.email} AND is_active = true
            `;

            console.log('Auth: Database query result:', rows.length, 'rows found');

            if (rows.length === 0) {
              console.log('Auth: No user found with email:', credentials.email);
              return null;
            }

            const user = rows[0];
            console.log('Auth: User found:', user.email, user.role);
            
            const isPasswordValid = await bcrypt.compare(credentials.password, user.password_hash);
            console.log('Auth: Password valid:', isPasswordValid);

            if (!isPasswordValid) {
              console.log('Auth: Invalid password for:', credentials.email);
              return null;
            }

            // Update last login
            try {
              await sql`
                UPDATE users 
                SET last_login = CURRENT_TIMESTAMP 
                WHERE id = ${user.id}
              `;
              console.log('Auth: Last login updated for:', user.email);
            } catch (updateError) {
              console.error('Auth: Error updating last login:', updateError);
              // Don't fail the login for this error
            }

            const authResult = {
              id: user.id.toString(),
              email: user.email,
              name: user.name,
              role: user.role,
            };
            
            console.log('Auth: Login successful for:', user.email);
            return authResult;
          } catch (error) {
            console.error(`Auth error for ${credentials.email} (retry ${4-retries}):`, error);
            retries--;
            if (retries > 0) {
              console.log(`Auth: Retrying in 100ms... (${retries} retries left)`);
              await new Promise(resolve => setTimeout(resolve, 100));
            } else {
              console.error('Auth: All retries failed for:', credentials.email);
              return null;
            }
          }
        }
        
        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
