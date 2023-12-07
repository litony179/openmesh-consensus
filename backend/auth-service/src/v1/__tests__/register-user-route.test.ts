import request from "supertest";
import { app } from "../../app";

describe("POST /api/users/v1/authentication/register", () => {
  describe("## Request payload validation", () => {
    it("should return a 201 if the request payload is valid", async () => {
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
            user: 2011,
          },
        });

      expect(response.status).toBe(201);
    });
    describe("userFirstName", () => {
      it("should return 400 if userFirstName is not provided", async () => {
        const response = await request(app)
          .post("/api/users/v1/authentication/registeruser")
          .set("Authorization", global.signup())
          .send({
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

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          errors: [
            {
              message: "Please provide your first name.",
              field: "userFirstName",
            },
          ],
        });
      });

      it("should return a 400 error when the userFirstName is less than 2 characters", async () => {
        const response = await request(app)
          .post("/api/users/v1/authentication/registeruser")
          .set("Authorization", global.signup())
          .send({
            userFirstName: "L",
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

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          errors: [
            {
              message: "Your first name must be at least 2 characters.",
              field: "userFirstName",
            },
          ],
        });
      });
    });

    describe("userLastName", () => {
      it("should return 400 if userLastName is not provided", async () => {
        const response = await request(app)
          .post("/api/users/v1/authentication/registeruser")
          .set("Authorization", global.signup())
          .send({
            userFirstName: "test",
            userEmail: "tony.li@test.io",
            userPassword: "Password123!",
            userConfirmPassword: "Password123!",
            userRoles: {
              admin: 5150,
              editor: 1982,
              user: 2011,
            },
          });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          errors: [
            {
              message: "Please provide your last name.",
              field: "userLastName",
            },
          ],
        });
      });

      it("should return 400 if userLastName is less than 2 characters", async () => {
        const response = await request(app)
          .post("/api/users/v1/authentication/registeruser")
          .set("Authorization", global.signup())
          .send({
            userFirstName: "test",
            userLastName: "L",
            userEmail: "tony.li@test.io",
            userPassword: "Password123!",
            userConfirmPassword: "Password123!",
            userRoles: {
              admin: 5150,
              editor: 1982,
              user: 2011,
            },
          });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          errors: [
            {
              message: "Your last name must be at least 2 characters.",
              field: "userLastName",
            },
          ],
        });
      });
    });

    describe("userEmail", () => {
      it("should return 400 if userEmail is not provided", async () => {
        const response = await request(app)
          .post("/api/users/v1/authentication/registeruser")
          .set("Authorization", global.signup())
          .send({
            userFirstName: "test",
            userLastName: "test",
            userPassword: "Password123!",
            userConfirmPassword: "Password123!",
            userRoles: {
              admin: 5150,
              editor: 1982,
              user: 2011,
            },
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

      it("should return 400 if userEmail is not a valid email", async () => {
        const response = await request(app)
          .post("/api/users/v1/authentication/registeruser")
          .set("Authorization", global.signup())
          .send({
            userFirstName: "test",
            userLastName: "test",
            userEmail: "tony.li",
            userPassword: "Password123!",
            userConfirmPassword: "Password123!",
            userRoles: {
              admin: 5150,
              editor: 1982,
              user: 2011,
            },
          });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          errors: [
            {
              message: "you must provide a valid email.",
              field: "userEmail",
            },
          ],
        });
      });
    });

    describe("userPassword", () => {
      it("should return 400 if userPassword is not provided", async () => {
        const response = await request(app)
          .post("/api/users/v1/authentication/registeruser")
          .set("Authorization", global.signup())
          .send({
            userFirstName: "Tony",
            userLastName: "Li",
            userEmail: "tony.li@test.io",
            userConfirmPassword: "Password123!",
            userRoles: {
              admin: 5150,
              editor: 1982,
              user: 2011,
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
          .post("/api/users/v1/authentication/registeruser")
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
              user: 2011,
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
          .post("/api/users/v1/authentication/registeruser")
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
              user: 2011,
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
          .post("/api/users/v1/authentication/registeruser")
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
              user: 2011,
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
          .post("/api/users/v1/authentication/registeruser")
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
              user: 2011,
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
          .post("/api/users/v1/authentication/registeruser")
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
              user: 2011,
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

    describe("userConfirmPassword", () => {
      it("should return 400 if userConfirmPassword is not provided", async () => {
        const response = await request(app)
          .post("/api/users/v1/authentication/registeruser")
          .set("Authorization", global.signup())
          .send({
            userFirstName: "test",
            userLastName: "test",
            userEmail: "tony.li@test.io",
            userPassword: "Password123!",
            userRoles: {
              admin: 5150,
              editor: 1982,
              user: 2011,
            },
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          errors: [
            {
              message: "You forgot to re-enter your password.",
              field: "userConfirmPassword",
            },
          ],
        });
      });
    });

    describe("userRoles", () => {
      it("should return a 400 status error of the userRoles is not provided", async () => {
        const response = await request(app)
          .post("/api/users/v1/authentication/registeruser")
          .set("Authorization", global.signup())
          .send({
            userFirstName: "test",
            userLastName: "test",
            userEmail: "tony.li@test.io",
            userPassword: "Password123!",
            userConfirmPassword: "Password123!",
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          errors: [{ field: "userRoles", message: "Required" }],
        });
      });

      it("should return a 400 status error if userRoles is not an object", async () => {
        const response = await request(app)
          .post("/api/users/v1/authentication/registeruser")
          .set("Authorization", global.signup())
          .send({
            userFirstName: "test",
            userLastName: "test",
            userEmail: "tony.li@test.io",
            userPassword: "Password123!",
            userConfirmPassword: "Password123!",
            userRoles: [2011],
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          errors: [
            { field: "userRoles", message: "Expected object, received array" },
          ],
        });
      });
    });
  });

  describe("## Database creation validation", () => {
    it("should a 403 confict error if a user trying to register already exists", async () => {
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
            user: 2011,
          },
        });

      expect(response.status).toBe(201);

      const response2 = await request(app)
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

      expect(response2.status).toBe(409);
    });

    it("should create the user in the database if the user does not exist", async () => {
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
            user: 2011,
          },
        });

      expect(response.status).toBe(201);
    });
  });
});
