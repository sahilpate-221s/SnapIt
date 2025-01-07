import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../../services/operations/PostAPI";  // Assuming PostAPI is set up

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setFiles(selectedFiles);
      const filePreviews = Array.from(selectedFiles).map((file) =>
        URL.createObjectURL(file)  // Create a preview URL for each image
      );
      setPreviewUrls(filePreviews);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data
    if (!title || !description || !tag || files.length === 0) {
      toast.error("Please fill all fields and select images.");
      return;
    }

    setLoading(true);
    try {
      // Create form data for file upload
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tag", tag);

      // Append files to the form data
      Array.from(files).forEach((file) => {
        formData.append("files", file);  // 'files' should match the field name expected by backend
      });

      // Call the createPost function and handle the response
      const response = await dispatch(createPost(formData, navigate));

      // Handle response after post creation
      if (response && response.success) {
        toast.success("Post created successfully.");
      } else {
        toast.error("Error creating post.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Error creating post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="container w-11/12 max-w-4xl bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create a Post
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
          <div className="flex items-center justify-center w-full md:w-1/2">
            <div className="flex flex-col items-center justify-center w-full p-6 bg-gray-50 rounded-lg shadow-md">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center h-full cursor-pointer"
              >
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-blue-100 text-blue-500 rounded-full shadow-sm">
                  <FaPlus size={20} />
                </div>
                <p className="text-gray-600 font-medium">Choose files</p>
                <p className="mt-2 text-sm text-gray-400 text-center">
                  We recommend high-quality .jpg files, less than 10MB.
                </p>
              </label>
              {previewUrls.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2 w-full">
                  {previewUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Preview ${index}`}
                      className="w-full h-20 object-cover rounded-md"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/2 space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
              rows="5"
              required
            />
            <input
              type="text"
              placeholder="Tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="p-3 border border-gray-300 rounded-md"
              required
            />
            <button
              type="submit"
              className={`p-3 text-white rounded-md ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
