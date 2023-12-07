import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

declare global {
  var signup: () => string;
}

let mongoDb: any;
let mongoDbUri: any;

dotenv.config({ path: ".env.test" });

// Before all test suite, create a mock mongodb connection along with
// a connection string
beforeAll(async () => {
  mongoDb = await MongoMemoryServer.create();
  mongoDbUri = mongoDb.getUri();

  await mongoose.connect(mongoDbUri, {});
});

// Before each test, clear existing mongodb collections
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

// Close conenction after test suite
afterAll(async () => {
  await mongoDb.stop();
  await mongoose.connection.close();
});

global.signup = () => {
  // Build a JWT payload { id, email }
  const payload = {
    UserInfo: {
      userId: new mongoose.Types.ObjectId().toHexString(),
      userFirstName: "Tony",
      userLastName: "Li",
      userEmail: "tony.li@test.io",
      userPassword:
        "4d469d44bddeb9cb44a83a17825caf39a6c1ef9890058353c340802466144b1c7d3528886f338f35aca88189590d9c9717b335d8b8438929eff8fdebffaec3b2.957b64298267a5a7",
      userRoles: { user: 2001, admin: 5150, editor: 1982 },
      userRefreshToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJ1c2VyRmlyc3ROYW1lIjoiVG9ueSIsInVzZXJMYXN0TmFtZSI6IkxpIiwidXNlckVtYWlsIjoidG9ueS5saTFAdGVzdC5pbyJ9LCJpYXQiOjE3MDA5NzI2NDUsImV4cCI6MTcwMTA1OTA0NX0.PYv9X9XcmTMKEvZ6b1owWtlWs11SQIp-ijWqKn1d9Zs",
      __v: 0,
    },
  };

  // Create the JWT!
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!);

  return `Bearer ${token}`;
};
