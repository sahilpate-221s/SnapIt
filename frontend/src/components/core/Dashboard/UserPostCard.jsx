// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaHeart,
//   FaExpand,
//   FaArrowLeft,
//   FaArrowRight,
//   FaTimes,
//   FaEllipsisH,
//   FaShareAlt,
//   FaDownload,
// } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { FaSmile } from "react-icons/fa"; // Icon for emoji button
// import EmojiPicker from "emoji-picker-react";
// import { useSelector } from "react-redux";


// const UserPostCard = ({
//   post,
//   onAddComment,
//   onDeleteComment,
//   onDeletePost,
// }) => {
//   const [likesCount, setLikesCount] = useState(post.likes.length);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [showModal, setShowModal] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);
//   const [newComment, setNewComment] = useState("");
//   const [comments, setComments] = useState(post.comments || []);
//   const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);

//   const handleEmojiClick = (emoji) => {
//     setNewComment((prev) => prev + emoji.emoji);
//     setShowEmojiPicker(false); // Close emoji picker after selection
//   };

//   const { user } = useSelector((state) => state.profile);
//   const profilePic = user.profilePicture;
//   const navigate = useNavigate();

//   const handlePrevImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === 0 ? post.images.length - 1 : prevIndex - 1
//     );
//   };

//   const handleNextImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === post.images.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const openFullScreen = () => {
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   const handleUsernameClick = (userId) => {
//     navigate(`/user/${userId}`);
//     closeModal();
//   };

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: post.title,
//         text: post.description,
//         url: window.location.href,
//       });
//     } else {
//       alert("Share feature not supported on this browser.");
//     }
//   };

//   const handleDownload = () => {
//     const imageUrl = post.images[currentImageIndex]?.url || "";
//     const link = document.createElement("a");
//     link.href = imageUrl;
//     link.download = post.title || "image";
//     link.click();
//   };

//   // Handle adding a new comment
//   const handleAddComment = () => {
//     if (newComment.trim()) {
//       // Add the comment locally first
//       const newCommentObject = {
//         user: { name: user?.name || "Anonymous", profilePicture: profilePic },
//         text: newComment,
//       };
//       setComments([newCommentObject, ...comments]); // Add comment at the top

//       // Call the onAddComment prop to update the backend
//       onAddComment(post._id, newComment);

//       // Reset the comment input field
//       setNewComment("");
//     } else {
//       alert("Comment cannot be empty.");
//     }
//   };
//   const handleDeltePost = () => {
//     onDeletePost(post._id);
//   };

//   const handleDeleteComment = (commentId) => {
//     // Call the onDeleteComment prop to remove comment from the backend
//     onDeleteComment(post._id, commentId);

//     // Remove comment locally
//     setComments(comments.filter((comment) => comment._id !== commentId));
//   };

//   return (
//     <div className="flex flex-col items-center w-full mx-auto lg:h-[31rem] xxl:h-[44rem]">
//       <div className="flex flex-wrap h-full w-full max-w-6xl lg:h-[31rem] xxl:h-[44rem] relative">
//         <div className="w-full h-full md:w-1/2 flex flex-col items-center justify-center relative">
//           {post?.images && post.images.length > 0 ? (
//             <>
//               {post.images.length > 1 && (
//                 <>
//                   <button
//                     onClick={handlePrevImage}
//                     className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full hover:bg-gray-800"
//                   >
//                     <FaArrowLeft />
//                   </button>
//                   <button
//                     onClick={handleNextImage}
//                     className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full hover:bg-gray-800"
//                   >
//                     <FaArrowRight />
//                   </button>
//                 </>
//               )}
//               <img
//                 src={post.images[currentImageIndex]?.url || ""}
//                 alt={post.title || "Post image"}
//                 className="object-cover w-full h-64 sm:h-80 md:h-96 lg:h-full cursor-pointer"
//                 onClick={openFullScreen}
//               />
//               <button
//                 onClick={openFullScreen}
//                 className="absolute bottom-2 right-2 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-800"
//               >
//                 <FaExpand />
//               </button>
//             </>
//           ) : (
//             <p className="text-gray-500">No images available</p>
//           )}
//         </div>

//         {/* user profile and the likes things */}
//         <div className="w-full md:w-1/2 p-4 xl:p-6 xl:text-xl flex flex-col xl:h-[40rem] ">
//           <div className="flex justify-between items-baseline ">
//             <div className="flex flex-row ">
//               <img
//                 src={post.createdBy?.profilePicture || profilePic || "default-profile-pic-url"}
//                 alt="User Profile"
//                 className="w-6 h-6 rounded-full object-cover"
//               />
//               <button
//                 onClick={() => post.createdBy?._id && handleUsernameClick(post.createdBy._id)}
//                 className="ml-2 text-lg font-semibold text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
//               >
//                 {post.createdBy?.name || user?.name || "Anonymous User"}
//               </button>
//             </div>

//             <div className="flex items-center ">
//               <button className="w-7 h-10 flex items-center rounded-full transition duration-300 ease-in-out">
//                 <FaHeart
//                   className={`text-xl transition-all duration-300 text-red-500`}
//                 />
//               </button>
//               <span className="text-lg font-semibold text-gray-700">
//                 {likesCount}
//               </span>

//               <button
//                 onClick={() => setShowMenu(!showMenu)}
//                 className="ml-3 text-gray-600 hover:text-gray-800"
//               >
//                 <FaEllipsisH />
//               </button>

//               {showMenu && (
//                 <div className="absolute right-0 top-10 bg-white shadow-md rounded-md p-2 w-32">
//                   <button
//                     onClick={handleShare}
//                     className="flex items-center text-sm text-blue-500 hover:bg-gray-200 px-2 py-1 rounded"
//                   >
//                     <FaShareAlt className="mr-2" /> Share
//                   </button>
//                   <button
//                     onClick={handleDownload}
//                     className="flex items-center text-sm text-green-500 hover:bg-gray-200 px-2 py-1 rounded"
//                   >
//                     <FaDownload className="mr-2" /> Download
//                   </button>
//                   <button
//                     onClick={handleDeltePost}
//                     className="flex items-center text-sm text-red-500 hover:bg-gray-200 px-2 py-1 rounded"
//                   >
//                     {" "}
//                     <MdDelete className="mr-2" /> Delete Post
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* title and the description part */}
//           <div className="flex flex-row items-baseline justify-between ">
//             <div className="text-3xl flex flex-col font-serif">
//               {post.title ? post.title : ""}
//               <div className="flex flex-col justify-center text-lg text-gray-900 font-diphylleia">
//                 description: {post.description}
//                 <div className="text-gray-800 text-xs">
//                   <span className="text-black text-sm">Tags: </span>
//                   {post.tags}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Comments Section */}
//           {/* Comments Section */}
//           {/* Comments Section */}
//           <div className="relative rounded-md border h-full w-full mt-3 flex flex-col bg-white shadow-sm">
//             {/* Comments Header */}
//             <span className="p-2 font-semibold text-sm text-gray-700 border-b">
//               {comments.length} {comments.length === 1 ? "comment" : "comments"}
//             </span>

