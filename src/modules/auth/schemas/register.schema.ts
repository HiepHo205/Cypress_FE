import * as z from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required." }),
    email: z
      .string()
      .min(1, { message: "Email is required." })
      .email({ message: "Invalid email format." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    password_confirmation: z
      .string()
      .min(1, { message: "Password confirmation is required." }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Password confirmation does not match.",
    path: ["password_confirmation"],
  });

export type RegisterInputType = z.infer<typeof registerSchema>;
