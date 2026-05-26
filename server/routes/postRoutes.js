const express = require("express");
const router = express.Router();

const Post = require("../models/Post");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE POST
router.post("/create", authMiddleware, async (req, res) => {

  try {

    const newPost = new Post({
      userId: req.body.userId,
      content: req.body.content
    });

    await newPost.save();

    res.status(201).json({
      message: "Post created",
      post: newPost
    });

  } catch (err) {

    res.status(500).json({
      message: "Server error"
    });

  }

});


// GET ALL POSTS
router.get("/all", async (req, res) => {

  try {

    const posts = await Post.find();

    res.json(posts);

  } catch (err) {

    res.status(500).json({
      message: "Server error"
    });

  }

});

module.exports = router;


// LIKE POST
router.put("/like/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    post.likes.push(req.body.userID);

    await post.save();

    res.status(200).json({
      message: "Post liked",
      likes: post.likes
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error"
    });
  }
});






//unlike post
router.put("/unlike/:id", authMiddleware, async (req, res) => {
  try {

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    post.likes = post.likes.filter(
      (id) => id && id.toString() !== req.body.userID
    );

    await post.save();

    res.status(200).json({
      message: "Post unliked",
      likes: post.likes
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error"
    });
  }
});

router.post("/comment/:id", async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const newComment = {
            userId: req.body.userId,
            text: req.body.text
        };

        post.comments.push(newComment);

        await post.save();

        res.status(200).json({
            message: "Comment added",
            comments: post.comments
        });

    } catch(error){

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }

});



// DELETE POST
router.delete("/:id", authMiddleware, async (req, res) => {
  try {

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    await post.deleteOne();

    res.status(200).json({
      message: "Post deleted successfully"
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error"
    });
  }
});


router.get("/all", authMiddleware, async (req, res) => {

    try {

        const posts = await Post.find().sort({ createdAt: -1 });

        res.status(200).json(posts);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});



router.post("/comment/:id", authMiddleware, async (req, res) => {

    try {

        const { text, userId } = req.body;

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        post.comments.push({
            userId,
            text
        });

        await post.save();

        res.status(200).json({
            message: "Comment added",
            comments: post.comments
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});



router.get("/comments/:id", async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json({
            comments: post.comments
        });

    } catch(error){

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }

});



router.delete("/comment/:postId/:commentId", async (req, res) => {

    try {

        const post = await Post.findById(req.params.postId);

        if(!post){
            return res.status(404).json({
                message: "Post not found"
            });
        }

        post.comments = post.comments.filter(
            (comment) => comment._id.toString() !== req.params.commentId
        );

        await post.save();

        res.status(200).json({
            message: "Comment deleted"
        });

    } catch(error){

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }

});