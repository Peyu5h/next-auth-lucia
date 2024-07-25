import { google, lucia } from '@/auth';
import { OAuth2RequestError } from 'arctic';
import { generateIdFromEntropySize } from 'lucia';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const state = req.nextUrl.searchParams.get('state');
  const storedState = cookies().get('state')?.value;
  const storedCodeVerifier = cookies().get('code_verifier')?.value;

  if (
    !code ||
    !state ||
    !storedState ||
    !storedCodeVerifier ||
    state !== storedState
  ) {
    return new Response(null, { status: 400 });
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      storedCodeVerifier
    );

    const googleUser = await fetch(
      'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    ).then((res) => res.json());

    const existingUser = await prisma.user.findUnique({
      where: {
        googleId: googleUser.id,
      },
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

    const userId = generateIdFromEntropySize(10);
    const name =
      googleUser.name.toLowerCase().replace(/ /g, '-') +
      '-' +
      userId.slice(0, 4);
    const avatarUrl = googleUser.picture;

    await prisma.user.create({
      data: {
        id: userId,
        name,
        googleId: googleUser.id,
        email: googleUser.email,
        avatarUrl,
      },
    });

    const session = await lucia.createSession(userId, {});
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
  } catch (error) {
    console.error(error);
    if (error instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
