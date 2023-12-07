import { z } from "zod";

export const userOtpRequestSchema = z.object({
  userEmail: z.string().email({
    message: "Please provide a valid email address.",
  }),
});

export const userOtpVerificationSchema = z.object({
  userEmail: z.string().email({
    message: "Please provide a valid email address.",
  }),
  userOtp: z.string().min(6, {
    message: "Your OTP must be 6 characters.",
  }),
});

export const userPasswordUpdateSchema = z
  .object({
    userEmail: z.string().email({
      message: "Please provide a valid email address.",
    }),
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
    userConfirmPassword: z
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
  })
  .refine((data) => data.userPassword === data.userConfirmPassword, {
    message: "Passwords do not match.",
    path: ["userPasswordConfirm"],
  });

export type userOtpRequest = z.infer<typeof userOtpRequestSchema>;
export type userOtp = z.infer<typeof userOtpVerificationSchema>;
export type userPasswordUpdate = z.infer<typeof userPasswordUpdateSchema>;
