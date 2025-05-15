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
      }),
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Please enter email and password');
          }

          const db = client.db();
          const user = await db.collection('users').findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error('No user found with this email');
          }

          const isValid = await compare(credentials.password, user.password);

          if (!isValid) {
            throw new Error('Invalid password');
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role || 'user',
          };
        },
      }),
    ],
    callbacks: {
      async signIn({ user, account }) {
        if (account?.provider === 'google') {
          const db = client.db();
          const existingUser = await db.collection('users').findOne({ email: user.email });
          
          if (!existingUser) {
            // Create new user with admin role if it's your email
            await db.collection('users').insertOne({
              email: user.email,
              name: user.name,
              role: user.email === 'syedmirhabib@gmail.com' ? 'admin' : 'user',
              emailVerified: new Date(),
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }
        }
        return true;
      },
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.role = user.role;
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
    debug: env.NODE_ENV === 'development',
  };
}
