const request = require("supertest");
const app = require("../app");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../seed");

beforeEach(() => {
  return seed(testData);
});
afterAll(() => {
  return db.end();
});

describe("GET /api/categories", () => {
  it("STATUS 200, returns with an array of reviews", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((response) => {
        console.log("response :", response.body);
        expect(response.body).toContain(Array);
        expect(response.body.categories).toHaveLength(4);
      });
  });
});
