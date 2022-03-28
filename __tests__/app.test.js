const request = require("supertest");
const app = require("../app");
const db = require("../db/connection.js");
const seed = require("../seed");
const testData = require("../db/data/test-data/index.js");

beforeEach(() => {
  return seed(testData);
});
afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("should respond with JSON object containing all available endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((result) => {
        expect(result.body).toEqual({ msg: expect.any(Object) });
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

describe("GET /api/reviews", () => {
  it("STATUS 200, returns a labelled array containing specific review data", () => {
    return (
      request(app)
        // .get("/api/reviews/2") This isn't a query, you muppet!
        .get("/api/reviews")
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
                designer: expect.any(String),
                review_img_url: expect.any(String),
                category: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                comment_count: expect.any(String), //oh yeah!! D'oh
              })
            );
          });
        })
    );
  });
  test("200: returned array sorted by query, returns in descending date order by default", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((result) => {
        expect(result.body.reviews).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
});

describe("GET /api/reviews/review_id", () => {
  test("STATUS 200, returns a labelled array containing specific review data", () => {
    const review_id = 2;
    return request(app)
      .get(`/api/reviews/${review_id}`)
      .expect(200)
      .then((response) => {
        const review = response.body.review;
        expect(review).toEqual(
          expect.objectContaining({
            owner: expect.any(String),
            title: expect.any(String),
            review_id: expect.any(Number),
            review_body: expect.any(String),
            designer: expect.any(String),
            review_img_url: expect.any(String),
            category: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(Number),
          })
        );
      });
  });

  test("STATUS 404 returns on invalid input", () => {
    const review_id = 123446655;
    return request(app)
      .get(`/api/reviews/${review_id}`)
      .expect(404)
      .then((response) => {
        const msg = response.body.msg;
        expect(msg).toBe("review not found");
      });
  });
  test("STATUS 400 returns on bad input", () => {
    const review_id = "hammock";
    return request(app)
      .get(`/api/reviews/${review_id}`)
      .expect(400)
      .then((response) => {
        const msg = response.body.msg;
        expect(msg).toBe("Bad request");
      });
  });
});

describe("PATCH /api/reviews/:review_id", () => {
  test.only("STATUS 200. updates votes by specified amount", () => {
    const body = { inc_votes: 1 };
    return request(app)
      .patch(`/api/reviews/1`)
      .send(body)
      .expect(200)
      .then((response) => {
        const review = response.body.review;
        expect(review).toEqual(
          expect.objectContaining({
            votes: expect.any(Number),
          })
        );
      });
  });
  test("STATUS 404 returns on invalid input", () => {
    const review_id = 123446655;
    return request(app)
      .get(`/api/reviews/${review_id}`)
      .expect(404)
      .then((response) => {
        const msg = response.body.msg;
        expect(msg).toBe("review not found");
      });
  });
  test("STATUS 400 returns on bad input", () => {
    const review_id = "hammock";
    return request(app)
      .get(`/api/reviews/${review_id}`)
      .expect(400)
      .then((response) => {
        const msg = response.body.msg;
        expect(msg).toBe("Bad request");
      });
  });
});

describe("GET /api/reviews/:review_id/comments", () => {
  test("STATUS 200. responds with an array of comments for the given review_id", () => {
    const review_id = 2;
    return request(app)
      .get(`/api/reviews/${review_id}/comments`)
      .expect(200)
      .then((response) => {
        const comments = response.body.comments;
        expect(comments.length > 0);
        comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              body: expect.any(String),
              comment_id: expect.any(Number),
              created_at: expect.any(String),
              votes: expect.any(Number),
            })
          );
        });
      });
  });
  test("STATUS 400. ", () => {
    const review_id = 9999;
    return request(app).get(`/api/reviews/${review_id}/comments`).expect(404);
  });

  describe("DELETE /api/comments/:comment_id", () => {
    test("STATUS 204. should delete the given comment ", () => {
      const comment_id = 1;
      return request(app).delete(`/api/comments/${comment_id}`).expect(204);
    });
  });

  describe("POST /api/reviews/:review_id/comments", () => {
    test("STATUS 201. post a new comment to review & respond with the posted comment", () => {
      const review_id = 1;
      const postedComment = { body: "new comment posted", username: "mallionaire" };
      return request(app).post(`/api/reviews/${review_id}/comments`).send(postedComment).expect(201);
    });
  });
});
