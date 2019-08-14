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
// router.post("/", async (req, res) => {
//   try {
//     const { title, contents } = req.body;
//     if (!title || !contents) {
//       res.status(400).json({
//         errorMessage: "Please provide title and contents for the post."
//       });
//     } else {
//       const post = await Posts.insert(req.body);
//       return res.status(201).json(post);
//     }
//   } catch (error) {
//     // log error to database
//     console.log(error);
//     res.status(500).json({
//       error: "There was an error while saving the post to the database"
//     });
//   }
// });

router.post("/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Posts.findCommentById(id);

    if (comment.length < 1) {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    } else if (!req.body.text) {
      res
        .status(400)
        .json({ errorMessage: "Please provide text for the comment." });
    } else {
      await Posts.insertComment(req.body);
      res.status(201).json(req.body.text);
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      error: "There was an error while saving the comment to the database"
    });
  }
});
// tested the above with POSTMAN

// POST /api/posts/:id/comments - Creates a comment for the post with the specified id using information sent inside of the request body.
router.post("/:id/comments", async (req, res) => {
  const newComment = req.body;

  Posts.insertComment(newComment)
    .then(comment => {
      if (newComment.post_id && newComment.text) {
        res.status(201).json(comment);
      } else {
        res.status(400).json({
          errorMessage: "Please provide text for the comment."
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the comment to the database"
      });
    });
});
// tested the above with POSTMAN

// DELETE /api/posts/:id - Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  Posts.remove(id)
    .then(deletePost => {
      if (deletePost) {
        res.json(deletePost);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "The post could not be removed"
      });
    });
});
// tested the above with POSTMAN

// PUT /api/posts/:id - Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  const { title, contents } = req.body;

  Posts.update(id, changes)
    .then(updated => {
      if (!updated) {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      } else if (!title || !contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post."
        });
      } else {
        res.status(200).json(updated);
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The post information could not be modified."
      });
    });
});
// tested the above with POSTMAN

// export
module.exports = router;
