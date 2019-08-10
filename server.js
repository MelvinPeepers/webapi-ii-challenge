const express = require("express");

// I'll be setting up a posts folder and posts-router.js file
const BlogPostRouter = require("./posts/posts-router.js");

const server = express();

server.use(express.json());
server.use("/api/posts", BlogPostRouter);

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Blog Post</h2>
    <p>Welcome to Lambda Blog</p>
  `);
});

module.exports = server;
