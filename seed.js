const db = require("./db/connection");
const format = require("pg-format");

const seed = ({ categoryData, userData, reviewData, commentData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments;`) //most dependencies first, least last
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS reviews;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS categories;`);
    })
    .then(() => {
      return db.query(`CREATE TABLE categories (
      slug VARCHAR(50) PRIMARY KEY,
      description TEXT NOT NULL
    );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE users (
      username VARCHAR(50) PRIMARY KEY,
      avatar_url VARCHAR(255),
      name VARCHAR(50) NOT NULL
    );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE reviews (
      review_id SERIAL PRIMARY KEY,
      title VARCHAR (255) NOT NULL,
      review_body TEXT NOT NULL,
      designer VARCHAR (255),
      review_img_url VARCHAR(255) DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg' NOT NULL,
      votes INT DEFAULT 0 NOT NULL,
      category VARCHAR (50) REFERENCES categories(slug) ON DELETE CASCADE NOT NULL,
      owner VARCHAR (50) REFERENCES users(username) ON DELETE CASCADE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR (20) REFERENCES users(username) NOT NULL,
      review_id INT REFERENCES reviews(review_id) NOT NULL,
      votes INT DEFAULT 0 NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      body TEXT NOT NULL
    );`);
    })
    .then(() => {
      const formattedCategoryData = categoryData.map((category) => {
        return [category.slug, category.description];
      });
      const queryStr = format(
        `INSERT INTO categories (
        slug, description
        )
        VALUES
        %L
        RETURNING *;`,
        formattedCategoryData
      );
      return db.query(queryStr);
    })
    .then(() => {
      const formattedUserData = userData.map((user) => {
        return [user.username, user.name, user.avatar_url];
      });
      const queryStr = format(
        `INSERT INTO users(
        username, name, avatar_url
      )
      VALUES
      %L
      RETURNING *;`,
        formattedUserData
      );
      return db.query(queryStr);
    })
    .then(() => {
      const formattedReviewData = reviewData.map((review) => {
        return [
          review.title,
          review.designer,
          review.owner,
          review.review_img_url,
          review.review_body,
          review.category,
          review.created_at,
          review.votes,
        ];
      });
      const queryStr = format(
        `INSERT INTO reviews (title, designer, owner, review_img_url, review_body, category, created_at, votes)
        VALUES
        %L
        RETURNING *;`,
        formattedReviewData
      );
      return db.query(queryStr);
    })
    .then(() => {
      const formattedCommentData = commentData.map((comment) => {
        return [comment.author, comment.review_id, comment.votes, comment.created_at, comment.body];
      });
      const queryStr = format(
        `INSERT INTO comments ( author, review_id, votes, created_at, body)
        VALUES
        %L
        RETURNING *;`,
        formattedCommentData
      );
      return db.query(queryStr);
    });
};

module.exports = seed;
