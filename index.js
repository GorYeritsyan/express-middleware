const express = require("express");
const { readFileMiddleware } = require("./helpers/readFileMiddleware");
const app = express();

// Homepage
app.get("/", readFileMiddleware("pages", "index.html"), async (req, res) => {
  const data = res.locals.fileContent;
  res.set({ "content-type": "text/html" });
  res.status(200).send(data);
});

// All users
app.get(
  "/api/users",
  readFileMiddleware("db", "users.json"),
  async (req, res) => {
    const users = JSON.parse(res.locals.fileContent);
    res.set({ "content-type": "application/json" });
    res.status(200).json(users);
  }
);

// Single user by id
app.get(
  "/api/users/:id",
  readFileMiddleware("db", "users.json"),
  async (req, res) => {
    const { id } = req.params;
    const users = JSON.parse(res.locals.fileContent);
    const user = users.find((user) => user.id === +id);

    // Headers
    res.set({
      "content-type": "application/json",
    });

    // Response
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }
);

// Not found page
app.use(readFileMiddleware("pages", "not-found.html"), async (req, res) => {
  const data = res.locals.fileContent;
  res.set({ "content-type": "text/html" });
  res.status(200).send(data);
});

app.listen(3000, () => {
  console.log("Server is running PORT 3000");
});
