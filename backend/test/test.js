import app from "../app.js";
import dotenv from "dotenv";
import supertest from "supertest";

dotenv.config();


describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return supertest(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});
