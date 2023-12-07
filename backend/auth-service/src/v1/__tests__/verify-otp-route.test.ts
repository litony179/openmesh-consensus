import request from "supertest";
import { app } from "../../app";
import { User } from "../../models/user";
import { UserService } from "../../services/users";

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
    it("should return a 400 if the user email is not provided", async () => {
      await request(app)
        .post("/api/users/v1/authentication/generateotp")
        .send({})
        .expect(400);
    });

    it("should return a 400 if the user email is invalid", async () => {
      await request(app)
        .post("/api/users/v1/authentication/generateotp")
        .send({
          userEmail: "test",
        })
        .expect(400);
    });
  });

  describe("## Route logic validation", () => {
    it("should return a BadErrorError (400) if the user does not exist", async () => {
      const userOtpRequestPayload = {
        userEmail: "tony.li@test.io",
      };

      const response = await request(app)
        .post("/api/users/v1/authentication/generateotp")
        .send(userOtpRequestPayload);

      expect(response.status).toEqual(400);
      expect(response.body).toEqual({
        errors: [
          {
            message: "User does not exist. Please register.",
            field: "badRequest",
          },
        ],
      });
    });

    it("should return a NotAuthorisedError (400) if the OTP is not valid", async () => {
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

      const userRegistrationResponse = await request(app)
        .post("/api/users/v1/authentication/registeruser")
        .send(userRegistrationPayload);

      expect(userRegistrationResponse.status).toEqual(201);

      const userOtpRequestPayload = {
        userEmail: "tony.li@test.io",
      };

      const generateOtpResponse = await request(app)
        .post("/api/users/v1/authentication/generateotp")
        .send(userOtpRequestPayload);
      expect(generateOtpResponse.status).toEqual(200);

      const userOtp = generateOtpResponse.body.userOtp;

      const verifyOtpRequestPayload = {
        userEmail: "tony.li@test.io",
        userOtp: "341595",
      };

      const verifyOtpResponse = await request(app)
        .post("/api/users/v1/authentication/verifyotp")
        .send(verifyOtpRequestPayload);

      expect(verifyOtpResponse.status).toEqual(400);
      console.log(verifyOtpResponse.body);
      expect(verifyOtpResponse.body).toEqual({
        errors: [
          {
            message: "OTP is invalid. Please try again.",
            field: "badRequest",
          },
        ],
      });
    });

    it("should return a 200 if it successfully varified the OTP and saved a flag to the database", async () => {
      // Write a unit test that tests the expiry of the OTP
      // 1. Register a user
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

      const userRegistrationResponse = await request(app)
        .post("/api/users/v1/authentication/registeruser")
        .send(userRegistrationPayload);

      expect(userRegistrationResponse.status).toEqual(201);

      // 2. Generate an OTP for the user
      const userOtpRequestPayload = {
        userEmail: "tony.li@test.io",
      };

      const generateOtpResponse = await request(app)
        .post("/api/users/v1/authentication/generateotp")
        .send(userOtpRequestPayload);
      expect(generateOtpResponse.status).toEqual(200);

      // 4. Verify the OTP
      const otpMessageString = sendMailMock.mock.calls[0][0].text;
      const userOtp = otpMessageString.split(" ")[3];

      // 5. Expect a 401 error
      const verifyOtpRequestPayload = {
        userEmail: "tony.li@test.io",
        userOtp: userOtp,
      };

      const verifyOtpResponse = await request(app)
        .post("/api/users/v1/authentication/verifyotp")
        .send(verifyOtpRequestPayload);

      const otpVerifiedUser = await UserService.getUserByEmail(
        userRegistrationPayload.userEmail
      );

      expect(verifyOtpResponse.status).toEqual(200);
      expect(otpVerifiedUser?.userOtpVerified).toEqual(true);
    });

    it("should return a NotAuthorisedError (401) if the OTP has expired", async () => {
      // Write a unit test that tests the expiry of the OTP
      // 1. Register a user
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

      const userRegistrationResponse = await request(app)
        .post("/api/users/v1/authentication/registeruser")
        .send(userRegistrationPayload);

      expect(userRegistrationResponse.status).toEqual(201);

      // 2. Generate an OTP for the user
      const userOtpRequestPayload = {
        userEmail: "tony.li@test.io",
      };

      const generateOtpResponse = await request(app)
        .post("/api/users/v1/authentication/generateotp")
        .send(userOtpRequestPayload);
      expect(generateOtpResponse.status).toEqual(200);

      // 4. Verify the OTP
      const otpMessageString = sendMailMock.mock.calls[0][0].text;
      const userOtp = otpMessageString.split(" ")[3];

      // 5. Expect a 401 error
      const verifyOtpRequestPayload = {
        userEmail: "tony.li@test.io",
        userOtp: userOtp,
      };

      await new Promise((r) => setTimeout(r, 3000));

      const verifyOtpResponse = await request(app)
        .post("/api/users/v1/authentication/verifyotp")
        .send(verifyOtpRequestPayload);

      expect(verifyOtpResponse.status).toEqual(400);
      expect(verifyOtpResponse.body).toEqual({
        errors: [
          {
            message: "OTP has expired. Please generate a new OTP.",
            field: "badRequest",
          },
        ],
      });
    }, 4000);
  });
});
