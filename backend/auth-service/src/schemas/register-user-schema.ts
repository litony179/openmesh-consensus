import { z } from "zod";

export const registeruserRequestSchema = z
  .object({
    userFirstName: z
      .string({ required_error: "Please provide your first name." })
      .min(2, {
        message: "Your first name must be at least 2 characters.",
      }),
    userLastName: z
      .string({ required_error: "Please provide your last name." })
      .min(2, {
        message: "Your last name must be at least 2 characters.",
      }),
    userEmail: z
      .string({ required_error: "Please provide your email." })
      .email({ message: "you must provide a valid email." }),
    userPassword: z
      .string({ required_error: "Please provide a password." })
      .regex(
        new RegExp(".*[A-Z].*"),
        "You need to provide at least one uppercase character."
      )
      .regex(
        new RegExp(".*[a-z].*"),
        "You need to provide at least one lowercase character."
      )
      .regex(new RegExp(".*\\d.*"), "You need to provide at least one number.")
      .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "You need to provide at least one special character."
      )
      .min(8, "Must be at least 8 characters in length."),
    userConfirmPassword: z.string({
      required_error: "You forgot to re-enter your password.",
    }),
    userRoles: z.record(z.string(), z.number()),
  })
  .refine((data) => data.userPassword === data.userConfirmPassword, {
    message: "your password does not match the above.",
    path: ["userConfirmPassword"],
  });

export const registeruserResponseSchema = z.object({
  userAccessToken: z.string(),
});

export type registeruser = z.infer<typeof registeruserRequestSchema>;
export type registeruserResponse = z.infer<typeof registeruserResponseSchema>;
