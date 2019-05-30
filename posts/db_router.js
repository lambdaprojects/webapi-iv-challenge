const router = require("express").Router();

const db = require("./db.js");

// middleware router.use(mw);

// for url with begins  with /api/hubs
router.get("/", async (req, res) => {
  try {
    const blogs = await db.find(req.query);
    res.status(200).json(blogs);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      ErrorMessage: "The posts information could not be retrieved."
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blog = await db.findById(req.params.id);
    if (blog.length > 0) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({
        ErrorMessage: `The post with the specified id ${id} does not exist.`
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ErrorMessage: "The post information could not be retrieved."
    });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(":: POST REQUEST BODY ::" + JSON.stringify(req.body));
    let title = req.body.title;
    let content = req.body.content;
    if (!title || !content) {
      res.status(400).json({
        ErrorMessage: "Please provide title and contents for the post"
      });
    } else {
      const blog = await db.insert(req.body);
      res.status(201).json(blog);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ErrorMessage: "There was an error while saving the posts to the database"
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let title = req.body.title;
    let content = req.body.content;
    if (!title || !content) {
      const blog = await db.update(req.params.id, req.body);
      if (blog) {
        res.status(200).json(blog);
      } else {
        res.status(404).json({
          ErrorMessage: `The post with the speficied id ${id} does not exist.`
        });
      }
    } else {
      res.status(400).json({
        ErrorMessage: `Please provide title and contents for the post.`
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ ErrorMessage: "Error in updation." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await db.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ SuccessMessage: "The blog is deleted." });
    } else {
      res.status(404).json({
        ErrorMessage: `The post with the specified id ${id} does not exist.`
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ErrorMessage: "The post could not be removed."
    });
  }
});

router.get("/:id/comments", async (req, res) => {
  try {
    const postComments = await db.findPostComments(req.params.id);
    if (postComments.length > 0) {
      res.status(200).json(postComments);
    } else {
      res.status(404).json({
        ErrorMessage: `The post with the specified ${id} does not exist. `
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ErrorMessage: "The comments information could not be retrieved."
    });
  }
});

router.get("/comments/:id", async (req, res) => {
  try {
    const comments = await db.findCommentById(req.params.id);
    if (comments.length > 0) {
      res.status(200).json(comments);
    } else {
      res.status(404).json({
        ErrorMessage: `There are no comments associated with the comment id ${id}.`
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ErrorMessage: "Error in retrieving comments."
    });
  }
});

router.post("/:id/comments", async (req, res) => {
  try {
    if (req.params.id === req.body.post_id) {
      const post = await db.findById(req.params.id);
      if (post.length === 1) {
        console.log(":: WITHIN POST OF INSERT COMMENTS::");
        if (req.body.text) {
          const comment = await db.insertComment(req.body);
          res.status(201).json(comment);
        } else {
          res
            .status(400)
            .json({ ErrorMessage: "Please provide text for the comment." });
        }
      } else {
        res.status(404).json({
          ErrorMessage: `The post with the specified ${id} does not exist.`
        });
      }
    } else {
      res.status(404).json({
        ErrorMessage:
          "The post id in request parameter and comment object should be the same."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ ErrorMessage: "Error adding blog." });
  }
});
module.exports = router;
