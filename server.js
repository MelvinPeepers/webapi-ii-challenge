// Grabbing the main Express Module
const express = require("express");

// db is in data so I'll need to create posts-router.js in there instead
const BlogPostRouter = require("./data/posts-router.js");

// global objects
const server = express();

// middleware
server.use(express.json());
server.use("/api/posts", BlogPostRouter);

// root
server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Blog Post</h2>
    <p>Welcome to Lambda Blog</p>
  `);
});

module.exports = server;
