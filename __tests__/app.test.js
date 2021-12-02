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

describe.skip("GET /api", () => {
  test("should respond with JSON object containing message key", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((result) => {
        expect(result.body).toEqual(expect.objectContaining({ message: expect.any(String) }));
      });
  });
});

describe("GET /api/categories", () => {
  it("STATUS 200, returns with a labelled array of review categories", () => {
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

describe("GET /api/reviews/:review_id", () => {
  it("STATUS 200, returns a labelled array containing specific review data", () => {
    return (
      request(app)
        // .get("/api/reviews/2") This isn't a query, you muppet!
        .get("/api/reviews/?review_id=2")
        .expect(200)
        .then((response) => {
          expect(response.body.reviews.length > 0);
          response.body.reviews.forEach((review) => {
            expect(review).toEqual(
              expect.objectContaining({
                //comment out each expect. Uncomment one by one until issue discovered
                owner: expect.any(String),
                title: expect.any(String),
                review_id: expect.any(Number),
                review_body: expect.any(String),
                designer: expect.any(String),
                review_img_url: expect.any(String),
                category: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                comment_count: expect.any(Number), //oh yeah!! D'oh
              })
            );
          });
        })
    );
  });
});
