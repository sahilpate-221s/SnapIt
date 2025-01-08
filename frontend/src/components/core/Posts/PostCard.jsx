import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const PostCard = ({
  post,
  closeModal,
  onLike,
  onAddComment,
  onDeleteComment,
  onDeletePost,
}) => {
  const [commentText, setCommentText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post?.title || "");
  const [isCommentBeingEdited, setIsCommentBeingEdited] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState(null);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(post._id, commentText);
      setCommentText("");
    } else {
      toast.error("Comment cannot be empty.");
    }
  };

  const handleDeletePost = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      onDeletePost(post._id);
      closeModal(); // Close the modal after deleting the post
    }
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleUpdatePostTitle = () => {
    if (editedTitle.trim()) {
      setIsEditing(false);
    } else {
      toast.error("Title cannot be empty.");
    }
  };

  const handleEditComment = (comment) => {
    setIsCommentBeingEdited(true);
    setCommentToEdit(comment);
    setCommentText(comment?.text || "");
  };

  const handleDeleteComment = (commentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirmDelete) {
      onDeleteComment(post._id, commentId);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg flex flex-wrap w-full max-w-6xl">
        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-gray-200 rounded-t-lg md:rounded-l-lg md:rounded-t-none flex items-center justify-center">
          {post?.images && post.images.length > 0 ? (
            <img
              src={post.images[0]?.url || ""}
              alt={post.title || "Post image"}
              className="object-cover w-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            />
          ) : (
            <p className="text-gray-500">No images available</p>
          )}
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-6 flex flex-col">
          {/* Title */}
          <div className="flex items-center justify-between mb-4">
            {isEditing ? (
              <div className="flex w-full space-x-4">
                <input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="flex-1 border rounded-lg p-2"
                  placeholder="Enter new title"
                />
                <button
                  onClick={handleUpdatePostTitle}
                  className="bg-blue-500 text-white py-1 px-3 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <h1 className="text-2xl font-bold">{post?.title || "Untitled"}</h1>
            )}

            <div className="flex space-x-2">
              <button onClick={toggleEdit} className="text-blue-500">
                <FaEdit />
              </button>
              <button
                onClick={handleDeletePost}
                className="bg-red-500 text-white py-1 px-3 rounded"
              >
                <MdDelete />
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="mb-6">{post?.description || "No description provided."}</p>

          {/* Tags */}
          <p className="text-sm text-gray-500 mb-2">
            <strong>Tags:</strong>{" "}
            {Array.isArray(post.tags) && post.tags.length > 0
              ? post.tags.join(", ")
              : "No tags available"}
          </p>

          {/* Like Button */}
          <button
            onClick={() => onLike(post._id)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 shadow-md transition duration-300 mb-4"
          >
            Like ({post.likes?.length || 0})
          </button>

          {/* Owner Info */}
          {post.owner ? (
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div className="flex items-center">
                <Link to={`/user/${post.owner._id}`}>
                  <div className="rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center">
                    <span className="font-bold">
                      {post.owner.name?.slice(0, 1)}
                    </span>
                  </div>
                </Link>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">{post.owner.name}</h2>
                  <p className="text-gray-500">
                    {post.owner.followers?.length || 0} Followers
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No owner information available</p>
          )}

          {/* Add/Edit Comment */}
          <form onSubmit={handleCommentSubmit} className="flex items-center mt-4">
            <input
              type="text"
              placeholder={
                isCommentBeingEdited
                  ? "Update your comment"
                  : "Enter a comment"
              }
              className="flex-1 border rounded-lg p-2"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              type="submit"
              className="ml-2 bg-red-500 px-4 py-2 rounded-md text-white"
            >
              {isCommentBeingEdited ? "Update" : "Add+"}
            </button>
          </form>

          {/* Comments Section */}
          <div className="overflow-y-auto h-64 mt-4">
            {Array.isArray(post.comments) && post.comments.length > 0 ? (
              post.comments.slice(0, 10).map((comment) => (
                <div
                  key={comment._id}
                  className="flex items-center justify-between mb-4"
                >
                  <div className="flex items-center gap-3">
                    <Link to={`/user/${comment.user}`}>
                      <div className="rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center">
                        <span className="font-bold">
                          {comment.name?.slice(0, 1)}
                        </span>
                      </div>
                    </Link>
                    <div>
                      <h2 className="text-lg font-semibold">{comment.name}</h2>
                      <p className="text-gray-500">{comment.text}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditComment(comment)}
                      className="text-blue-500"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No comments yet. Be the first one to comment!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
