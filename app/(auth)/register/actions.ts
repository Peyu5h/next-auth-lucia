"use server";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { generateIdFromEntropySize } from "lucia";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { isRedirectError } from "next/dist/client/components/redirect";
import { registerSchema, RegisterValues } from "@/lib/yupValidation";

export async function register(
  credentials: RegisterValues,
): Promise<{ error: string }> {
  try {

    try {
      await prisma.$connect();
    } catch (error) {
      console.error("Database connection error:", error);
      return { error: "Cannot connect to the database" };
    }



    const validatedCredentials = await registerSchema.validate(credentials);
    const {name, email, password } = validatedCredentials;

    if (!password) {
      throw new Error("Password is undefined");
    }

    if (!name) {
      throw new Error("Name is undefined");
    }
    
    const passwordHash = await bcrypt.hash(password, 10);

    const userId = generateIdFromEntropySize(10);
    const existingUsername = await prisma.user.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });

    if (existingUsername) {
      return { error: "Username already exists" };
    }

    const existingEmail = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (existingEmail) {
      return { error: "Email already exists" };
    }

    const user = await prisma.user.create({
      data: {
        id: userId,
        name,
        email,
        password: passwordHash,
      },
    });

    const session = await lucia.createSession(userId, {});
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
