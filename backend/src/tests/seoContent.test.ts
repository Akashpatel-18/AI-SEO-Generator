import request from "supertest";
import app from "../app";
import User from "../modules/auth/auth.model";
import jwt from "jsonwebtoken";

import { Subscription } from "../modules/subscription/subscription.model";

jest.mock("../modules/auth/auth.model");
jest.mock("../modules/subscription/subscription.model");
jest.mock("../modules/seoContent/seoContent.model");
jest.mock("../config/db", () => jest.fn().mockResolvedValue(true));
jest.mock("../modules/seoContent/seoContent.service", () => ({
  generateSEOContent: jest.fn().mockResolvedValue({
    output: { final: { title: "Test Title" } },
  }),
  getHistory: jest.fn().mockResolvedValue([]),
}));

describe("SEO Content Endpoints", () => {
  let token: string;

  beforeAll(() => {
    token = jwt.sign({ id: "user123" }, process.env.JWT_SECRET || "secret");
  });

  it("should generate SEO content", async () => {
    (User.findById as jest.Mock).mockResolvedValue({
      _id: "user123",
      name: "Test User",
      select: jest.fn().mockReturnThis(), // Needed if select() is chained
    });

    (Subscription.findOne as jest.Mock).mockResolvedValue({
      _id: "sub123",
      userId: "user123",
      plan: "FREE",
      usage: { count: 0, resetAt: new Date("2099-01-01") },
    });

    const res = await request(app)
      .post("/api/seoContent/generate")
      .set("Authorization", `Bearer ${token}`)
      .send({
        keyword: "test keyword",
        topic: "test topic",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.output.final.title).toBe("Test Title");
  });

  it("should return 401 if no token provided", async () => {
    const res = await request(app).post("/api/seoContent/generate").send({
      keyword: "test",
      topic: "test",
    });

    expect(res.statusCode).toEqual(401);
  });
});
