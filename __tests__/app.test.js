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
        expect(response.body.categories.length > 0);
        response.body.categories.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});
