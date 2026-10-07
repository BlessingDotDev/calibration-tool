import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .email("Please Enter valid email")
    .min(1, "Email is required"),
  
  password: z
    .string()
    .min(1, "password is required")
})

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be atleast 2 characters")
    .max(30, "Name must be less than 30 characters"),

  email: z
    .email("Please enter valid email")
    .min(1, ("Email is required")),

  password: z
    .string()
    .min(8, "Password must be atleast 8 characters")
    .max(30, "Password must be less that 30 characters")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[0-9]/, "Password must contain a number"),

  confirmPassword: z
    .string()
    .min(1, "Please confirm your password")
})
  .refine((data) => data.password === data.confirmPassword, {
    message:  "Password do not match",
    path: ["confirmPassword"],
  })

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;