import request from "supertest";
import { app } from "../../app";
import { User } from "../../models/user";
import { UserService } from "../../services/users";

describe("### PATCH /api/users/v1/authentication/updatepassword", () => {
  describe("## Request validation", () => {
    describe("userEmail", () => {
      it('should return 400 if "userEmail" is not provided', async () => {
        const response = await request(app)
          .patch("/api/users/v1/authentication/updatepassword")
          .send({
            userPassword: "Password123!",
            userConfirmPassword: "Password123!",
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          errors: [
            {
              message: "Required",
              field: "userEmail",
            },
          ],
        });
      });

      it('should return 400 if "userEmail" is not valid', async () => {
        const response = await request(app)
          .patch("/api/users/v1/authentication/updatepassword")
          .send({
            userEmail: "tony.li",
            userPassword: "Password123!",
            userConfirmPassword: "Password123!",
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          errors: [
            {
              message: "Please provide a valid email address.",
              field: "userEmail",
            },
          ],
        });
      });
    });

    describe("userPassword", () => {
      const requestPayload = {
        userEmail: "tony.li@test.io",
        userPassword: "Password123!",
        userConfirmPassword: "Password123!",
      };
      it("should return 400 if userPassword is not provided", async () => {
        const response = await request(app)
          .post("/api/users/v1/authentication/loginuser")
          .set("Authorization", global.signup())
          .send({
            ...requestPayload,
            userPassword: undefined,
            userConfirmPassword: undefined,
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          errors: [
            {
              message: "Please provide a password.",
              field: "userPassword",
            },
          ],
        });
      });

      it("should return 400 if userPassword is less than 8 characters", async () => {
        const response = await request(app)
          .post("/api/users/v1/authentication/loginuser")
          .set("Authorization", global.signup())
          .send({
            ...requestPayload,
            userPassword: "Asdf1!",
            userConfirmPassword: "Asdf1!",
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          errors: [
            {
              message: "Must be at least 8 characters in length.",
              field: "userPassword",
            },
          ],
        });
      });

      it("should return 400 if userPassword is has no uppercase letter", async () => {
        const response = await request(app)
          .post("/api/users/v1/authentication/loginuser")
          .set("Authorization", global.signup())
          .send({
            ...requestPayload,
            userPassword: "asdf1!sdgserghsrthgr",
            userConfirmPassword: "asdf1!sdgserghsrthgr",
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          errors: [
            {
              message: "You need to provide at least one uppercase character.",
              field: "userPassword",
            },
          ],
        });
      });

      it("should return 400 if userPassword is has no numbers", async () => {
        const response = await request(app)
          .post("/api/users/v1/authentication/loginuser")
          .set("Authorization", global.signup())
          .send({
            ...requestPayload,
            userPassword: "Asdf!sdgserghsrthgr",
            userConfirmPassword: "Asdf!sdgserghsrthgr",
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          errors: [
            {
              message: "You need to provide at least one number.",
              field: "userPassword",
            },
          ],
        });
      });

      it("should return 400 if userPassword is has no lowercase letter", async () => {
        const response = await request(app)
          .post("/api/users/v1/authentication/loginuser")
          .set("Authorization", global.signup())
          .send({
            ...requestPayload,
            userPassword: "AASDF1!KLJDIEFHIIEFHIUFH",
            userConfirmPassword: "AASDF1!KLJDIEFHIIEFHIUFH",
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          errors: [
            {
              message: "You need to provide at least one lowercase character.",
              field: "userPassword",
            },
          ],
        });
      });

      it("should return 400 if userPassword is has no special characters", async () => {
        const response = await request(app)
          .post("/api/users/v1/authentication/loginuser")
          .set("Authorization", global.signup())
          .send({
            ...requestPayload,
            userPassword: "aASDF1KLJDIEFHIIEFHIUFH",
            userConfirmPassword: "aASDF1KLJDIEFHIIEFHIUFH",
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          errors: [
            {
              message: "You need to provide at least one special character.",
              field: "userPassword",
            },
          ],
        });
      });
    });

    describe("userConfirmPassword", () => {
      const requestPayload = {
        userEmail: "tony.li@test.io",
        userPassword: "Password123!",
        userConfirmPassword: "Password123!",
      };
      it("should return 400 if userConfirmPassword is not provided", async () => {
        const response = await request(app)
          .post("/api/users/v1/authentication/loginuser")
          .set("Authorization", global.signup())
          .send({
            ...requestPayload,
            userPassword: undefined,
            userConfirmPassword: undefined,
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          errors: [
            {
              message: "Please provide a password.",
              field: "userPassword",
            },
          ],
        });
      });

      it("should return 400 if userConfirmPassword is less than 8 characters", async () => {
        const response = await request(app)
          .post("/api/users/v1/authentication/loginuser")
          .set("Authorization", global.signup())
          .send({
            ...requestPayload,
            userPassword: "Asdf1!",
            userConfirmPassword: "Asdf1!",
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          errors: [
            {
              message: "Must be at least 8 characters in length.",
              field: "userPassword",
            },
          ],
        });
      });

      it("should return 400 if userConfirmPassword is has no uppercase letter", async () => {
        const response = await request(app)
          .post("/api/users/v1/authentication/loginuser")
          .set("Authorization", global.signup())
          .send({
            ...requestPayload,
            userPassword: "asdf1!sdgserghsrthgr",
            userConfirmPassword: "asdf1!sdgserghsrthgr",
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          errors: [
            {
              message: "You need to provide at least one uppercase character.",
              field: "userPassword",
            },
          ],
        });
      });

      it("should return 400 if userConfirmPassword is has no numbers", async () => {
        const response = await request(app)
          .post("/api/users/v1/authentication/loginuser")
          .set("Authorization", global.signup())
          .send({
            ...requestPayload,
            userPassword: "Asdf!sdgserghsrthgr",
            userConfirmPassword: "Asdf!sdgserghsrthgr",
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          errors: [
            {
              message: "You need to provide at least one number.",
              field: "userPassword",
            },
          ],
        });
      });

      it("should return 400 if userConfirmPassword is has no lowercase letter", async () => {
        const response = await request(app)
          .post("/api/users/v1/authentication/loginuser")
          .set("Authorization", global.signup())
          .send({
            ...requestPayload,
            userPassword: "AASDF1!KLJDIEFHIIEFHIUFH",
            userConfirmPassword: "AASDF1!KLJDIEFHIIEFHIUFH",
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          errors: [
            {
              message: "You need to provide at least one lowercase character.",
              field: "userPassword",
            },
          ],
        });
      });

      it("should return 400 if userConfirmPassword is has no special characters", async () => {
        const response = await request(app)
          .post("/api/users/v1/authentication/loginuser")
          .set("Authorization", global.signup())
          .send({
            ...requestPayload,
            userPassword: "aASDF1KLJDIEFHIIEFHIUFH",
            userConfirmPassword: "aASDF1KLJDIEFHIIEFHIUFH",
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          errors: [
            {
              message: "You need to provide at least one special character.",
              field: "userPassword",
            },
          ],
        });
      });

      it("should return 400 if userPassword and userConfirmPassword do not match", async () => {
        const response = await request(app)
          .patch("/api/users/v1/authentication/updatepassword")
          .send({
            ...requestPayload,
            userPassword: "Password123!",
            userConfirmPassword: "Password1234!",
          });
      });
    });
  });

  describe("## database validation", () => {
    it("should return an 400 (BadRequestError) if user does not exist", async () => {
      const requestPayload = {
        userEmail: "tony.li@test.io",
        userPassword: "Password123!",
        userConfirmPassword: "Password123!",
      };

      const response = await request(app)
        .patch("/api/users/v1/authentication/updatepassword")
        .send(requestPayload);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        errors: [
          {
            message: "The user does not exist. Please register.",
            field: "badRequest",
          },
        ],
      });
    });

    it("should update the userPassword field in the database if the user exists", async () => {
      const updatePasswordRequestPayload = {
        userEmail: "tony.li@test.io",
        userPassword: "Password1234!",
        userConfirmPassword: "Password1234!",
      };

      // Register a user
      const registerUserRequest = await request(app)
        .post("/api/users/v1/authentication/registeruser")
        .set("Authorization", global.signup())
        .send({
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
        });

      expect(registerUserRequest.status).toBe(201);
      const existingUser = await UserService.getUserByEmail(
        updatePasswordRequestPayload.userEmail
      );

      const existingUserPassword = existingUser?.userPassword;

      const updateUserPasswordRequest = await request(app)
        .patch("/api/users/v1/authentication/updatepassword")
        .send(updatePasswordRequestPayload);

      expect(updateUserPasswordRequest.status).toBe(200);

      const updatedUser = await UserService.getUserByEmail(
        updatePasswordRequestPayload.userEmail
      );

      expect(updatedUser?.userPassword).not.toEqual(existingUserPassword);
    });

    it("should return an access token if the user exists and the password is updated", async () => {
      const updatePasswordRequestPayload = {
        userEmail: "tony.li@test.io",
        userPassword: "Password1234!",
        userConfirmPassword: "Password1234!",
      };

      // Register a user
      const registerUserRequest = await request(app)
        .post("/api/users/v1/authentication/registeruser")
        .set("Authorization", global.signup())
        .send({
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
        });

      expect(registerUserRequest.status).toBe(201);

      const updateUserPasswordRequest = await request(app)
        .patch("/api/users/v1/authentication/updatepassword")
        .send(updatePasswordRequestPayload);

      expect(updateUserPasswordRequest.status).toBe(200);
      expect(updateUserPasswordRequest.body).toHaveProperty("userAccessToken");
    });
  });
});
