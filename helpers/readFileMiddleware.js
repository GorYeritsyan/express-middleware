const fs = require("fs").promises;
const path = require("path");

// Function returns middleware function
const readFileMiddleware = (...args) => {
  // Middleware
  return (req, res, next) => {
    fs.readFile(path.join(__dirname, "..", ...args), "utf-8")
      .then((data) => {
        res.locals.fileContent = data;
        next();
      })
      .catch((err) => res.status(404).send(err));
  };
};

module.exports = { readFileMiddleware };
