"use server";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { isRedirectError } from "next/dist/client/components/redirect";
import { loginSchema, LoginValues } from "@/lib/yupValidation";

export async function login(
  credentials: LoginValues,
): Promise<{ error: string }> {
  try {
    const validatedCredentials = await loginSchema.validate(credentials);
    const { email, password } = validatedCredentials;

    const existingUser = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (!existingUser || !existingUser.password) {
      return { error: "Incorrect username or password" };
    }

    const isPasswordValid = await bcrypt.compare(
      password ?? '',
      existingUser.password,
    );

    if (!isPasswordValid) {
      return { error: "Incorrect username or password" };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return { error: "An error occurred" };
  }
}
