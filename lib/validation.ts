// import { z } from "zod";

// export const registerSchema = z.object({
//   name: z
//     .string()
//     .min(3, "Username must be at least 3 characters"),
//   email: z.string().email("Enter a valid email"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// export type RegisterValues = z.infer<typeof registerSchema>;

// export const loginSchema = z.object({
//   email: z.string().email("Enter a valid email"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

// export type LoginValues = z.infer<typeof loginSchema>;

// export const createPostSchema = z.object({
//   content: z.string().trim(),
// });
