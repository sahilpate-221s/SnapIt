// // const BASE_URL = "https://snapit-2.onrender.com/api/v1";
// export const BASE_URL = "http://localhost:4000/api/v1";

// // auth endpoints 
// export const endpoints = {
//   LOGIN_API: `${BASE_URL}/user/login`,
//   REGISTER_API: `${BASE_URL}/user/register`,
//   LOGOUT_API: `${BASE_URL}/user/logout`,
//   CHANGE_PASSWORD_API: `${BASE_URL}/user/changePassword`,
//   DELETE_ACCOUNT_API: `${BASE_URL}/user/deleteAccount`,
// };

// // profile endpoints
// export const profileEndpoints = {
//   MY_PROFILE_API: `${BASE_URL}/user/myProfile`,
//   USER_PROFILE_API: (userId) => `${BASE_URL}/user/${userId}`,
//   FOLLOW_USER_API: (userId) => `${BASE_URL}/user/follow/${userId}`,
//   UPDATE_PROFILE_API: `${BASE_URL}/user/updateProfile`,
//   FOLLOWERS_AND_FOLLOWING_API: (userId) => `${BASE_URL}/user/followersAndFollowing/${userId}`,
//   USER_POSTS_API: (userId) => `${BASE_URL}/user/posts/${userId}`,
//   USER_COLLECTIONS_API: (userId) => `${BASE_URL}/user/collections/${userId}`,
//   UPDATE_DISPLAY_PICTURE_API: `${BASE_URL}/user/updateDisplayPicture`,
// };

// // post endpoints
// export const postEndpoints = {
//   NEW_POST_API: `${BASE_URL}/posts/newPost`,
//   ALL_POSTS_API: `${BASE_URL}/posts/allPosts`,
//   SINGLE_POST_API: (postId) => `${BASE_URL}/posts/${postId}`,
//   UPDATE_POST_API: (postId) => `${BASE_URL}/posts/update/${postId}`,
//   DELETE_POST_API: (postId) => `${BASE_URL}/posts/${postId}`,
//   ADD_COMMENT_API: (postId) => `${BASE_URL}/posts/${postId}/comments`,
//   REACT_TO_POST_API: (postId) => `${BASE_URL}/posts/${postId}/reactions`,
//   DELETE_COMMENT_API: (postId, commentId) => `${BASE_URL}/posts/${postId}/comments/${commentId}`,
// };

// // collection endpoints
// export const collectionEndpoints = {
//   CREATE_COLLECTION_API: `${BASE_URL}/collection/createCollection`,
//   ADD_POSTS_API: (collectionId) => `${BASE_URL}/collection/${collectionId}/posts`,
//   GET_ALL_COLLECTIONS_API: `${BASE_URL}/collection/all-Collections`,
//   DELETE_COLLECTION_API: (collectionId) => `${BASE_URL}/collection/${collectionId}`,
//   DELETE_COLLECTION_POSTS_API: `${BASE_URL}/collection/delete-posts`,
// };





// DO NOT define BASE_URL here — axios handles it

// auth endpoints
export const endpoints = {
  LOGIN_API: "/user/login",
  REGISTER_API: "/user/register",
  LOGOUT_API: "/user/logout",
  CHANGE_PASSWORD_API: "/user/changePassword",
  DELETE_ACCOUNT_API: "/user/deleteAccount",
};

// profile endpoints
export const profileEndpoints = {
  MY_PROFILE_API: "/user/myProfile",
  USER_PROFILE_API: (userId) => `/user/${userId}`,
  FOLLOW_USER_API: (userId) => `/user/follow/${userId}`,
  UPDATE_PROFILE_API: "/user/updateProfile",
  FOLLOWERS_AND_FOLLOWING_API: (userId) =>
    `/user/followersAndFollowing/${userId}`,
  USER_POSTS_API: (userId) => `/user/posts/${userId}`,
  USER_COLLECTIONS_API: (userId) => `/user/collections/${userId}`,
  UPDATE_DISPLAY_PICTURE_API: "/user/updateDisplayPicture",
};

// post endpoints
export const postEndpoints = {
  NEW_POST_API: "/posts/newPost",
  ALL_POSTS_API: "/posts/allPosts",
  SINGLE_POST_API: (postId) => `/posts/${postId}`,
  UPDATE_POST_API: (postId) => `/posts/update/${postId}`,
  DELETE_POST_API: (postId) => `/posts/${postId}`,
  ADD_COMMENT_API: (postId) => `/posts/${postId}/comments`,
  REACT_TO_POST_API: (postId) => `/posts/${postId}/reactions`,
  DELETE_COMMENT_API: (postId, commentId) =>
    `/posts/${postId}/comments/${commentId}`,
};

// collection endpoints
export const collectionEndpoints = {
  CREATE_COLLECTION_API: "/collection/createCollection",
  ADD_POSTS_API: (collectionId) => `/collection/${collectionId}/posts`,
  GET_ALL_COLLECTIONS_API: "/collection/all-Collections",
  DELETE_COLLECTION_API: (collectionId) =>
    `/collection/${collectionId}`,
  DELETE_COLLECTION_POSTS_API: "/collection/delete-posts",
};
