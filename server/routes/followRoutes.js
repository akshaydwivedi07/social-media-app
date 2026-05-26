const express = require("express");

const router = express.Router();

const User = require("../models/User");

// FOLLOW / UNFOLLOW

router.put("/follow", async (req, res) => {

  try {

    const { currentUserId, targetUserId } = req.body;

    // SAME USER CHECK

    if(currentUserId === targetUserId){

      return res.status(400).json({
        message:"You cannot follow yourself",
      });

    }

    // FIND USERS

    const currentUser =
    await User.findById(currentUserId);

    const targetUser =
    await User.findById(targetUserId);

    // USER NOT FOUND

    if(!currentUser || !targetUser){

      return res.status(404).json({
        message:"User not found",
      });

    }

    // ALREADY FOLLOWING

    if(
      targetUser.followers.includes(currentUserId)
    ){

      // UNFOLLOW

      targetUser.followers.pull(currentUserId);

      currentUser.following.pull(targetUserId);

      await targetUser.save();

      await currentUser.save();

      return res.json({
        message:"Unfollowed User",
      });

    }

    // FOLLOW

    targetUser.followers.push(currentUserId);

    currentUser.following.push(targetUserId);

    await targetUser.save();

    await currentUser.save();

    res.json({
      message:"Followed User",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:"Server Error",
    });

  }

});

module.exports = router;