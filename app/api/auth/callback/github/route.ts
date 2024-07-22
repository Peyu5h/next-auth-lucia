import { cookies } from 'next/headers';
import { OAuth2RequestError } from 'arctic';
import { v4 as uuidv4 } from 'uuid';

import prisma from '@/lib/prisma';
import { github, lucia } from '@/auth';

export async function GET(request: Request): Promise<Response> {

  try {
    await prisma.$connect();
  } catch (error) {
    console.error("Database connection error:", error);
    return new Response(JSON.stringify({ error: "Cannot connect to the database." }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = cookies().get('github_oauth_state')?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }


  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser: GitHubUser = await githubUserResponse.json();

    const existingUser = await prisma.user.findUnique({
      where: { githubId: githubUser.id.toString() },
    });

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/',
        },
      });
    }

    const user = await prisma.user.create({
      data: {
        id: uuidv4(), 
        githubId: githubUser.id.toString(),
        name: githubUser.login,
        email: githubUser.email ?? null,
        avatarUrl: githubUser.avatar_url, 
      },
    });

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    });
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

interface GitHubUser {
  id: number;
  login: string;
  email?: string; 
  avatar_url: string; 
}
