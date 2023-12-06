import request from "supertest";
import { app } from "../../app";
import { User } from "../../models/user";

const sendMailMock = jest.fn();

jest.mock("nodemailer");

const nodemailer = require("nodemailer");
nodemailer.createTransport.mockReturnValue({
  sendMail: sendMailMock,
});

afterEach(async () => {
  sendMailMock.mockClear();
  nodemailer.createTransport.mockClear();
});

describe("## POST /api/users/v1/authentication/generateotp", () => {
  describe("# Request validation", () => {
    it("returns a 400 if the user email is not provided", async () => {
      await request(app)
        .post("/api/users/v1/authentication/generateotp")
        .send({})
        .expect(400);
    });

    it("returns a 400 if the user email is invalid", async () => {
      await request(app)
        .post("/api/users/v1/authentication/generateotp")
        .send({
          userEmail: "test",
        })
        .expect(400);
    });
  });

  describe("## Route logic validation", () => {
    const userOtpRequestPayload = {
      userEmail: "tony.li@test.io",
    };

    const userRegistrationPayload = {
      userFirstName: "Tony",
      userLastName: "test",
      userEmail: "tony.li@test.io",
      userPassword: "Password123!",
      userConfirmPassword: "Password123!",
      userRoles: {
        admin: 5150,
        editor: 1982,
        user: 2011,
      },
    };

    it("should update the user with the OTP", async () => {
      await request(app)
        .post("/api/users/v1/authentication/registeruser")
        .send(userRegistrationPayload)
        .expect(201);

      const existingUser = await User.findOne({
        userEmail: userRegistrationPayload.userEmail,
      });

      expect(existingUser).not.toBeNull();

      const userOtpResponse = await request(app)
        .post("/api/users/v1/authentication/generateotp")
        .send(userOtpRequestPayload);

      const existingUserWithOtp = await User.findOne({
        userEmail: userOtpRequestPayload.userEmail,
      });

      console.log(userOtpResponse.body);

      expect(existingUserWithOtp?.userOtp).not.toBeNull();
      expect(existingUserWithOtp?.userOtpExpireAt).not.toBeNull();
      expect(userOtpResponse.body.message).toEqual(`OTP sent successfully`);
    });
  });
});
