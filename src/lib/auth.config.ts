import { NextAuthOptions } from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from './mongodb';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { compare } from 'bcryptjs';
import { Adapter } from 'next-auth/adapters';
import { env } from './env';
import { ObjectId } from 'mongodb';

// Create a function to get auth options
export async function getAuthOptions(): Promise<NextAuthOptions> {
  const client = await clientPromise;
  
  return {
    // @ts-expect-error - MongoDBAdapter has type issues with Next.js 13+
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

            // Check if the user has a password
            if (!user.password) {
              console.log('User has no password set:', user.email);
              // Check if the user has a Google account
              const hasGoogleAccount = await db.collection('accounts').findOne({
                userId: user._id,
                provider: 'google'
              });
              
              if (hasGoogleAccount) {
                throw new Error('This account is linked to Google. Please sign in with Google.');
              } else {
                throw new Error('Account not properly set up. Please contact support.');
              }
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
          
          // Check if there's an existing user with this email
          const existingUser = await db.collection('users').findOne({ email: user.email });
          
          if (existingUser) {
            // If the user exists, update their account with Google info
            await db.collection('users').updateOne(
              { email: user.email },
              {
                $set: {
                  name: user.name,
                  emailVerified: new Date(),
                  updatedAt: new Date(),
                  googleId: profile?.sub,
                  // Keep existing role
                  role: existingUser.role || 'user',
                }
              }
            );

            // Also update the accounts collection to link the Google account
            await db.collection('accounts').updateOne(
              { 
                userId: existingUser._id,
                provider: 'google'
              },
              {
                $set: {
                  type: 'oauth',
                  provider: 'google',
                  providerAccountId: profile?.sub,
                  access_token: account.access_token,
                  expires_at: account.expires_at,
                  token_type: account.token_type,
                  scope: account.scope,
                  id_token: account.id_token,
                  session_state: account.session_state,
                }
              },
              { upsert: true }
            );

            return true;
          }

          // For new users, create both user and account records
          const newUser = await db.collection('users').insertOne({
            email: user.email,
            name: user.name,
            role: user.email === 'syedmirhabib@gmail.com' ? 'admin' : 'user',
            emailVerified: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            googleId: profile?.sub,
          });

          // Create the account record
          await db.collection('accounts').insertOne({
            userId: newUser.insertedId,
            type: 'oauth',
            provider: 'google',
            providerAccountId: profile?.sub,
            access_token: account.access_token,
            expires_at: account.expires_at,
            token_type: account.token_type,
            scope: account.scope,
            id_token: account.id_token,
            session_state: account.session_state,
          });

          return true;
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
