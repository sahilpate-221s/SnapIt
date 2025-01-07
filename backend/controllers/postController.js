import { Post } from "../model/postModel.js";
import { User } from '../model/userModel.js';  // Make sure this path is correct
import cloudinary from "cloudinary";
import DataUriParser from "datauri/parser.js";

import dotenv from "dotenv";
dotenv.config();

const parser = new DataUriParser();

export const createPost = async (req, res) => {
  const folderName = process.env.FOLDER_NAME; // Folder from .env

  try {
    if (!folderName) {
      throw new Error("Cloudinary folder name is not defined in .env");
    }

    const { title, description, tag } = req.body; // Accept a single tag
    const files = req.files; // Access uploaded files

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Log the uploaded files (optional, for debugging purposes)
    console.log("Files uploaded:", files);

    // Convert file buffers to Data URLs and upload to Cloudinary
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const fileContent = parser.format(
          file.originalname,
          file.buffer
        ).content;

        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(fileContent, {
          folder: folderName,
        });

        return {
          id: result.public_id,
          url: result.secure_url,
        };
      })
    );

    // Save the post with uploaded images and a single tag
    const newPost = await Post.create({
      title,
      description,
      images: uploadedImages,
      tags: [tag], // Wrap single tag in an array for consistency
      createdBy: req.user._id, // Use req.user._id for the current user
    });

    // Update the user's posts array to include the new post
    await User.findByIdAndUpdate(req.user._id, {
      $push: { posts: newPost._id },
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error while creating post:", error);
    res.status(500).json({
      success: false,
      message: "Error while creating post",
      error: error.message,
    });
  }
};


export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error(`Error while getting posts: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Internal server error while getting posts",
    });
  }
};

// Get a single post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "createdBy",
      "-password"
    );
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error(`Error while getting post: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Internal server error while getting post",
    });
  }
};

// // Update a post
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(400).json({
        message: "No Pin with this id",
      });
    }

    if (post.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const { title, description, tag } = req.body;

    post.title = title || post.title;
    post.description = description || post.description;
    post.tags = tag || post.tags;

    await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    console.error(`Error while updating post: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Internal server error while updating post",
    });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await cloudinary.v2.uploader.destroy(post.images.id);
    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error(`Error while deleting post: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Internal server error while deleting post",
    });
  }
};

// Add a comment to a post
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    post.comments.push({ user: req.user._id, text });
    await post.save();

    res.status(200).json({
      success: true,
      message: "Comment added successfully",
      post,
    });
  } catch (error) {
    console.error(`Error while adding comment: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Internal server error while adding comment",
    });
  }
};

// React to a post
export const reactToPost = async (req, res) => {
  try {
    const { emoji } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    post.reactions.push({ user: req.user._id, emoji });
    await post.save();

    res.status(200).json({
      success: true,
      message: "Reaction added successfully",
      post,
    });
  } catch (error) {
    console.error(`Error while reacting to post: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Internal server error while reacting to post",
    });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({
        message: "No post with this id",
      });
    }

    const { commentId } = req.params; // Use params instead of query

    if (!commentId) {
      return res.status(404).json({
        message: "Please provide a comment ID",
      });
    }

    const commentIndex = post.comments.findIndex(
      (item) => item._id.toString() === commentId.toString()
    );

    if (commentIndex === -1) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    post.comments.splice(commentIndex, 1);
    await post.save();

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      post,
    });
  } catch (error) {
    console.error(`Error while deleting comment: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Internal server error while deleting comment",
    });
  }
};
