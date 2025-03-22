import server from "../../app";
import request from "supertest";
import type { Express } from "express";
import * as db from "../../database/mongodb";

describe("sign-up and create subscription", () => {
  let app: Express;

  beforeAll(() => {
    db.connect("mongodb://localhost/test")
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.log(err));

    app = server;
  });

  it("should create a new user", async () => {
    const response = await request(app).post("/api/v1/auth/sign-up").send({
      name: "John Doe",
      email: "john@doe.com",
      password: "password",
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("User created successfully");
    expect(response.body.data.token).toBeDefined();
    expect(response.body.data.user).toBeDefined();
  });

  it("should create a new subscription", async () => {
    const response = await request(app).post("/api/v1/subscriptions").send({
      name: "Subscription",
      price: 9.99,
      frequency: "monthly",
      category: "sports",
      paymentMethod: "credit card",
      startDate: new Date(),
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.subscription).toBeDefined();
  });

  afterAll(async () => {
    await db.dropDatabase();
    await db.disconnect();
  });
});