//             {/* Comments List */}
//             {/* Comments List */}
//             <div className="flex-1 space-y-2 px-1 py-2 overflow-y-auto max-h-[calc(100%-90px)] scrollbar-hidden">
//               {comments.length > 0 ? (
//                 comments
//                   .slice(0)
//                   .reverse()
//                   .map((comment, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center justify-between bg-gray-100 p-1 rounded-lg"
//                     >
//                       {/* Comment Info */}
//                       <div className="flex items-center space-x-3">
//                         <img
//                           src={
//                             comment.user.profilePicture ||
//                             "default-profile-pic-url"
//                           }
//                           alt={comment.user.name || "User"}
//                           className="w-6 h-6 rounded-full object-cover"
//                         />
//                         <div className="text-sm">
//                           <span className="font-semibold text-gray-800">
//                             {comment.user.name}
//                           </span>
//                           <p className="text-gray-600">{comment.text}</p>
//                         </div>
//                       </div>

//                       {/* Delete Icon (Visible Only to Comment Owner) */}
//                       {comment.user._id === user._id && (
//                         <button
//                           onClick={() => handleDeleteComment(comment._id)}
//                           className="text-gray-500 hover:text-gray-700"
//                         >
//                           <MdDelete size={18} />
//                         </button>
//                       )}
//                     </div>
//                   ))
//               ) : (
//                 <div className="text-center text-gray-500">
//                   No comments yet.
//                 </div>
//               )}
//             </div>

//             {/* Input Section */}
//             <div className="absolute bottom-0 left-0 w-full bg-gray-50 p-3  flex items-center space-x-2 border-t rounded-md">
//               {/* Emoji Picker */}
//               <div className="relative">
//                 <button
//                   onClick={() => setShowEmojiPicker((prev) => !prev)}
//                   className="text-gray-500 hover:text-gray-700 focus:outline-none"
//                 >
//                   <FaSmile size={20} />
//                 </button>
//                 {showEmojiPicker && (
//                   <div className="absolute bottom-10 left-0 z-10 p-2 bg-white rounded-md shadow-md border max-w-xs max-h-64 overflow-auto">
//                     <EmojiPicker
//                       onEmojiClick={handleEmojiClick}
//                       searchDisabled
//                       emojiStyle="native"
//                     />
//                   </div>
//                 )}
//               </div>

//               {/* Comment Input */}
//               <input
//                 type="text"
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//                 placeholder="Add a comment..."
//                 className="flex-1 h-8 px-4 bg-gray-100 text-sm rounded-full border-none focus:ring-2 focus:ring-gray-300 focus:outline-none"
//               />

