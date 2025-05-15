import { NextAuthOptions } from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from './mongodb';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { compare } from 'bcryptjs';
import { Adapter } from 'next-auth/adapters';
import { env } from './env';

// Create a function to get auth options
export async function getAuthOptions(): Promise<NextAuthOptions> {
  const client = await clientPromise;
  
  return {
    // @ts-ignore - MongoDBAdapter has type issues
    adapter: MongoDBAdapter(client, {
      databaseName: 'ebrikkho_next_db'
    }) as Adapter,
    session: {
      strategy: 'jwt',
    },
    secret: env.NEXTAUTH_SECRET,
    providers: [
      GoogleProvider({
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
          }
        }
      }),
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          try {
            if (!credentials?.email || !credentials?.password) {
              console.log('Missing credentials');
              throw new Error('Please enter email and password');
            }

            const db = client.db();
            const user = await db.collection('users').findOne({
              email: credentials.email,
            });

            if (!user) {
              console.log('No user found with email:', credentials.email);
              throw new Error('No user found with this email');
            }

            if (!user.password) {
              console.log('User has no password set');
              throw new Error('Please sign in with Google');
            }

            console.log('Comparing passwords for user:', user.email);
            const isValid = await compare(credentials.password, user.password);
            console.log('Password comparison result:', isValid);

            if (!isValid) {
              console.log('Invalid password for user:', user.email);
              throw new Error('Invalid password');
            }

            console.log('User authenticated successfully:', user.email);
            return {
              id: user._id.toString(),
              email: user.email,
              name: user.name,
              role: user.role || 'user',
            };
          } catch (error) {
            console.error('Auth error:', error);
            throw error;
          }
        },
      }),
    ],
    callbacks: {
      async signIn({ user, account, profile }) {
        if (account?.provider === 'google') {
          const db = client.db();
          const existingUser = await db.collection('users').findOne({ email: user.email });
          
          if (existingUser) {
            // Update the existing user with Google account info
            await db.collection('users').updateOne(
              { email: user.email },
              {
                $set: {
                  name: user.name,
                  emailVerified: new Date(),
                  updatedAt: new Date(),
                  googleId: profile?.sub,
                  // Keep the existing role and password
                  role: existingUser.role || 'user',
                }
              }
            );
            return true;
          }

          // Create new user with admin role if it's your email
          await db.collection('users').insertOne({
            email: user.email,
            name: user.name,
            role: user.email === 'syedmirhabib@gmail.com' ? 'admin' : 'user',
            emailVerified: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            googleId: profile?.sub,
          });
        }
        return true;
      },
      async jwt({ token, user, account, profile }) {
        if (user) {
          token.id = user.id;
          token.role = user.role;
        }
        if (account) {
          token.accessToken = account.access_token;
          token.provider = account.provider;
        }
        if (profile) {
          token.googleId = profile.sub;
        }
        return token;
      },
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id as string;
          session.user.role = token.role as string;
        }
        return session;
      },
    },
    pages: {
      signIn: '/login',
      error: '/login',
    },
    debug: true, // Enable debug mode to see more detailed logs
  };
}
