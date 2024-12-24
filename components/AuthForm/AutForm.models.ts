import { z } from "zod";

export const authFormSchema = (type: string) =>
  z
    .object({
      // Sign Up
      firstName: type === "log-in" ? z.string().optional() : z.string().min(3),
      lastName: type === "log-in" ? z.string().optional() : z.string().min(3),
      address1: type === "log-in" ? z.string().optional() : z.string().max(50),
      city: type === "log-in" ? z.string().optional() : z.string().max(15),
      state: type === "log-in" ? z.string().optional() : z.string().min(2).max(2),
      postalCode:
        type === "log-in" ? z.string().optional() : z.string().min(5).max(5),
      dateOfBirth:
        type === "log-in" ? z.string().optional() : z.string().min(3),
      ssn: type === "log-in" ? z.string().optional() : z.string().min(11).max(11),
      confirmPassword:
        type === "log-in" ? z.string().optional() : z.string().min(5),
      // Both
      email: z.string().email(),
      password: z.string().min(5),
    })
    .refine(
      (data) => type === "log-in" || data.password === data.confirmPassword,
      {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      }
    );
