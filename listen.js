const app = require("./app");

const { PORT = 9090 } = process.env;

app.listen(PORT, (err) => {
  if (err) {
    throw new Error("nope");
  }
  console.log(`Listening on port ${PORT}...`);
});
