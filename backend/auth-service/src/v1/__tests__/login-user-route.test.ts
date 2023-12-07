import request from "supertest";
import { app } from "../../app";

describe("POST /api/users/v1/authentication/loginuser", () => {
  describe("## Request payload validation", () => {
    describe("userEmail", () => {
      it("should return 400 if userEmail is not provided", async () => {
        const response = await request(app)
          .post("/api/users/v1/authentication/loginuser")
          .set("Authorization", global.signup())
          .send({
            userPassword: "Password123!",
          });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          errors: [
            {
              message: "Please provide your email.",
              field: "userEmail",
            },
          ],
        });
      });
    });

    describe("userPassword", () => {
      it("should return 400 if userPassword is not provided", async () => {
        const response = await request(app)
          .post("/api/users/v1/authentication/loginuser")
          .set("Authorization", global.signup())
          .send({
            userFirstName: "Tony",
            userLastName: "Li",
            userEmail: "tony.li@test.io",
            userConfirmPassword: "Password123!",
            userRoles: {
              admin: 5150,
              editor: 1982,
              user: 2001,
            },
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
            userFirstName: "Tony",
            userLastName: "Li",
            userEmail: "tony.li@test.io",
            userPassword: "Asdf1!",
            userConfirmPassword: "Asdf1!",
            userRoles: {
              admin: 5150,
              editor: 1982,
              user: 2001,
            },
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
            userFirstName: "Tony",
            userLastName: "Li",
            userEmail: "tony.li@test.io",
            userPassword: "asdf1!sdgserghsrthgr",
            userConfirmPassword: "asdf1!sdgserghsrthgr",
            userRoles: {
              admin: 5150,
              editor: 1982,
              user: 2001,
            },
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
            userFirstName: "Tony",
            userLastName: "Li",
            userEmail: "tony.li@test.io",
            userPassword: "Asdf!sdgserghsrthgr",
            userConfirmPassword: "Asdf!sdgserghsrthgr",
            userRoles: {
              admin: 5150,
              editor: 1982,
              user: 2001,
            },
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
            userFirstName: "Tony",
            userLastName: "Li",
            userEmail: "tony.li@test.io",
            userPassword: "AASDF1!KLJDIEFHIIEFHIUFH",
            userConfirmPassword: "AASDF1!KLJDIEFHIIEFHIUFH",
            userRoles: {
              admin: 5150,
              editor: 1982,
              user: 2001,
            },
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
            userFirstName: "Tony",
            userLastName: "Li",
            userEmail: "tony.li@test.io",
            userPassword: "aASDF1KLJDIEFHIIEFHIUFH",
            userConfirmPassword: "aASDF1KLJDIEFHIIEFHIUFH",
            userRoles: {
              admin: 5150,
              editor: 1982,
              user: 2001,
            },
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
  });

  describe("## Route logic validation", () => {
    it("should return a 500 (BadRequest) error if the user logging in does not exist", async () => {
      const response = await request(app)
        .post("/api/users/v1/authentication/loginuser")
        .set("Authorization", global.signup())
        .send({
          userEmail: "tony.li@test.io",
          userPassword: "Password123!",
        });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        errors: [
          {
            message: "User does not exist. Please register.",
            field: "badRequest",
          },
        ],
      });
    });

    it("should return a 401 (Not Authorised) error if the user password does not match", async () => {
      const response = await request(app)
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
            user: 2001,
          },
        });

      expect(response.status).toBe(201);

      const loginResponse = await request(app)
        .post("/api/users/v1/authentication/loginuser")
        .set("Authorization", global.signup())
        .send({
          userEmail: "tony.li@test.io",
          userPassword: "Aaeklghaslhfs34!",
        });
      expect(loginResponse.body).toEqual({
        errors: [{ message: "Not authorised", field: "NotAuthorised" }],
      });
    });

    it("should update the refresh token and return an access token once the user has successfuly logged in", async () => {
      const response = await request(app)
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
            user: 2001,
          },
        });

      expect(response.status).toBe(201);

      const loginResponse = await request(app)
        .post("/api/users/v1/authentication/loginuser")
        .set("Authorization", global.signup())
        .send({
          userEmail: "tony.li@test.io",
          userPassword: "Password123!",
        });

      expect(response.body).not.toBeNull();
    });
  });
});
