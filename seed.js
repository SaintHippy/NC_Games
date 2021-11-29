const db = require("./db/connection");
const format = require("pg-format");

const seed = ({ categoryData, userData, reviewData, commentData }) => {
  return db
    .query(`DROP TABLE IF EXISTS comments;`) //most dependencies first, least last
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS reviews;`).then(() => {
        return db.query(`DROP TABLE IF EXISTS users;`).then(() => {
          return db.query(`DROP TABLE IF EXISTS categories;`);
        });
      });
    })
    .then(() => {
      return db.query(`CREATE TABLE categories (
      slug VARCHAR (20) NOT NULL PRIMARY KEY,
      description VARCHAR(255)
    );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE users (
        username VARCHAR (20) NOT NULL PRIMARY KEY,
        avatar_url VARCHAR (255),
        name VARCHAR (50)
      );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE reviews (
        review_id SERIAL PRIMARY KEY,
        title VARCHAR (255),
        review_body TEXT,
        designer VARCHAR (255),
        design VARCHAR (50),
        review_img_url VARCHAR(255) DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
        votes INT DEFAULT 0,
        category VARCHAR (20) REFERENCES categories (slug),
        owner VARCHAR (20) REFERENCES users (username),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        author VARCHAR (20) REFERENCES users (username),
        review_id INT REFERENCES reviews (review_id),
        votes INT DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        body TEXT
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
        `INSERT INTO reviews (title, designer, owner, review_img_url,review_body, category, created_at, votes)
          VALUES
          %L
          RETURNING *;`,
        formattedReviewData
      );
      return db.query(queryStr);
    });
};

module.exports = seed;
