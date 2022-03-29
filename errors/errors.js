exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.invalidRoute = (req, res) => {
  res.status(404).send({ msg: "Invalid Route" });
};

exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23502" || err.code === "46201") {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
};

exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "InFernal Server Error" });
};
