import request from "supertest";
import { app } from "../../app";
import jwt from "jsonwebtoken";
import { User } from "../../models/user";

describe("## GET /api/users/v1/authentication/logout", () => {
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

  // Generate JWT
  const accessToken = jwt.sign(
    {
      UserInfo: userRegistrationInfo,
    },
    process.env.ACCESS_TOKEN_SECRET
      ? process.env.ACCESS_TOKEN_SECRET
      : "secret",
    { expiresIn: process.env.ACCESS_TOKEN_LIFE }
  );

  // Generate refresh token
  const refreshToken = jwt.sign(
    {
      UserInfo: userRegistrationInfo,
    },
    process.env.REFRESH_TOKEN_SECRET
      ? process.env.REFRESH_TOKEN_SECRET
      : "secret",
    { expiresIn: process.env.REFRESH_TOKEN_LIFE }
  );

  it("should return a 404 status (NotFound) if the JWT cookie is not found", async () => {
    const response = await request(app).get(
      "/api/users/v1/authentication/logout"
    );

    expect(response.status).toBe(404);
  });

  it("should return a 404 status (Not Found) if the user is not found", async () => {
    const response = await request(app)
      .post("/api/users/v1/authentication/registeruser")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(userRegistrationInfo);

    expect(response.status).toBe(201);

    const logoutResponse = await request(app)
      .get("/api/users/v1/authentication/logout")
      .set("Cookie", `jwt=${refreshToken}`);

    expect(logoutResponse.status).toBe(404);
    expect(logoutResponse.body).toEqual({
      errors: [{ field: "NotFound", message: "User not found" }],
    });
  });

  it("should successfully return a 200 status (OK) if the user is found and the cookie is deleted", async () => {
    const response = await request(app)
      .post("/api/users/v1/authentication/registeruser")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(userRegistrationInfo);

    const registeredUser = await User.findOne({
      userEmail: userRegistrationInfo.userEmail,
    });

    expect(response.status).toBe(201);

    const registeredUserRefreshToken = registeredUser!.userRefreshToken;
    const logoutResponse = await request(app)
      .get("/api/users/v1/authentication/logout")
      .set("Cookie", `jwt=${registeredUserRefreshToken}`);

    expect(logoutResponse.status).toBe(200);
    expect(logoutResponse.body).toEqual({
      message: "User logged out",
    });
  });
});
