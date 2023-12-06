import request from "supertest";

import { User } from "../../models/user";
import { app } from "../../app";

describe("GET /api/users/v1/authentication/refreshkoken", () => {
  const userRegistrationInfo = {
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
  it("should return a 401 (Not Authorised) if no cookie is present", async () => {
    await request(app)
      .get("/api/users/v1/authentication/refreshtoken")
      .send({})
      .expect(401);
  });

  it("should return a 403 (Forbidden) if the cookie is invalid", async () => {
    const response = await request(app)
      .post("/api/users/v1/authentication/registeruser")
      .set("Cookie", "jwt=invalid-cookie")
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

    const registeredUser = await User.findOne({ userEmail: "tony.li@test.io" });

    const refreshTokenResponse = await request(app).get(
      "/api/users/v1/authentication/refreshtoken"
    );

    expect(refreshTokenResponse.status).toBe(401);
    expect(refreshTokenResponse.body).toEqual({
      errors: [{ message: "Not authorised", field: "NotAuthorised" }],
    });
  });

  it("should successfully return a new access token if the cookie is valid", async () => {
    const response = await request(app)
      .post("/api/users/v1/authentication/registeruser")
      .set("Authorization", global.signup())
      .send(userRegistrationInfo);

    expect(response.status).toBe(201);

    const refreshTokenResponseInfo = await User.findOne({
      userEmail: userRegistrationInfo.userEmail,
    });

    const refreshToken = refreshTokenResponseInfo?.userRefreshToken;

    const refreshTokenResponse = await request(app)
      .get("/api/users/v1/authentication/refreshtoken")
      .set("Cookie", `jwt=${refreshToken}`);

    expect(refreshTokenResponse.status).toBe(200);
    expect(refreshTokenResponse.body).toEqual({
      accessToken: refreshTokenResponse.body.accessToken,
    });
  });
});
