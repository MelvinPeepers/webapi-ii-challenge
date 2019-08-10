// need to import express
const express = require("express");

// import the db from data
const Posts = require("./db");

//import express router
const router = express.Router();

// GET /api/posts Returns an array of all the post objects contained in the database.
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find(req.query);
    // console.log("query", req.query);
    res.status(200).json(posts);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "The posts information could not be retrieved."
    });
  }
});
// tested the above with POSTMAN

// GET /api/posts/:id
router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found." });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the post."
    });
  }
});

// GET /api/posts/:id/comments
router.get("/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Posts.findCommentById(id);
    res.status(200).json(comment);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "The post with the specified ID does not exist."
    });
  }
});

// DELETE /api/posts/:id

// PUT /api/posts/:id

// export
module.exports = router;
