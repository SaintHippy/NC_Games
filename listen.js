const app = require("./app");

const { PORT = 9090 } = process.env;
console.log("Listening on port 9090");

app.listen(PORT, (err) => {
  if (err) {
    throw new Error("Error");
  }
});
