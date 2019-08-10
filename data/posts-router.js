// need to import express
const express = require("express");

// import the db from data
const Posts = require("./db");

//import express router
const router = express.Router();

// GET /api/posts - Returns an array of all the post objects contained in the database.
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

// GET /api/posts/:id - Returns the post object with the specified id.
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id);

    if (post && post.length) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "The post information could not be retrieved."
    });
  }
});
// tested the above with POSTMAN

// GET /api/posts/:id/comments - Returns an array of all the comment objects associated with the post with the specified id.
router.get("/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Posts.findCommentById(id);

    if (comment && comment.length) {
      res.status(200).json(comment);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "The comments information could not be retrieved."
    });
  }
});
// tested the above with POSTMAN

// POST /api/posts - Creates a post using the information sent inside the request body.
router.post("/", async (req, res) => {
  try {
    const { title, contents } = req.body;
    if (!title || !contents) {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    } else {
      const post = await Posts.insert(req.body);
      return res.status(201).json(post);
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});
// tested the above with POSTMAN

// POST /api/posts/:id/comments - Creates a comment for the post with the specified id using information sent inside of the request body.

// DELETE /api/posts/:id - Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.

// PUT /api/posts/:id - Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.

// export
module.exports = router;