//               {/* Post Button */}
//               <button
//                 onClick={handleAddComment}
//                 className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-gray-400 transition-all"
//               >
//                 Post
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Fullscreen Modal */}
//       {showModal && (
//         <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-85 flex items-center justify-center z-50 w-11/12 mx-auto">
//           <div className="relative w-full max-w-4xl sm:max-w-2xl">
//             {/* User Info Section */}
//             <div className="absolute top-6 left-6 bg-black bg-opacity-50 text-white p-2 rounded-lg">
//               <div className="flex items-center space-x-2">
//                 <img
//                   src={post.createdBy?.profilePicture || "/placeholder-profile.png"}
//                   alt="User"
//                   className="w-8 h-8 rounded-full"
//                 />
//                 <div>
//                   <button
//                     onClick={() => post.createdBy?._id && handleUsernameClick(post.createdBy._id)}
//                     className="text-white text-sm font-semibold hover:text-blue-300 transition-colors cursor-pointer"
//                   >
//                     {post.createdBy?.name || "Unknown User"}
//                   </button>
//                   <p className="text-xs text-gray-300">
//                     {new Date(post.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>
//             </div>


//             <img
//               src={post.images[currentImageIndex]?.url || ""}
//               alt={post.title || "Post image"}
//               className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
//             />
//             <button
//               onClick={closeModal}
//               className="absolute top-4 right-4 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-800"
//             >
//               <FaTimes className="text-xl" />
//             </button>
//             {post.images.length > 1 && (
//               <>
//                 <button
//                   onClick={handlePrevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full hover:bg-gray-800"
//                 >
//                   <FaArrowLeft />
//                 </button>
//                 <button
//                   onClick={handleNextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full hover:bg-gray-800"
//                 >
//                   <FaArrowRight />
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       )}

      
//     </div>
//   );
// };

// export default UserPostCard;





import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaExpand,
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
  FaEllipsisH,
  FaShareAlt,
  FaDownload,
  FaSmile,
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import { useSelector } from "react-redux";

const UserPostCard = ({ post, onAddComment, onDeleteComment, onDeletePost }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    setComments(post?.comments || []);
  }, [post]);

  const handleAdd = () => {
    if (!newComment.trim()) return;

    const tempComment = {
      _id: Date.now().toString(),
      user: {
        _id: user?._id,
        name: user?.name || "User",
        profilePicture: user?.profilePicture,
      },
      text: newComment,
    };

    setComments((prev) => [tempComment, ...prev]);
    onAddComment(post._id, newComment);
    setNewComment("");
  };

  const handleDeleteCommentLocal = (commentId) => {
    onDeleteComment(post._id, commentId);
    setComments((prev) => prev.filter((c) => c._id !== commentId));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href,
      });
    }
  };

  const handleDownload = () => {
    const img = post.images?.[currentImageIndex]?.url;
    if (!img) return;
    const link = document.createElement("a");
    link.href = img;
    link.download = post.title || "image";
    link.click();
  };

  const handleProfileClick = () => {
    if (post.createdBy?._id) {
      navigate(`/user/${post.createdBy._id}`);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Image */}
      <div className="relative">
        {post.images?.length > 0 && (
          <>
            <img
              src={post.images[currentImageIndex]?.url}
              alt={post.title}
              className="w-full max-h-[70vh] object-contain"
              onClick={() => setShowModal(true)}
            />

            {post.images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentImageIndex((i) =>
                      i === 0 ? post.images.length - 1 : i - 1
                    )
                  }
                  className="absolute left-3 top-1/2 text-white"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={() =>
                    setCurrentImageIndex((i) =>
                      i === post.images.length - 1 ? 0 : i + 1
                    )
                  }
                  className="absolute right-3 top-1/2 text-white"
                >
                  <FaArrowRight />
                </button>
              </>
            )}
          </>
        )}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center p-3">
        <div className="flex items-center gap-2">
          <img
            src={post.createdBy?.profilePicture || "/placeholder-profile.png"}
            className="w-8 h-8 rounded-full"
            alt=""
          />
          <button
            onClick={handleProfileClick}
            className="font-semibold hover:text-blue-600"
          >
            {post.createdBy?.name || "User"}
          </button>
        </div>

        <button onClick={() => setShowMenu((v) => !v)}>
          <FaEllipsisH />
        </button>

        {showMenu && (
          <div className="absolute right-4 mt-6 bg-white shadow rounded-md p-2 z-10">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100"
            >
              <FaShareAlt /> Share
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100"
            >
              <FaDownload /> Download
            </button>
            <button
              onClick={() => onDeletePost(post._id)}
              className="flex items-center gap-2 px-2 py-1 text-red-500 hover:bg-gray-100"
            >
              <MdDelete /> Delete
            </button>
          </div>
        )}
      </div>

      {/* Comments */}
      <div className="p-3 border-t">
        <div className="max-h-48 overflow-y-auto space-y-2">
          {comments.map((c) => (
            <div key={c._id} className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{c.user?.name}</p>
                <p className="text-sm">{c.text}</p>
              </div>
              {c.user?._id === user?._id && (
                <button onClick={() => handleDeleteCommentLocal(c._id)}>
                  <MdDelete />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-3">
          <button onClick={() => setShowEmojiPicker((v) => !v)}>
            <FaSmile />
          </button>

          {showEmojiPicker && (
            <div className="absolute z-20">
              <EmojiPicker
                onEmojiClick={(e) =>
                  setNewComment((prev) => prev + e.emoji)
                }
              />
            </div>
          )}

          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 border rounded px-3 py-1"
          />

          <button
            onClick={handleAdd}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPostCard;
