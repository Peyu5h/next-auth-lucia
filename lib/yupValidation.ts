import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Username must be at least 3 characters"),
  email: yup.string().email("Enter a valid email"),
  password: yup.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Enter a valid email"),
  password: yup.string().min(6, "Password must be at least 6 characters"),
});
