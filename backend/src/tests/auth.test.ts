import request from "supertest";
import app from "../app";
import User from "../modules/auth/auth.model";
import { Subscription } from "../modules/subscription/subscription.model";

jest.mock("../modules/auth/auth.model");
jest.mock("../modules/subscription/subscription.model");
jest.mock("../config/db", () => jest.fn().mockResolvedValue(true));

describe("Auth Endpoints", () => {
  it("should register a new user", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);
    (User.create as jest.Mock).mockResolvedValue({
      _id: "123",
      name: "Test User",
      email: "test@example.com",
    });
    (Subscription.create as jest.Mock).mockResolvedValue({});

    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe("Test User");
  });

  it("should not register user if already exists", async () => {
    (User.findOne as jest.Mock).mockResolvedValue({
      email: "test@example.com",
    });

    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
  });
});
